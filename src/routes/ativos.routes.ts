import { Router } from 'express';
import { AtivosController } from '../controllers';
// import { ValidationMiddleware } from '../middlewares';

const routes = Router();

const ativosController = new AtivosController();

routes
  .get('/corretora', ativosController.ativosCorretora)
  .get('/:id', ativosController.ativosCliente)
  .get('/por-codigo/:id', ativosController.ativosPorId)
  .get('/por-sigla/:sigla', ativosController.ativosPorSigla);

export default routes;
