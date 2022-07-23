import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AtivosService } from '../services';
// import HttpException from '../shared/HttpException';

export default class AtivosController {
  private service: AtivosService;

  constructor() {
    this.service = new AtivosService();
  }

  public ativosCorretora = async (_req: Request, res: Response) => {
    const assets = await this.service.ativosCorretora();

    // Monta objeto escalonavel, se cada corretora tivesse listada na aplicação;
    const sttdout = {
      nomeCorretora: 'Aspen Investimentos',
      Endereço: 'Rua Wilson Rocha Lima, 137 - Estoril',
      Cidade: 'Belo Horizonte - MG',
      AtivosDisponiveis: assets,
    };

    res.status(StatusCodes.ACCEPTED).json(sttdout);
  };

  // public createNewAcc = async (req: Request, res: Response) => {
  //   const novoCliente = req.body;
  //   const criandoCliente = await this.service.createNewAcc(novoCliente);
  //   res.status(StatusCodes.CREATED).json(criandoCliente);
  // };

  // public updateAcc = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const mudandoCliente = req.body;
  //   await this.service.updateAcc(Number(id), mudandoCliente);
  //   return res.status(StatusCodes.NO_CONTENT).end();
  // };

  // public accWithdraw = async (req: Request, res: Response) => {
  //   // const { CodCliente } = res.locals.user.user;
  //   const client = await this.service.accWithdraw(req.body);
  //   res.status(StatusCodes.ACCEPTED).json(client);
  // };

  // public accDeposit = async (req: Request, res: Response) => {
  //   // const { CodCliente } = res.locals.user.user;
  //   const client = await this.service.accDeposit(req.body);
  //   res.status(StatusCodes.ACCEPTED).json(client);
  // };
}
