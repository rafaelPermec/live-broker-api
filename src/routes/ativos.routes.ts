import { Router } from 'express';
import { AtivosController } from '../controllers';
// import { ValidationMiddleware } from '../middlewares';

const routes = Router();

const ativosController = new AtivosController();

routes
  .get('/corretora', ativosController.ativosCorretora)
  .get('/cliente/:id', ativosController.ativosCliente)
  .get('/codigo/:id', ativosController.ativosPorId)
  .get('/sigla/:sigla', ativosController.ativosPorSigla);

export default routes;
