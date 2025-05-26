'use server';

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/utils/sessions";


export async function getServerSession() {
  const cookieStore = await cookies();
  return await getIronSession(cookieStore, sessionOptions);
}

export async function savePrivateKeyAction(privateKey) {
  const session = await getServerSession();
  session.privateKey = privateKey;
  await session.save();
  return { ok: true };
}

export async function getSessionPrivateKey() {
  const session = await getServerSession();
  return session.privateKey ?? null;
}
