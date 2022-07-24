import { Router } from 'express';
import { InvestimentosController } from '../controllers';
// import { LoginNotFoundMiddleware, LoginTypoMiddleware } from '../middlewares';

const routes = Router();

const investimentosController = new InvestimentosController();

routes
  .post('/compra', investimentosController.compraAtivo)
  .post('/venda', investimentosController.vendeAtivo);

export default routes;
