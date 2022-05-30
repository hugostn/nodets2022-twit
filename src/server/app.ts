import express, { Application } from 'express';
import errors from './middleware/errors';
import routes from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
errors(app);

export default app;
