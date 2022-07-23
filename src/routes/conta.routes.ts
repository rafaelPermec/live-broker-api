import { Router } from 'express';
import { ContasController } from '../controllers';
import {
  ContasNotFoundMiddleware,
  ContasTypoMiddleware,
  ValidationMiddleware,
} from '../middlewares';

const routes = Router();

const contasController = new ContasController();

routes
  .get('/:id', ValidationMiddleware, contasController.getAccById)
  .post('/cadastro', ContasTypoMiddleware, contasController.createNewAcc)
  .post('/saque', ValidationMiddleware, contasController.accWithdraw)
  .post('/deposito', ValidationMiddleware, contasController.accDeposit)
  .put(
    '/editar-perfil/:id',
    ValidationMiddleware,
    ContasTypoMiddleware,
    ContasNotFoundMiddleware,
    contasController.updateAcc,
  );

export default routes;
