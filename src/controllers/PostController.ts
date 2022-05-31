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
  key?: string,
  page?: string,
  size?: string,
};

export type GetSearchPostParams = {
  key: string,
};

PostController.post('', async (req: Request<PostPostBody>, res: Response, next: NextFunction) => {
  try {
    const postId = await PostService.insert(req.body);
    res.status(201).json({ post_id: postId });
  } catch (error) {
    next(error);
  }
});

PostController.get('/byusername/:username', async (req: Request<GetPostBody, GetPostBody>, res: Response) => {
  const { username } = req.params;
  const { page: pageParam, size: sizeParam } = req.query;
  const page = !pageParam ? undefined : Number(pageParam);
  const size = !sizeParam ? undefined : Number(sizeParam);
  const result = await PostService.findByUsername(username, page, size);
  res.json({ data: result });
});

PostController.get('/search/:key', async (req: Request<GetPostBody>, res: Response) => {
  const { key } = req.params;
  const { page: pageParam, size: sizeParam } = req.query;
  const page = !pageParam ? undefined : Number(pageParam);
  const size = !sizeParam ? undefined : Number(sizeParam);
  const result = await PostService.findByContentLike(key ?? null, page, size);
  res.json({ data: result });
});

export default PostController;
