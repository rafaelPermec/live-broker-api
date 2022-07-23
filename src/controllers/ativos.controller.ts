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

    // Monta objeto escalonavel, se cada corretora da XP também tivesse listada na aplicação;
    const sttdout = {
      nomeCorretora: 'Aspen Investimentos',
      Endereço: 'Rua Wilson Rocha Lima, 137 - Estoril',
      Cidade: 'Belo Horizonte - MG',
      AtivosDisponiveis: assets,
    };

    res.status(StatusCodes.ACCEPTED).json(sttdout);
  };

  public ativosCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const criandoCliente = await this.service.ativosCliente(Number(id));
    res.status(StatusCodes.OK).json(criandoCliente);
  };

  public ativosPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const buscaAtivo = await this.service.ativosPorId(Number(id));
    return res.status(StatusCodes.OK).json(buscaAtivo);
  };

  public ativosPorSigla = async (req: Request, res: Response) => {
    const { sigla } = req.params;
    const buscaAtivo = await this.service.ativosPorSigla(sigla);
    return res.status(StatusCodes.OK).json(buscaAtivo);
  };
}
