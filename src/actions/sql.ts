'use server'

import { getClient } from "@/utils/database";
import { getSessionPrivateKey } from "./session";
import { getSetofRole } from "@/utils/role";
import { decrypt } from "@/utils/engine";
import { checkAuthority } from "@/utils/extractColumn";
import { PolicyInsufficientError } from "@/types/error";

export const runSql = async (sql: string, dbName: string): Promise<any> => {
  const privateKey: string = await getSessionPrivateKey();
  const client = await getClient(privateKey, dbName);

  const roles: string[] = await getSetofRole(privateKey);
  let policySet: string[] = [];
  await Promise.all(roles.map(async (role) => {
    const policy = await decrypt({
      privateKey,
      policy: role,
    } as any)
    policySet = [...policySet, ...policy.split(',')]
  }));

  const { result, needPolicies } = checkAuthority(sql, dbName, policySet);

  if (!result) {
    return {
      result: null,
      error: new PolicyInsufficientError(needPolicies)
    }
  }

  return new Promise((resolve, reject) => {
    client.connect()
      .then(() => {
        return client.query(sql);
      })
      .then((res) => {
        const typeQuery = `
          SELECT oid, typname FROM pg_type WHERE oid IN (${res.fields.map(f => f.dataTypeID).join(',')})
        `;
        return client.query(typeQuery).then((dataTypes) => {
          const typeMap = Object.fromEntries(dataTypes.rows.map(r => [r.oid, r.typname]));
          const columns = res.fields.map(field => ({
            name: field.name,
            dataType: typeMap[field.dataTypeID] || 'unknown'
          }));
          resolve({
            result: {
              rows: res.rows,
              columns
            },
            error: null
          });
        });
      })
      .catch((err) => {
        console.error("SQL execution error:", err);
        resolve({
          result: null,
          error: err
        })
      })
      .finally(() => {
        client.end();
      })
  })
}
