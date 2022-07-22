import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContasService } from '../services';
import HttpException from '../shared/HttpException';

export default class ContasController {
  private service: ContasService;

  constructor() {
    this.service = new ContasService();
  }

  public getAccById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { CodCliente } = res.locals.user.user;
    const cliente = await this.service.getAccById(Number(id));

    if (!cliente) throw new HttpException(404, 'Código do Cliente inválido. Tente Novamente!');
    if (CodCliente !== Number(id)) throw new HttpException(401, 'Você não pode ir ai!');

    res.status(StatusCodes.OK).json(cliente);
  };

  public createNewAcc = async (req: Request, res: Response) => {
    const novoCliente = req.body;
    const criandoCliente = await this.service.createNewAcc(novoCliente);
    res.status(StatusCodes.CREATED).json(criandoCliente);
  };

  public updateAcc = async (req: Request, res: Response) => {
    const { id } = req.params;
    const mudandoCliente = req.body;
    await this.service.updateAcc(Number(id), mudandoCliente);
    return res.status(StatusCodes.NO_CONTENT).end();
  };
}
