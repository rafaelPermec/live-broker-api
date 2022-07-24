import { Router } from 'express';
import { ContasController } from '../controllers';
import {
  ContasFinanceiroTypoMiddleware,
  ContasTypoMiddleware,
  ValidationMiddleware,
  ContasAlreadyExistMiddleware,
  ContasFinanceiroMiddleware,
  antiMiddleManByBody,
  antiMiddleManById,
} from '../middlewares';

const routes = Router();

const contasController = new ContasController();

routes
  .post(
    '/cadastro',
    ContasTypoMiddleware,
    ContasAlreadyExistMiddleware,
    contasController.createNewAcc,
  )
  .get(
    '/:id',
    ValidationMiddleware,
    contasController.getAccById,
  )
  .post(
    '/saque',
    ValidationMiddleware,
    antiMiddleManByBody,
    ContasFinanceiroTypoMiddleware,
    ContasFinanceiroMiddleware,
    contasController.accWithdraw,
  )
  .post(
    '/deposito',
    ValidationMiddleware,
    ContasFinanceiroTypoMiddleware,
    contasController.accDeposit,
  )
  .put(
    '/editar-perfil/:id',
    ValidationMiddleware,
    antiMiddleManById,
    ContasTypoMiddleware,
    contasController.updateAcc,
  );

export default routes;
