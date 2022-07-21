import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IClientes } from '../interfaces';

export default class ClientesModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IClientes[]> {
    const query = `SELECT 
    cli.IdCliente AS CodCliente,
    cli.Nome AS Nome,
    cli.Sobrenome AS Sobrenome,
    cli.Email AS Email,
    cart.Saldo AS Saldo
      FROM ProcessoSeletivoXP.Cliente AS cli
      INNER JOIN ProcessoSeletivoXP.Carteira AS cart ON cli.IdCliente = cart.IdCliente;`;

    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as IClientes[];
  }

  public async getById(id: number): Promise<IClientes> {
    const query = `SELECT 
    cli.IdCliente AS CodCliente,
    cli.Nome AS Nome,
    cli.Sobrenome AS Sobrenome,
    cli.Email AS Email,
    cart.Saldo AS Saldo
      FROM ProcessoSeletivoXP.Cliente AS cli
      INNER JOIN ProcessoSeletivoXP.Carteira AS cart ON cli.IdCliente = cart.IdCliente
      WHERE cart.IdCliente = 1;`;

    const result = await this.connection.execute(query, [id]);
    const [rows] = result;
    const [client] = rows as IClientes[];
    return client;
  }

  public async create({
    Nome, Sobrenome, Email, Senha,
  }: IClientes): Promise<IClientes> {
    const query = `INSERT INTO ProcessoSeletivoXP.Cliente 
    (Nome, Sobrenome, Email, Senha) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await this.connection.execute<ResultSetHeader>(
      query,
      [Nome, Sobrenome, Senha, Email],
    );
    const [rows] = result;
    const { insertId } = rows;

    const queryCriaCarteira = `INSERT INTO ProcessoSeletivoXP.Cliente 
    (Nome, Sobrenome, Email, Senha) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const criaCarteira = await this.connection.execute<ResultSetHeader>(
      queryCriaCarteira,
      [Nome, Sobrenome, Senha, Email],
    );

    const queryAtualizaCliente = `INSERT INTO ProcessoSeletivoXP.Cliente 
    (Nome, Sobrenome, Email, Senha) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const atualizaCarteira = await this.connection.execute<ResultSetHeader>(
      queryAtualizaCliente,
      [Nome, Sobrenome, Senha, Email],
    );

    Promise.all([criaCarteira, atualizaCarteira]);

    return { CodCliente: insertId, Nome, Sobrenome, Email };
  }
}
