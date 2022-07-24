import { Router } from 'express';
import { InvestimentosController } from '../controllers';
import {
  antiMiddleManByBody,
  InvestimentosCompraMiddleware,
  InvestimentosTypoMiddleware,
  InvestimentosVendaMiddleware,
} from '../middlewares';

const routes = Router();

const investimentosController = new InvestimentosController();

routes
  .post(
    '/compra',
    antiMiddleManByBody,
    InvestimentosTypoMiddleware,
    InvestimentosCompraMiddleware,
    investimentosController.compraAtivo,
  )
  .post(
    '/venda',
    antiMiddleManByBody,
    InvestimentosTypoMiddleware,
    InvestimentosVendaMiddleware,
    investimentosController.vendeAtivo,
  );

export default routes;
