import { Pool } from 'mysql2/promise';
import { IAtivos } from '../interfaces';
// import { IUsers } from '../interfaces';

export default class AtivosModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async ativosCorretora(): Promise<IAtivos[]> {
    const query = `SELECT IdAtivos AS CodAtivos, SiglaAtivos, QtdeAtivosCorretora AS QtdeAtivos
     FROM ProcessoSeletivoXP.Corretora;`;

    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as IAtivos[];
  }

  public async ativosCliente(id: number): Promise<IAtivos[]> {
    const query = `SELECT pt.IdAtivos AS CodAtivos, pt.SiglaAtivos, pt.QtdeAtivos
      FROM ProcessoSeletivoXP.Portfolio AS pt
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
