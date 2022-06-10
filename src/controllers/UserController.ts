import {
  NextFunction, Request, Response, Router,
} from 'express';
import { validate as isUuid } from 'uuid';
import UserService from '../services/UserService';
import FeedService from '../services/FeedService';

const UserController: Router = Router();

export type FollowPostBody = {
  followed: string,
  follower: string,
};

export type GetPostBody = {
  username: string,
  page?: number,
  size?: number,
};

export type GetFeedPostBody = {
  id: string,
  page?: number,
  size?: number,
};

UserController.get('/:id', async (req: Request<GetFeedPostBody, GetFeedPostBody>, res: Response) => {
  const { id } = req.params;

  const result = isUuid(id)
    ? await UserService.findOne(id)
    : await UserService.findByUsername(id);

  res.json({ data: result });
});

UserController.get('/:id/feed', async (req: Request<GetFeedPostBody, GetFeedPostBody>, res: Response) => {
  const { id } = req.params;
  const { page: pageParam, size: sizeParam } = req.query;
  const page = !pageParam ? undefined : Number(pageParam);
  const size = !sizeParam ? undefined : Number(sizeParam);

  const userId = isUuid(id) ? id : (await UserService.findByUsername(id))?.id;

  const result = await FeedService.getFeedByUserId(userId, page, size);
  res.json({ data: result });
});

UserController.post('/:follower/follow/:followed', async (req: Request<FollowPostBody>, res: Response, next: NextFunction) => {
  try {
    const { followed: userId, follower: followerId } = req.params;

    if (!isUuid(userId)) {
      next(new Error('id should be a valid uuid'));
      return;
    }
    if (!followerId) {
      next(new Error('follower must be informed'));
      return;
    }

    await UserService.follow(followerId, userId);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

UserController.delete('/:follower/follow/:followed', async (req: Request<FollowPostBody>, res: Response, next: NextFunction) => {
  try {
    const { followed: userId, follower: followerId } = req.params;

    if (!isUuid(userId)) {
      next(new Error('id should be a valid uuid'));
      return;
    }
    if (!followerId) {
      next(new Error('follower must be informed'));
      return;
    }

    await UserService.unfollow(followerId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default UserController;
