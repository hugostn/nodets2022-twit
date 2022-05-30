import { Application, Router } from 'express';
import IndexController from '../controllers/IndexController';
import PostController from '../controllers/PostController';

const routes: [string, Router][] = [
  ['/', IndexController],
  ['/posts', PostController],
];

export default (app: Application) => {
  routes.forEach(([url, controller]) => app.use(url, controller));
};
