import request from 'supertest';
import { range } from 'ramda';

import app from '../../src/server/app';
import UserService from '../../src/services/UserService';
import PostService from '../../src/services/PostService';

describe('#it Post', () => {
  it('should insert post when user', async () => {
    const user = await UserService.findByUsername('user1');

    const result = await request(app).post('/posts')
      .set('Content-type', 'application/json')
      .send({
        user_id: user.id,
        type: 'post',
        content: 'test content - should insert post when user',
      });

    expect(result.status).toBe(201);
    const post = result.body;
    expect(post.post_id).not.toBeNull();
    const postId = post.post_id;

    const newPost = await PostService.findOne(postId);

    expect(newPost).not.toBeNull();
    expect(newPost).toHaveProperty('id', postId);
  });

  it('should not insert post after 5 inserts', async () => {
    const user = await UserService.findByUsername('user2');

    const posts = range(1, 10).map((index) => ({
      user_id: user.id,
      type: 'post',
      content: `test content ${index}`,
    }));

    const requestApp = request(app);

    await requestApp.post('/posts').set('Content-type', 'application/json').send(posts[0]);
    await requestApp.post('/posts').set('Content-type', 'application/json').send(posts[1]);
    await requestApp.post('/posts').set('Content-type', 'application/json').send(posts[2]);
    await requestApp.post('/posts').set('Content-type', 'application/json').send(posts[3]);
    await requestApp.post('/posts').set('Content-type', 'application/json').send(posts[4]);

    const result = await request(app).post('/posts').set('Content-type', 'application/json').send(posts[5]);

    expect(result.status).toBe(500);
    expect(result.body.error.message).toBe('User can not submit more than 5 posts a day');
  });
});
