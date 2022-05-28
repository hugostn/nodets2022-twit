import request from 'supertest';
import app from '../../src/app';

describe('#it Index', () => {
  test('root should return 200', async () => {
    const result = await request(app).get('/').send();
    expect(result.status).toBe(200);
    expect(result.body.info).toBe('OK!');
  });
});
