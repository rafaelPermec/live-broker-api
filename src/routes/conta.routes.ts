import { Router } from 'express';
import { ContasController } from '../controllers';
// import { UsersMiddlewareStrings, UsersMiddlewareNumbers } from '../middlewares';

const routes = Router();

const contasController = new ContasController();

routes
  .get('/:id', contasController.getAccById)
  .post('/cadastro', contasController.createNewAcc)
  .put('/editar-perfil/:id', contasController.updateAcc);

export default routes;
