'use server';

import { getClient } from "@/utils/database";
import { decrypt, matchPolicy } from "@/utils/engine";
import { getSetofRole } from "@/utils/role";
import { getSessionPrivateKey } from "./session";

export const getAccesable = async () => {
  const privateKey: string = await getSessionPrivateKey();
  const client = await getClient(privateKey);
  const roles: string[] = await getSetofRole(privateKey);
  let policySet: string[] = [];
  await Promise.all(roles.map(async (role) => {
    const policy = await decrypt({
      privateKey,
      policy: role,
    } as any)
    policySet = [...policySet, ...policy.split(',')]
  }));

  await client.connect();
  const dbRes = await client.query(`SELECT datname FROM pg_database WHERE datistemplate = false`);
  const databases = dbRes.rows.map(r => r.datname);
  await client.end();

  const allPaths = [];
  for (const dbName of databases) {
    const dbClient = await getClient(privateKey, dbName);
    try {
      await dbClient.connect();

      // Get all tables and columns
      const query = `
        SELECT table_schema, table_name, column_name
        FROM information_schema.columns
        WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
      `;
      const res = await dbClient.query(query);

      for (const row of res.rows) {
        const path = `${dbName}.${row.table_name}.${row.column_name}`;
        allPaths.push(path);
      }

      await dbClient.end();
    } catch (err: any) {
      console.warn(`Skipping database ${dbName} due to error:`, err.message);
    }
  }
  // Filter against policy set
  const filtered = allPaths.filter(path => {
    return policySet.some(pattern => {
      return matchPolicy(path.replaceAll(".", "::") + "::select", pattern)
    });
  });

  return filtered;
}

type ColumnMetadata = {
  name: string;
  type: string;
}

export const getAccesableObject = async (): Promise<Record<string, Record<string, ColumnMetadata[]>>> => {
  const privateKey = await getSessionPrivateKey();
  const accessPaths = await getAccesable(); // e.g. ["db1.users.id", "db1.users.email", "db2.orders.*"]

  // Group paths by database to query only relevant columns
  const dbMap: Record<string, Set<string>> = {};
  for (const path of accessPaths) {
    const [db, table, column] = path.split(".");
    if (!dbMap[db]) dbMap[db] = new Set();
    dbMap[db].add(table);
  }

  const result: Record<string, Record<string, ColumnMetadata[]>> = {};

  for (const dbName of Object.keys(dbMap)) {
    const dbClient = await getClient(privateKey, dbName);
    try {
      await dbClient.connect();

      const query = `
        SELECT table_name, column_name, data_type
        FROM information_schema.columns
        WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
      `;
      const res = await dbClient.query(query);

      for (const row of res.rows) {
        const fullPath = `${dbName}.${row.table_name}.${row.column_name}`;
        if (!accessPaths.includes(fullPath)) continue;

        if (!result[dbName]) result[dbName] = {};
        if (!result[dbName][row.table_name]) result[dbName][row.table_name] = [];

        result[dbName][row.table_name].push({
          name: row.column_name,
          type: row.data_type,
        });
      }

      await dbClient.end();
    } catch (err: any) {
      console.warn(`Skipping ${dbName} due to error:`, err.message);
    }
  }

  return result;
};


// Key is database name
export type Relationship = {
  source: string; // e.g. "users.id"
  target: string; // e.g. "orders.user_id"
};

export const getRelationships = async (): Promise<Record<string, Relationship[]>> => {
  // Get all accessible paths like "db.table.column"
  const accessiblePaths = await getAccesable();
  const privateKey: string = await getSessionPrivateKey();

  // Extract unique database names from accessible paths
  const accessibleDatabases = Array.from(new Set(
    accessiblePaths.map(p => p.split('.')[0])
  ));

  const allRelationships: Record<string, Relationship[]> = {};

  for (const dbName of accessibleDatabases) {
    const dbClient = await getClient(privateKey, dbName);
    try {
      await dbClient.connect();

      // Query foreign keys in that database
      const query = `
        SELECT
          source_tbl.relname AS source_table,
          source_col.attname AS source_column,
          target_tbl.relname AS target_table,
          target_col.attname AS target_column
        FROM
          pg_constraint c
          JOIN pg_class source_tbl ON source_tbl.oid = c.conrelid
          JOIN pg_namespace source_ns ON source_ns.oid = source_tbl.relnamespace
          JOIN pg_class target_tbl ON target_tbl.oid = c.confrelid
          JOIN pg_namespace target_ns ON target_ns.oid = target_tbl.relnamespace
          JOIN unnest(c.conkey) WITH ORDINALITY AS source_cols(attnum, ordinality)
            ON TRUE
          JOIN unnest(c.confkey) WITH ORDINALITY AS target_cols(attnum, ordinality)
            ON source_cols.ordinality = target_cols.ordinality
          JOIN pg_attribute source_col
            ON source_col.attrelid = source_tbl.oid AND source_col.attnum = source_cols.attnum
          JOIN pg_attribute target_col
            ON target_col.attrelid = target_tbl.oid AND target_col.attnum = target_cols.attnum
        WHERE c.contype = 'f'
          AND source_ns.nspname NOT IN ('pg_catalog', 'information_schema')
          AND target_ns.nspname NOT IN ('pg_catalog', 'information_schema')
      `;

      const res = await dbClient.query(query);

      // Collect relationships for this db
      allRelationships[dbName] = [];

      for (const row of res.rows) {
        allRelationships[dbName].push({
          source: `${row.source_table}.${row.source_column}.source`,
          target: `${row.target_table}.${row.target_column}.target`
        });
      }

      await dbClient.end();
    } catch (err: any) {
      console.warn(`Skipping database ${dbName} due to error:`, err.message);
    }
  }

  return allRelationships;
};
