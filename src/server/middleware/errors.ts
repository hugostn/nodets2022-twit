import { Application, NextFunction, Response } from 'express';

const errorToResponseData = (error : any) => ({
  statusCode: 500,
  message: error.message,
});

export default (app: Application) => {
  // eslint-disable-next-line no-unused-vars
  app.use((err: any, req: any, res: Response, _next: NextFunction) => {
    const error = errorToResponseData(err);
    res.status(error.statusCode).json({ error });
  });
};
