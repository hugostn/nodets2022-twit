import { Application, Router } from 'express';
import IndexController from '../controllers/IndexController';
import PostController from '../controllers/PostController';
import UserController from '../controllers/UserController';

const routes: [string, Router][] = [
  ['/', IndexController],
  ['/posts', PostController],
  ['/users', UserController],
];

export default (app: Application) => {
  routes.forEach(([url, controller]) => app.use(url, controller));
};
