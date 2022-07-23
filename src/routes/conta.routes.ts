import { Router } from 'express';
import { ContasController } from '../controllers';
import {
  ContasFinanceiroTypoMiddleware,
  ContasNotFoundMiddleware,
  ContasTypoMiddleware,
  ValidationMiddleware,
  ContasAlreadyExistMiddleware,
  ContasFinanceiroMiddleware,
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
  .get('/:id', ValidationMiddleware, contasController.getAccById)
  .post(
    '/saque',
    ValidationMiddleware,
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
    ContasTypoMiddleware,
    ContasNotFoundMiddleware,
    contasController.updateAcc,
  );

export default routes;
