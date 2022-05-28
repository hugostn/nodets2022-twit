import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => res.json({ info: 'OK!' }));
app.get('/info', (req: Request, res: Response) => res.json({ version: '1.0' }));

export default app;
