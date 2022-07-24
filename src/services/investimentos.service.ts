import { StatusCodes } from 'http-status-codes';
import { IBodyInvestimento, IInvestimentos } from '../interfaces';
import { InvestimentosModel, connection, ContasModel, AtivosModel } from '../models';
import { apiBovespaSegmentada } from '../models/Simulação-API-Bovespa/fundamentus-scrapping.model';
import HttpException from '../shared/HttpException';

export default class InvestimentosService {
  public model: InvestimentosModel;

  public contaModel: ContasModel;

  public ativosModel: AtivosModel;

  constructor() {
    this.model = new InvestimentosModel(connection);
    this.contaModel = new ContasModel(connection);
    this.ativosModel = new AtivosModel(connection);
  }

  public async vendeAtivo({
    CodCliente,
    CodAtivo,
    QtdeAtivo }: IBodyInvestimento): Promise<IInvestimentos> {
    // Busca pelo IdCarteira do responsavel pela transação;
    const buscaCarteira = await this.contaModel.getAccById(CodCliente);
    const { IdCarteira } = buscaCarteira;

    // Extraindo valores dos ativos em tempo real, de acordo com a API de raspagem de dados;
    const { ativosPreferenciais } = await apiBovespaSegmentada();
    const ativosTempoReal = ativosPreferenciais
      .filter((item) => item.CodAtivo === CodAtivo);

    // Delimita nosso filtro:
    if (!ativosTempoReal || ativosTempoReal.length < 1) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        'Ativo não encontrado, ou código de ativo inválido.',
      );
    }
    const { SiglaAtivo, Valor } = ativosTempoReal[0];

    // Cria valor inteiro da transação
    const valorPorQtde = (Valor * QtdeAtivo);

    // Monta o objeto para declarar venda em nossa Database;
    const sttdin = { CodCliente, CodAtivo, SiglaAtivo, QtdeAtivo, Valor: valorPorQtde, IdCarteira };
    const result = this.model.vendeAtivo(sttdin);
    return result;
  }

  public async compraAtivo({
    CodCliente,
    CodAtivo,
    QtdeAtivo }: IBodyInvestimento): Promise<IInvestimentos> {
    // Busca pelo IdCarteira do responsavel pela transação;
    const buscaCarteira = await this.contaModel.getAccById(CodCliente);
    const { IdCarteira } = buscaCarteira;

    // Extraindo valores dos ativos em tempo real, de acordo com a API de raspagem de dados;
    const { ativosPreferenciais } = await apiBovespaSegmentada();
    const ativosTempoReal = ativosPreferenciais
      .filter((item) => item.CodAtivo === CodAtivo);

    // Delimita nosso filtro:
    if (!ativosTempoReal || ativosTempoReal.length !== 1) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        'Ativo não encontrado, ou código de ativo inválido.',
      );
    }
    const { SiglaAtivo, Valor } = ativosTempoReal[0];

    // Cria valor inteiro da transação
    const valorPorQtde = (Valor * QtdeAtivo);

    // Monta o objeto para declarar venda em nossa Database;
    const sttdin = { CodCliente, CodAtivo, SiglaAtivo, QtdeAtivo, Valor: valorPorQtde, IdCarteira };
    const result = this.model.vendeAtivo(sttdin);
    console.log(result);
    return result;
  }
}
