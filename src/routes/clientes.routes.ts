import { Router } from 'express';
import { ClientesController } from '../controllers';
// import { UsersMiddlewareStrings, UsersMiddlewareNumbers } from '../middlewares';

const routes = Router();

const clientesController = new ClientesController();

routes
  .get('/', clientesController.getAll)
  .post('/', clientesController.create);

routes
  .get('/:id', clientesController.getById)
  .put('/:id', clientesController.update)
  .delete('/:id', clientesController.remove);

export default routes;
