import { Router } from 'express';
import { AuthController } from '../controllers';
import { LoginNotFoundMiddleware, LoginTypoMiddleware } from '../middlewares';

const routes = Router();

const authController = new AuthController();

routes.post(
  '/',
  LoginTypoMiddleware,
  LoginNotFoundMiddleware,
  authController.authenticate,
);

export default routes;
