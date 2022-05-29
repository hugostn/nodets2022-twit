import { Request, Response, Router } from 'express';

const IndexController: Router = Router();

IndexController.get('/', (req: Request, res: Response) => res.json({ info: 'OK!' }));
IndexController.get('/info', (req: Request, res: Response) => res.json({ version: '1.0' }));

export default IndexController;
