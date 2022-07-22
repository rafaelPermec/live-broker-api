import { NextFunction, Request, Response } from 'express';
import { authToken } from '../helpers';
import HttpException from '../shared/HttpException';

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;
  const user = await authToken(authorization);
  if (!user) {
    throw new HttpException(401, 'Tente realizar o login novamente.');
  }
  res.locals.user = user;
  next();
};

export default authenticateMiddleware;
