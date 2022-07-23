import { Router } from 'express';
import { AtivosController } from '../controllers';
// import { ValidationMiddleware } from '../middlewares';

const routes = Router();

const ativosController = new AtivosController();

routes
  .get('/corretora', ativosController.ativosCorretora);

export default routes;
