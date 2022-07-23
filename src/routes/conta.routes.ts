import { Router } from 'express';
import { ContasController } from '../controllers';
import {
  ContasNotFoundMiddleware,
  ContasTypoMiddleware,
  ValidationMiddleware,
} from '../middlewares';
import { ContasFinanceiroTypoMiddleware } from '../middlewares/conta.middlewares';

const routes = Router();

const contasController = new ContasController();

routes
  .post('/cadastro', ContasTypoMiddleware, contasController.createNewAcc)
  .get('/:id', ValidationMiddleware, contasController.getAccById)
  .post(
    '/saque',
    ValidationMiddleware,
    ContasFinanceiroTypoMiddleware,
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
