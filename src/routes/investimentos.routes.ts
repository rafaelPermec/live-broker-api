import { Router } from 'express';
import { InvestimentosController } from '../controllers';
import {
  InvestimentosCompraMiddleware,
  InvestimentosTypoMiddleware,
  InvestimentosVendaMiddleware,
} from '../middlewares';

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
    InvestimentosVendaMiddleware,
    investimentosController.vendeAtivo,
  );

export default routes;
