import { Pool } from 'mysql2/promise';
import { IAtivos } from '../interfaces';

export default class AtivosModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async ativosCorretora(): Promise<IAtivos[]> {
    const query = `SELECT IdAtivos AS CodAtivos, SiglaAtivos, QtdeAtivosCorretora AS QtdeAtivos
    FROM ProcessoSeletivoXP.Corretora
    ORDER BY IdAtivos ASC;`;

    const result = await this.connection.execute(query);
    const [rows] = result;

    // Extraindo valores dos ativos em tempo real, de acordo com a API de raspagem de dados;
    // const { ativosOrdinarios } = await apiBovespaSegmentada();
    // const filtraValores = ativosOrdinarios
    //   .filter((element) => element.CodAtivo === Number(ativos.CodAtivos))
    //   .map((item) => ({
    //     CodAtivo: Number(item.CodAtivo),
    //     SiglaAtivos: item.SiglaAtivos,
    //     QtdeAtivos: ativos.QtdeAtivos,
    //     Valor: item.Valor,
    //   }));

    return rows as IAtivos[];
  }

  public async ativosCliente(id: number): Promise<IAtivos[]> {
    const query = `SELECT IdAtivos AS CodAtivos, SiglaAtivos, QtdeAtivos 
      FROM ProcessoSeletivoXP.Portfolio
      WHERE IdCliente = ?;`;

    const result = await this.connection.execute(query, [id]);
    const [rows] = result;
    return rows as IAtivos[];
  }

  public async ativosPorId(id: number): Promise<IAtivos> {
    const query = `SELECT IdAtivos AS CodAtivos, SiglaAtivos 
    FROM ProcessoSeletivoXP.Corretora WHERE IdAtivos = ?;`;

    const result = await this.connection.execute(query, [id]);
    const [rows] = result;
    const [assets] = rows as IAtivos[];
    return assets;
  }
}
