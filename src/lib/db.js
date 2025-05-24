import { Client } from 'pg';

export function getClient() {
  return new Client({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || '192.168.1.7',
    database: process.env.PGDATABASE || 'postgres',
    password: process.env.PGPASSWORD || 'qxka02nG4HJkeEPZtQfDhCv',
    port: Number(process.env.PGPORT) || 5432,
  });
}
