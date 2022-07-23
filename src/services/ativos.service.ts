// import bcrypt from 'bcrypt-nodejs';
import { IAtivos } from '../interfaces';
import { AtivosModel, connection } from '../models';
import { apiBovespaSegmentada } from '../models/Simulação-API-Bovespa/fundamentus-scrapping.model';
import HttpException from '../shared/HttpException';

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
      const filtraDados = ativosPreferenciais
        .filter((ativo) => ativo.CodAtivo === item.CodAtivo)
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

      const filtraDados = ativosPreferenciais
        .filter((ativo) => ativo.CodAtivo === item.CodAtivo)
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

  public async ativosPorId(id: number): Promise<IAtivos[]> {
    const ativo = await this.model.ativosPorId(id);
    const { ativosPreferenciais } = await apiBovespaSegmentada();

    const filtraValor = ativosPreferenciais.filter((item) => item.CodAtivo === id);
    if (!filtraValor || filtraValor.length <= 0) {
      throw new HttpException(
        404,
        'Por enquanto, não possuímos este ativo na corretora.Tente novamente mais tarde.',
      );
    }

    const sttdout = filtraValor.map((element) => ({
      CodAtivo: ativo.CodAtivo,
      SiglaAtivo: ativo.SiglaAtivo,
      QtdeAtivo: ativo.QtdeAtivo,
      Valor: element.Valor,
    }));

    return sttdout as IAtivos[];
  }

  public async ativosPorSigla(sigla: string): Promise<IAtivos[]> {
    const ativo = await this.model.ativosPorSigla(sigla);
    const { ativosPreferenciais } = await apiBovespaSegmentada();

    const filtraValor = ativosPreferenciais.filter((item) => item.SiglaAtivo === sigla);
    if (!filtraValor || filtraValor.length <= 0) {
      throw new HttpException(
        404,
        'Por enquanto, não possuímos este ativo na corretora.Tente novamente mais tarde.',
      );
    }

    const sttdout = filtraValor.map((element) => ({
      CodAtivo: ativo.CodAtivo,
      SiglaAtivo: ativo.SiglaAtivo,
      QtdeAtivo: ativo.QtdeAtivo,
      Valor: element.Valor,
    }));

    return sttdout as IAtivos[];
  }
}
