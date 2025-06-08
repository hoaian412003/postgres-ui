'use server';

import { decrypt, encrypt } from "@/utils/engine";


export const verifyRootPrivateKey = async (privateKey) => {
  return decrypt({
    privateKey: privateKey,
    policy: "ROOT OR ROOT-PRIVATE-KEY",
  }).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
}

export const saveDatabaseConfig = async (config) => {
  await generateDatabaseRootPolicy();
  return encrypt({
    policy: "ROOT OR DATABASE-CONNECTION",
    message: JSON.stringify(config),
  }).then((ciphertext) => {
    return ciphertext;
  }).catch((error) => {
    console.error("Error saving database config:", error);
    throw error;
  });
}

export const generateDatabaseRootPolicy = async () => {
  return encrypt({
    policy: "ROOT OR DATABASE-ACESS-ALL",
    message: "*.*.*"
  })
}
