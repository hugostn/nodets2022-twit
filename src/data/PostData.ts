import { sql } from 'slonik';
import { v4 as uuidv4 } from 'uuid';
import Post from '../models/Post';
import db from './postgresql';

export default class PostDao {
  static async findOne(id: string) : Promise<Post> {
    const result: Post = await db.one(sql`select * from post where id = ${id}`);
    return result;
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

  static async getFeed(page: number = 1, size: number = 10) : Promise<Post[]> {
    const offset = (page - 1) * size;
    const result = await db.connect((conn) => conn.query<Post>(sql`
      select p.id, p.user_id, p.type, p.posted_at, p.content, p.refer
      from post p
      order by p.posted_at desc
      limit ${size} offset ${offset}
    `));
    return [...result.rows];
  }

  static async getFeedByUserId(
    userId: string,
    page: number = 1,
    size: number = 10,
  ) : Promise<Post[]> {
    const offset = (page - 1) * size;
    const result = await db.connect((conn) => conn.query<Post>(sql`
      select p.id, p.user_id, p.type, p.posted_at, p.content, p.refer
      from post p
      where p.user_id in
        (
          select unnest(
            array_append(
              (select array_agg(f.user_id)
              from users u left join follower f on u.id = f.follower_id
              where u.id = ${userId}),
              ${userId}
            )
          )
        )
      order by p.posted_at desc
      limit ${size} offset ${offset}
    `));
    return [...result.rows];
  }

  static async insert(post: Post) : Promise<string> {
    const postId = uuidv4();
    await db.query(sql`
      insert into post(id, user_id, type, content, refer)
      values (${postId}, ${post.user_id}, ${post.type}, ${post.content}, ${post.refer ?? null})
    `);
    return postId;
  }

  static async countPostsToday(userId: string) : Promise<any> {
    const result = await db.one(sql`
      select count(*) from post where user_id = ${userId} and date_trunc('day', posted_at) = CURRENT_DATE
    `);
    return result.count;
  }
}
