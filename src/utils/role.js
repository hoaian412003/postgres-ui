import { decrypt } from '@/utils/engine';


export const getSetofRole = async (privateKey) => {
  return decrypt({
    privateKey: privateKey,
    policy: "ROOT OR ROOT-INCLUDE",
  }).then((message) => {
    return message.split(',') || [];
  }).catch((error) => {
    console.error("Error getting set of roles:", error);
    throw error;
  })
}
