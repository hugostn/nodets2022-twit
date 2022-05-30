import Post from '../models/Post';
import PostData from '../data/PostData';

class FeedService {
  static async getFeed(page: number = 1, size: number = 10) : Promise<Post[]> {
    const posts = await PostData.getFeed(page, size);
    return posts;
  }

  static async getFeedByUserId(id: string, page: number = 1, size: number = 10) : Promise<Post[]> {
    const posts = await PostData.getFeedByUserId(id, page, size);
    return posts;
  }
}
export default FeedService;
