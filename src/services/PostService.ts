import Post from '../models/Post';
import PostData from '../data/PostData';

class PostService {
  static async findOne(id: string) : Promise<Post> {
    const result: Post = await PostData.findOne(id);
    return result;
  }

  static async findByUsername(
    username: string,
    page: number = 1,
    size: number = 10,
  ) : Promise<Post[]> {
    const posts = await PostData.findByUsername(username, page, size);
    return posts;
  }

  static async canPost(userId: string) {
    const postsCount = await PostData.countPostsToday(userId);
    return postsCount < 5;
  }

  static async insert(post: Post) : Promise<string> {
    if (!await PostService.canPost(post.user_id)) {
      throw new Error('User can not submit more than 5 posts a day');
    }
    const postId = await PostData.insert(post);
    return postId;
  }
}
export default PostService;
