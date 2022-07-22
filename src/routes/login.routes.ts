import { Router } from 'express';
import { AuthController } from '../controllers';

const routes = Router();

const authController = new AuthController();

routes.post('/', authController.authenticate);

export default routes;
