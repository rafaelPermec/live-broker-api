import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClientesService } from '../services';

export default class ClientesController {
  private service: ClientesService;

  constructor() {
    this.service = new ClientesService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const clientes = await this.service.getAll();
    res.status(StatusCodes.OK).json(clientes);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cliente = await this.service.getById(Number(id));
    if (!cliente) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Código do Cliente inválido. Tente Novamente!',
      });
    }

    res.status(StatusCodes.OK).json(cliente);
  };

  public create = async (req: Request, res: Response) => {
    const novoCliente = req.body;
    const criandoCliente = await this.service.create(novoCliente);
    res.status(StatusCodes.CREATED).json(criandoCliente);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const mudandoCliente = req.body;
    await this.service.update(Number(id), mudandoCliente);
    return res.status(StatusCodes.NO_CONTENT).end();
  };

  public remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.remove(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Cliente deletado com Sucesso.' });
  };
}
