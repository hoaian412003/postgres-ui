export type IAccount = {
  name: string;
  policy?: string;
  role?: string;
  email?: string;
}

export type IAccounts = Array<IAccount>;
