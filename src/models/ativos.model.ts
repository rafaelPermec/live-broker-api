import { Pool } from 'mysql2/promise';
import { IAtivos } from '../interfaces';

export default class AtivosModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async ativosCorretora(): Promise<IAtivos[]> {
    const query = `SELECT 
    IdAtivos AS CodAtivo, 
    SiglaAtivos AS SiglaAtivo, 
    QtdeAtivosCorretora AS QtdeAtivo
    FROM ProcessoSeletivoXP.Corretora
    ORDER BY IdAtivos ASC;`;

    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as IAtivos[];
  }

  public async ativosCliente(id: number): Promise<IAtivos[]> {
    const query = `SELECT IdAtivos AS CodAtivo, SiglaAtivos AS SiglaAtivo, QtdeAtivos AS QtdeAtivo
      FROM ProcessoSeletivoXP.Portfolio
      WHERE IdCliente = ? ORDER BY IdAtivos ASC;`;

    const result = await this.connection.execute(query, [id]);
    const [rows] = result;
    return rows as IAtivos[];
  }

  public async ativosPorId(id: number): Promise<IAtivos> {
    const query = `SELECT 
    IdAtivos AS CodAtivo, 
    SiglaAtivos AS SiglaAtivo, 
    QtdeAtivosCorretora AS QtdeAtivo
    FROM ProcessoSeletivoXP.Corretora WHERE IdAtivos = ? `;

    const result = await this.connection.execute(query, [id]);
    const [rows] = result;
    const [assets] = rows as IAtivos[];
    return assets;
  }

  public async ativosPorSigla(sigla: string): Promise<IAtivos> {
    const query = `SELECT 
    IdAtivos AS CodAtivo, 
    SiglaAtivos AS SiglaAtivo,
    QtdeAtivosCorretora AS QtdeAtivo
    FROM ProcessoSeletivoXP.Corretora WHERE SiglaAtivos = ? `;

    const result = await this.connection.execute(query, [sigla]);
    const [rows] = result;
    const [assets] = rows as IAtivos[];
    return assets;
  }
}
