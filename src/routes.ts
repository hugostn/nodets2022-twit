import { Application, Router } from 'express';
import IndexController from './controllers/IndexController';

const routes: [string, Router][] = [
  ['/', IndexController],
];

export default (app: Application) => {
  routes.forEach(([url, controller]) => app.use(url, controller));
};
