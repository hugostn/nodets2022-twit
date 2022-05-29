import { sql } from 'slonik';
import Post from '../models/Post';
import db from './postgresql';

export default class PostDao {
  static async findOne(id: string) : Promise<Post[]> {
    const result = await db.connect((conn) => conn.query<Post>(sql`
      SELECT *
      FROM post
      WHERE id = ${id}
    `));
    return [...result.rows];
  }

  static async findByUsername(
    username: string,
    page: number = 1,
    size: number = 10,
  ) : Promise<Post[]> {
    const offset = (page - 1) * size;
    const result = await db.connect((conn) => conn.query<Post>(sql`
      select p.id, p.user_id, p.type, p.posted_at, p.content, p.refer
      from users u join post p on u.id = p.user_id
      where lower(u.username) = ${username.toLowerCase()}
      order by p.posted_at desc
      limit ${size} offset ${offset}
    `));
    return [...result.rows];
  }
}
