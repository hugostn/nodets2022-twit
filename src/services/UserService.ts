import User from '../models/User';
import UserData from '../data/UserData';

class UserService {
  static async findByUsername(username: string) : Promise<User> {
    const user = await UserData.findByUsername(username);
    return user;
  }

  static async isFollower(followedId: string, followerId: string) : Promise<void> {
    if (!(followedId && followerId)) { throw new Error('follower_id and user_id must be informed'); }
    await UserData.isFollower(followerId, followerId);
  }

  static async follow(followerId: string, userId: string) : Promise<void> {
    if (!(followerId && userId)) { throw new Error('follower_id and user_id must be informed'); }
    if (followerId === userId) { throw new Error('user can not follow himself'); }
    await UserData.follow(followerId, userId);
  }

  static async unfollow(followerId: string, userId: string) : Promise<void> {
    if (!(followerId && userId)) { throw new Error('follower_id and user_id must be informed'); }
    await UserData.unfollow(followerId, userId);
  }
}
export default UserService;
