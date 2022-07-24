import { Router } from 'express';
import { InvestimentosController } from '../controllers';
import { InvestimentosTypoMiddleware } from '../middlewares';

const routes = Router();

const investimentosController = new InvestimentosController();

routes
  .post(
    '/compra',
    InvestimentosTypoMiddleware,
    investimentosController.compraAtivo,
  )
  .post(
    '/venda',
    InvestimentosTypoMiddleware,
    investimentosController.vendeAtivo,
  );

export default routes;
