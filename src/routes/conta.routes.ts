import { Router } from 'express';
import { ContasController } from '../controllers';
import { ValidationMiddleware } from '../middlewares';

const routes = Router();

const contasController = new ContasController();

routes
  .get('/:id', ValidationMiddleware, contasController.getAccById)
  .post('/cadastro', contasController.createNewAcc)
  .put('/editar-perfil/:id', ValidationMiddleware, contasController.updateAcc);

export default routes;
