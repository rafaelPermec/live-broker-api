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
    // Cria Pessoa Usuaria no banco de dados;
    const queryCriaCliente = `INSERT INTO ProcessoSeletivoXP.Cliente 
    (Nome, Sobrenome, Email, Senha) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const criaCliente = await this.connection.execute<ResultSetHeader>(
      queryCriaCliente,
      [Nome, Sobrenome, Senha, Email],
    );
    const [rows] = criaCliente;
    const { insertId } = rows;

    // Cria Carteira da pessoa Usuaria
    const queryCriaCarteira = 'INSERT INTO ProcessoSeletivoXP.Carteira (IdCliente) VALUES (?);';
    const criaCarteira = await this.connection.execute(
      queryCriaCarteira,
      [insertId],
    );

    // Atualiza entidade Cliente com sua carteira recém criada;
    const queryAtualizaCliente = `UPDATE ProcessoSeletivoXP.Cliente 
    SET IdCarteira = ? WHERE IdCliente = ?;`;
    const atualizaCarteira = await this.connection.execute(
      queryAtualizaCliente,
      [insertId, insertId],
    );

    // Resolve todas as promessas simultaneas;
    await Promise.all([criaCliente, criaCarteira, atualizaCarteira]);

    // Retornar objeto para visualização do usuario;
    return { CodCliente: insertId, Nome, Sobrenome, Email };
  }

  public async update(id: number, { Nome, Sobrenome, Email, Senha }: IClientes): Promise<void> {
    // Muda somente constantes que não comprometem o sistema e a operação como um todo.
    const query = `UPDATE ProcessoSeletivoXP.Cliente 
    SET Nome = ?, Sobrenome= ?, Email = ?, Senha = ?
    WHERE id = ?`;
    await this.connection.execute(query, [Nome, Sobrenome, Email, Senha, id]);
  }

  public async remove(id: number): Promise<void> {
    const query = 'DELETE FROM ProcessoSeletivoXP.Cliente  WHERE id = ?';
    await this.connection.execute(query, [id]);
  }
}
