import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://martinlovecode.com:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const keygen = async (attributes = []) => {
  const response = await instance.post('/keygen', {
    attributes: attributes,
  });
  return response.data.private_key_base64;
}

export const encrypt = async ({
  policy,
  message
}) => {
  console.log("Encrypting message with policy:", policy, message);
  return await instance.post('/encrypt', {
    policy: policy,
    message: message
  }).then(response => {
    return response.data.ciphertext;
  }).catch(error => {
    console.error("Encryption error:", error);
    throw error;
  })
}

export const decrypt = async ({
  privateKey,
  policy,
  ciphertext
}) => {
  return await instance.post('/decrypt', {
    private_key_base64: privateKey,
    [policy ? 'policy' : 'ciphertext']: policy ? policy : ciphertext,
  }).then(response => {
    return response.data.message;
  }).catch(error => {
    console.error("Decryption error:", error);
    throw error;
  })
}

export function matchPolicy(column, policy) {
  const [db, table, col, action] = column.split("::");
  const [pDb, pTable, pCol, pAction] = policy.split("::");

  return (
    (pDb === "*" || pDb === db) &&
    (pAction === "*" || pAction === action) &&
    (pTable === "*" || pTable === table) &&
    (pCol === "*" || pCol === col)
  );
}
