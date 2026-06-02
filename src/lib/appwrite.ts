import { Client, Databases, Account } from '@codeflicker/appwrite';

const client = new Client()
  .setProject('naghamtrenddb');

export const account = new Account(client);
export const databases = new Databases(client);
export { client };
