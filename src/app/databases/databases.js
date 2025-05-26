'use server';

import { getClient } from "@/utils/database";
import { decrypt } from "@/utils/engine";
import { getSetofRole } from "@/utils/role";
import { getSessionPrivateKey } from "./session";

export const getAccesableObject = async () => {
  const privateKey = await getSessionPrivateKey();
  const client = await getClient(privateKey);
  const roles = await getSetofRole(privateKey);
  let policySet = [];
  await Promise.all(roles.map(async (role) => {
    const policy = await decrypt({
      privateKey,
      policy: role,
    })
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
    } catch (err) {
      console.warn(`Skipping database ${dbName} due to error:`, err.message);
    }
  }
  // Filter against policy set
  const filtered = allPaths.filter(path => {
    return policySet.some(pattern => {
      const regex = new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$");
      return regex.test(path);
    });
  });

  return filtered;
}
