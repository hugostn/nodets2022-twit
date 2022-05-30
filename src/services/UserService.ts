import User from '../models/User';
import UserData from '../data/UserData';

class PostService {
  static async findByUsername(username: string) : Promise<User> {
    const user = await UserData.findByUsername(username);
    return user;
  }
}
export default PostService;
