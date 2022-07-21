import { NextFunction, Request, Response } from 'express';
import HttpException from '../shared/HttpException';

const ErrorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
};

export default ErrorMiddleware;
