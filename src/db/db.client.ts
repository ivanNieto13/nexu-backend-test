import { Client } from 'pg';

let client: Client;

export const getClient = (): Client => {
  if (!client) {
    client = new Client(
      {
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST,
      }
    );
  }

  return client;
}
