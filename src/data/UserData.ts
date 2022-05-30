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

  static async isFollower(followedId: string, followerId: string) : Promise<Boolean> {
    const result: Boolean = await db.one(sql`select count(*) > 0 from follower where user_id = ${followedId} and follower = ${followerId}`);
    return result;
  }

  static async follow(followerId: string, userId: string) : Promise<void> {
    await db.query(sql`
      insert into follower (user_id, follower_id)
      values (${userId}, ${followerId})
    `);
  }

  static async unfollow(followerId: string, userId: string) : Promise<void> {
    await db.query(sql`delete from follower where user_id = ${userId} and follower_id = ${followerId}`);
  }
}
