import { Router } from 'express';
import { InvestimentosController } from '../controllers';
import { InvestimentosCompraMiddleware, InvestimentosTypoMiddleware } from '../middlewares';

const routes = Router();

const investimentosController = new InvestimentosController();

routes
  .post(
    '/compra',
    InvestimentosTypoMiddleware,
    InvestimentosCompraMiddleware,
    investimentosController.compraAtivo,
  )
  .post(
    '/venda',
    InvestimentosTypoMiddleware,
    investimentosController.vendeAtivo,
  );

export default routes;
