import { createPool } from 'slonik';
import config from '../config';

const {
  user, password, host, port, database,
} = config.db;
const databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const pool = createPool(databaseUrl);
export default pool;

export type QueriedCount = {
  count: number;
}
