import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();

routes(app);

export default app;
