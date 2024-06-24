import {getClient} from './db.client';
import {Client} from 'pg';

describe('getClient', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = {...process.env};
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should return a Client instance with correct configuration', () => {
    process.env.DB_USER = 'test_user';
    process.env.DB_DATABASE = 'test_db';
    process.env.DB_PASSWORD = 'test_password';
    process.env.DB_PORT = '5432';
    process.env.DB_HOST = 'localhost';

    const client = getClient();

    expect(client).toBeInstanceOf(Client);
    expect(client.user).toEqual('test_user');
    expect(client.password).toEqual('test_password');
    expect(client.port).toEqual(5432);
    expect(client.host).toEqual('localhost');
  });

  test('should return the same client instance on subsequent calls', () => {
    process.env.DB_USER = 'test_user';
    process.env.DB_DATABASE = 'test_db';
    process.env.DB_PASSWORD = 'test_password';
    process.env.DB_PORT = '5432';
    process.env.DB_HOST = 'localhost';

    const client1 = getClient();
    const client2 = getClient();

    expect(client1).toBe(client2);
  });
});
