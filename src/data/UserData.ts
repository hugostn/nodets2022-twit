import { sql } from 'slonik';
import User from '../models/User';
import db from './postgresql';

export default class UserDao {
  static async findOne(id: string) : Promise<User> {
    const result: User = await db.one(sql`select * from users where id = ${id}`);
    return result;
  }

  static async findByUsername(username: string) : Promise<User> {
    const result: User = await db.one(sql`select * from users where lower(username) = ${username.toLowerCase()}`);
    return result;
  }
}
