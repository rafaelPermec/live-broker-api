import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IConta, IOperacao, ITransacao } from '../interfaces';

export default class ContasModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IConta[]> {
    const query = `SELECT 
    cli.IdCliente AS CodCliente,
    cli.Nome AS Nome,
    cli.Sobrenome AS Sobrenome,
    cli.Senha AS Senha,
    cli.Email AS Email,
    cart.Saldo AS Saldo
      FROM ProcessoSeletivoXP.Cliente AS cli
      INNER JOIN ProcessoSeletivoXP.Carteira AS cart ON cli.IdCliente = cart.IdCliente;`;
    const result = await this.connection.execute(query);
    const [rows] = result;
    return rows as IConta[];
  }

  public async getAccById(id: number): Promise<IConta> {
    const query = `SELECT 
    cli.IdCliente AS CodCliente,
    cli.Nome AS Nome,
    cli.Sobrenome AS Sobrenome,
    cli.Email AS Email,
    cart.IdCarteira,
    cart.Saldo AS Saldo
      FROM ProcessoSeletivoXP.Cliente AS cli
      INNER JOIN ProcessoSeletivoXP.Carteira AS cart ON cli.IdCliente = cart.IdCliente
      WHERE cart.IdCliente = ?;`;

    const result = await this.connection.execute(query, [id]);
    const [rows] = result;
    const [client] = rows as IConta[];
    return client;
  }

  public async createNewAcc({
    Nome, Sobrenome, Email, Senha,
  }: IConta): Promise<Omit<IConta, 'Senha'>> {
    // Cria Pessoa Usuaria no banco de dados;
    const queryCriaCliente = `INSERT INTO ProcessoSeletivoXP.Cliente 
    (Nome, Sobrenome, Email, Senha) 
    VALUES (?, ?, ?, ?)`;
    const criaCliente = await this.connection.execute<ResultSetHeader>(
      queryCriaCliente,
      [Nome, Sobrenome, Email, Senha],
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
    return { CodCliente: insertId, Nome, Sobrenome, Email } as Omit<IConta, 'Senha'>;
  }

  public async updateAcc(id: number, { Nome, Sobrenome, Email, Senha }: IConta): Promise<void> {
    // Muda somente constantes que não comprometem o sistema e a operação como um todo.
    const query = `UPDATE ProcessoSeletivoXP.Cliente 
    SET Nome = ?, Sobrenome= ?, Email = ?, Senha = ?
    WHERE IdCliente = ?`;
    await this.connection.execute(query, [Nome, Sobrenome, Email, Senha, id]);
  }

  public async accWithdraw({ CodCliente, Valor }: ITransacao): Promise<IOperacao> {
    // Cria a operação conforme o que é enviado na requisição:
    const queryCriaOperacao = `INSERT INTO ProcessoSeletivoXP.Financeiro 
    (TipoOperacao, IdCarteira, Valor) VALUES (1, ?, ?);`;
    const criaOperacao = await this.connection.execute<ResultSetHeader>(
      queryCriaOperacao,
      [CodCliente, Valor],
    );
    const [idFinanceiro] = criaOperacao;
    const { insertId } = idFinanceiro;

    // Atualiza o saldo do Cliente que efetuou a transação;
    const queryAtualizaSaldo = `UPDATE ProcessoSeletivoXP.Carteira 
    SET Saldo = (Saldo - ?) WHERE IdCliente = ?;`;
    const atualizaSaldo = await this.connection.execute<ResultSetHeader>(
      queryAtualizaSaldo,
      [Valor, CodCliente],
    );

    // Monta o comprovante que devolveremos ao cliente;
    const queryLocalizaOperacao = `SELECT
      Valor,
      TipoOperacao,
      IdFinanceiro,
      CreatedAt AS DataOperacao 
      FROM ProcessoSeletivoXP.Financeiro WHERE IdFinanceiro = ?;`;
    const localizaOperacao = await this.connection.execute(
      queryLocalizaOperacao,
      [insertId],
    );
    const [rows] = localizaOperacao;
    const [ops] = rows as IOperacao[];

    // Realiza as promises assincronas simultaneamente;
    await Promise.all([criaOperacao, atualizaSaldo, localizaOperacao]);

    // Monta objeto comprovante da operação financeira
    const { DataOperacao, IdFinanceiro, TipoOperacao } = ops;
    return { CodCliente, IdFinanceiro, TipoOperacao, Valor: ops.Valor, DataOperacao };
  }

  public async accDeposit({ CodCliente, Valor }: ITransacao): Promise<IOperacao> {
    // Cria a operação conforme o que é enviado na requisição:
    const queryCriaOperacao = `INSERT INTO ProcessoSeletivoXP.Financeiro 
    (TipoOperacao, IdCarteira, Valor) VALUES (2, ?, ?);`;
    const criaOperacao = await this.connection.execute<ResultSetHeader>(
      queryCriaOperacao,
      [CodCliente, Valor],
    );
    const [idFinanceiro] = criaOperacao;
    const { insertId } = idFinanceiro;

    // Atualiza o saldo do Cliente que efetuou a transação;
    const queryAtualizaSaldo = `UPDATE ProcessoSeletivoXP.Carteira 
    SET Saldo = (Saldo + ?) WHERE IdCliente = ?;`;
    const atualizaSaldo = await this.connection.execute<ResultSetHeader>(
      queryAtualizaSaldo,
      [Valor, CodCliente],
    );

    // Monta o comprovante que devolveremos ao cliente;
    const queryLocalizaOperacao = `SELECT
      Valor,
      TipoOperacao,
      IdFinanceiro,
      CreatedAt AS DataOperacao 
      FROM ProcessoSeletivoXP.Financeiro WHERE IdFinanceiro = ?;`;
    const localizaOperacao = await this.connection.execute(
      queryLocalizaOperacao,
      [insertId],
    );
    const [rows] = localizaOperacao;
    const [ops] = rows as IOperacao[];

    // Realiza as promises assincronas simultaneamente;
    await Promise.all([criaOperacao, atualizaSaldo, localizaOperacao]);

    // Monta objeto comprovante da operação financeira
    const { DataOperacao, IdFinanceiro, TipoOperacao } = ops;
    return { CodCliente, IdFinanceiro, TipoOperacao, Valor: ops.Valor, DataOperacao };
  }
}
