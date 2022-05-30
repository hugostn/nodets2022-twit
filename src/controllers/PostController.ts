import {
  NextFunction, Request, Response, Router,
} from 'express';
import PostService from '../services/PostService';

const PostController: Router = Router();

export type PostPostBody = {
  user_id: string,
  type: string,
  content: string,
  refer?: string,
};

export type GetPostBody = {
  username: string,
  page?: number,
  size?: number,
};

PostController.post('', async (req: Request<PostPostBody>, res: Response, next: NextFunction) => {
  try {
    const postId = await PostService.insert(req.body);
    res.status(201).json({ post_id: postId });
  } catch (error) {
    next(error);
  }
});

PostController.get('/byusername/:username', async (req: Request<GetPostBody>, res: Response) => {
  const { username, page, size } = req.params;
  const result = await PostService.findByUsername(username, page, size);
  res.json({ data: result });
});

export default PostController;
