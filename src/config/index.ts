import base from './base';
import testing from './testing';

export type DatabaseConfigType = {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number,
  max?: number,
  idleTimeoutMillis?: number
};

export type AppConfig = {
  testing: boolean,
  db: DatabaseConfigType,
};

// eslint-disable-next-line no-underscore-dangle
const config : AppConfig = (global as any).__TESTING__ ? testing : base;
export default config;
