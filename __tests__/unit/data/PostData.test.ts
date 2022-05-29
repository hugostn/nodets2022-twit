import PostData from '../../../src/data/PostData';

describe('#unit PostData', () => {
  test('should have posts for user1', async () => {
    const posts = await PostData.findByUsername('user1');
    expect(posts).not.toBeNull();
    expect(posts).toHaveLength(10);
  });

  test('should have different posts for diffrent pages', async () => {
    const page1 = await PostData.findByUsername('user1');
    const page2 = await PostData.findByUsername('user1', 2);

    expect(page1[0].id).not.toBe(page2[0].id);
  });
});
