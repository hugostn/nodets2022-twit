import { Request, Response, Router } from 'express';
import FeedService from '../services/FeedService';

const IndexController: Router = Router();

export type GetFeedQParams = {
  page?: number,
  size?: number,
};

IndexController.get('/', (req: Request, res: Response) => res.json({
  info: 'Node Typescript 2022 - Twit Api',
  services: {
    info: [
      'GET /info',
      'GET /feed',
    ],
    user:
      [
        'GET /users',
        'GET /users/{id}/feed',
        'POST /users/{id}/follow',
        'DELETE /users/{id}/unfollow',
      ],
    post: [
      'POST /posts',
      'GET /posts/byusername/{id}',
      'GET /posts/search/{key}',
    ],
  },
}));

IndexController.get('/feed', async (req: Request<GetFeedQParams>, res: Response) => {
  const { page: pageParam, size: sizeParam } = req.query;
  const page = !pageParam ? undefined : Number(pageParam);
  const size = !sizeParam ? undefined : Number(sizeParam);
  const result = await FeedService.getFeed(page, size);
  res.json({ data: result });
});

export default IndexController;
