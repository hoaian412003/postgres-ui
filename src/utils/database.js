'use server';

import { Client } from 'pg'
import { decrypt } from "@/utils/engine";


export const checkConnection = async ({
  host,
  port,
  user,
  password
}) => {
  const client = new Client({
    host,
    port,
    user,
    password,
    database: 'postgres',
  })

  return client.connect();
}

export const getClient = async (privateKey, database = 'postgres') => {
  try {
    const config = await decrypt({
      privateKey: privateKey,
      policy: "ROOT OR DATABASE-CONNECTION",
    }).then(config => {
      return JSON.parse(config);
    });
    return new Client({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database
    });
  } catch (error) {
    console.error("Error getting connection:", error);
    throw error;
  }
}
