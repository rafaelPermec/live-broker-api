import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InvestimentosService } from '../services';

export default class InvestimentosController {
  private service: InvestimentosService;

  constructor() {
    this.service = new InvestimentosService();
  }

  public vendeAtivo = async (req: Request, res: Response) => {
    const sttdout = await this.service.vendeAtivo(req.body);
    return res.status(StatusCodes.OK).json(sttdout);
  };

  public compraAtivo = async (req: Request, res: Response) => {
    const sttdout = await this.service.compraAtivo(req.body);
    return res.status(StatusCodes.OK).json(sttdout);
  };
}
