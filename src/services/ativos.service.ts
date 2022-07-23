// import bcrypt from 'bcrypt-nodejs';
import { IAtivos } from '../interfaces';
import { AtivosModel, connection } from '../models';
import { apiBovespaSegmentada } from '../models/Simulação-API-Bovespa/fundamentus-scrapping.model';
// import HttpException from '../shared/HttpException';

export default class AtivosService {
  public model: AtivosModel;

  constructor() {
    this.model = new AtivosModel(connection);
  }

  public async ativosCorretora(): Promise<IAtivos[]> {
    const assets = await this.model.ativosCorretora();

    // Extraindo valores dos ativos em tempo real, de acordo com a API de raspagem de dados;
    const { ativosPreferenciais } = await apiBovespaSegmentada();

    const vetorDeValores = [] as IAtivos[];

    assets.forEach((item) => {
      const Valor = { CodAtivo: 0, SiglaAtivo: '', QtdeAtivo: 0, Valor: 0 } as IAtivos;
      const filtraDados = ativosPreferenciais.filter((ativo) => ativo.CodAtivo === item.CodAtivo)
        .map((element) => {
          Valor.Valor = element.Valor;
          Valor.CodAtivo = element.CodAtivo;
          Valor.QtdeAtivo = item.QtdeAtivo;
          Valor.SiglaAtivo = element.SiglaAtivo;
          vetorDeValores.push(Valor);
          return vetorDeValores;
        });
      return filtraDados;
    });

    return vetorDeValores;
  }

  public async ativosCliente(id: number): Promise<IAtivos[]> {
    const clienteAssets = await this.model.ativosCliente(id);

    // Extraindo valores dos ativos em tempo real, de acordo com a API de raspagem de dados;
    const { ativosPreferenciais } = await apiBovespaSegmentada();

    const vetorDeValores = [] as IAtivos[];

    clienteAssets.forEach((item) => {
      const Valor = {
        CodCliente: 0,
        CodAtivo: 0,
        SiglaAtivo: '',
        QtdeAtivo: 0,
        Valor: 0,
        SaldoTotalEmAtivo: 0,
      } as IAtivos;

      const filtraDados = ativosPreferenciais.filter((ativo) => ativo.CodAtivo === item.CodAtivo)
        .map((element) => {
          Valor.CodCliente = id;
          Valor.Valor = element.Valor;
          Valor.CodAtivo = element.CodAtivo;
          Valor.QtdeAtivo = item.QtdeAtivo;
          Valor.SiglaAtivo = element.SiglaAtivo;
          Valor.SaldoTotalEmAtivo = (item.QtdeAtivo * element.Valor).toFixed(2);
          vetorDeValores.push(Valor);
          return vetorDeValores;
        });
      return filtraDados;
    });

    return vetorDeValores;
  }

  // public async createNewAcc(user: IConta): Promise<Omit<IConta, 'Senha'>> {
  //   const salt = bcrypt.genSaltSync(5);
  //   user.Senha = bcrypt.hashSync(user.Senha as string, salt);
  //   const result: IConta = await this.model.createNewAcc(user) as IConta;
  //   return result;
  // }

  // public async updateAcc(id: number, user: IConta): Promise<void> {
  //   const thereIsUser = await this.model.getAccById(id);
  //   if (!thereIsUser) throw new HttpException(404, 'Cliente não encontrado.');
  //   const salt = bcrypt.genSaltSync(5);
  //   user.Senha = bcrypt.hashSync(user.Senha as string, salt);
  //   return this.model.updateAcc(id, user);
  // }

  // public async accWithdraw(/* id: number, */ values: ITransacao): Promise<IOperacao> {
  //   const transaction: IOperacao = await this.model.accWithdraw(values);
  //   return transaction;
  // }

  // public async accDeposit(values: ITransacao): Promise<IOperacao> {
  //   const transaction: IOperacao = await this.model.accDeposit(values);
  //   return transaction;
  // }
}
