import { Parser } from "node-sql-parser";
import { matchPolicy } from "./engine";

export function extractColumns(sql: string) {
  const parser = new Parser();
  const { columnList } = parser.parse(sql, {
    database: 'Postgresql',
    parseOptions: {
      includeLocations: true
    }
  });
  return columnList;
}

export function checkAuthority(sql: string, db: string, policies: Array<string>) {
  const columns = extractColumns(sql);

  const unsatisfiedPaths: string[] = [];

  columns.map(col => {
    const [action, table, column] = col.replaceAll("(.*)", "*").split("::");
    const path = `${db}::${table}::${column}::${action}`;
    console.log("Path: ", path);
    if (!policies.some((p) => matchPolicy(path, p))) {
      unsatisfiedPaths.push(path);
      return;
    }
  })

  return {
    result: !unsatisfiedPaths.length,
    needPolicies: unsatisfiedPaths
  };
}
