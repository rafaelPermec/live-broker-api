import { Pool, ResultSetHeader } from 'mysql2/promise';
import { ITrade, IInvestimentos } from '../interfaces';
import AtivosModel from './ativos.model';

export default class InvestimentosModel {
  private ativosModel: AtivosModel;

  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
    this.ativosModel = new AtivosModel(connection);
  }

  public async atualizaCorretora(qtdeAtivos: string, idAtivo: number): Promise<void> {
    const queryAtualizaCorretora = `UPDATE ProcessoSeletivoXP.Corretora 
    SET QtdeAtivosCorretora = (QtdeAtivosCorretora + ?) WHERE IdAtivos = ?;`;
    await this.connection.execute<ResultSetHeader>(
      queryAtualizaCorretora,
      [qtdeAtivos, idAtivo],
    );
  }

  public async vendeAtivo({ CodCliente, CodAtivo, SiglaAtivo, QtdeAtivo, Valor, IdCarteira }
    : IInvestimentos): Promise<ITrade> {
    // Cria o trade conforme o que é enviado na requisição:
    const queryCriaTrade = `INSERT INTO ProcessoSeletivoXP.Trade 
    (TipoOperacao, IdAtivos, QtdeAtivos, ValorOperacao, IdCarteira) 
    VALUES (1, ?, ?, ?, ?);`;
    const criaTrade = await this.connection.execute<ResultSetHeader>(
      queryCriaTrade,
      [CodAtivo, QtdeAtivo, Valor, IdCarteira],
    );
    const [idTrade] = criaTrade;
    const { insertId } = idTrade;

    // Atualiza o saldo do Cliente que efetuou a transação;
    const queryAtualizaSaldo = `UPDATE ProcessoSeletivoXP.Carteira 
    SET Saldo = (Saldo + ?) WHERE IdCliente = ?;`;
    const atualizaSaldo = await this.connection.execute<ResultSetHeader>(
      queryAtualizaSaldo,
      [Valor, CodCliente],
    );

    // Verifica se ativo já consta no Portfolio:
    const vetorListaAtivosCliente = await this.ativosModel.ativosCliente(CodCliente);
    const existeAtivo = vetorListaAtivosCliente.find((item) => item.CodAtivo === CodAtivo);
    // Se ativo constar no Portifolio:
    if (existeAtivo) {
      const queryAtualizaAtivo = `UPDATE ProcessoSeletivoXP.Portfolio 
        SET QtdeAtivos = (QtdeAtivos - ?) WHERE WHERE IdAtivos = ? AND IdCliente = ?;`;
      await this.connection.execute<ResultSetHeader>(
        queryAtualizaAtivo,
        [QtdeAtivo, CodAtivo, CodCliente],
      );
    }

    // Monta o comprovante que devolveremos ao cliente;
    const queryLocalizaOperacao = `SELECT ValorOperacao AS Valor, TipoOperacao, IdTrade, 
    CreatedAt AS DataOperacao FROM ProcessoSeletivoXP.Trade WHERE IdTrade = ?;`;
    const localizaOperacao = await this.connection.execute(
      queryLocalizaOperacao,
      [insertId],
    );
    const [rows] = localizaOperacao;
    const [ops] = rows as ITrade[];

    // Realiza as promises assincronas simultaneamente;
    await Promise.all([criaTrade, atualizaSaldo, localizaOperacao]);
    this.atualizaCorretora(`+ ${QtdeAtivo}`, CodAtivo);

    // Monta objeto comprovante da operação financeira
    const { DataOperacao, IdTrade, TipoOperacao } = ops;
    return {
      CodCliente,
      IdTrade,
      TipoOperacao,
      CodAtivo,
      SiglaAtivo,
      QtdeAtivo,
      Valor: ops.Valor,
      DataOperacao,
    };
  }

  public async compraAtivo({ CodCliente, CodAtivo, SiglaAtivo, QtdeAtivo, Valor, IdCarteira }
    : IInvestimentos): Promise<ITrade> {
    // Cria o trade conforme o que é enviado na requisição:
    const queryCriaTrade = `INSERT INTO ProcessoSeletivoXP.Trade 
    (TipoOperacao, IdAtivos, QtdeAtivos, ValorOperacao, IdCarteira) 
    VALUES (2, ?, ?, ?, ?);`;
    const criaTrade = await this.connection
      .execute<ResultSetHeader>(queryCriaTrade, [CodAtivo, QtdeAtivo, Valor, IdCarteira]);
    const [idTrade] = criaTrade;
    const { insertId } = idTrade;

    // Atualiza o saldo do Cliente que efetuou a transação;
    const queryAtualizaSaldo = `UPDATE ProcessoSeletivoXP.Carteira 
    SET Saldo = (Saldo - ?) WHERE IdCliente = ?;`;
    const atualizaSaldo = await this.connection
      .execute<ResultSetHeader>(queryAtualizaSaldo, [Valor, CodCliente]);

    // Verifica se ativo já consta no Portfolio:
    const vetorListaAtivosCliente = await this.ativosModel.ativosCliente(CodCliente);
    const existeAtivo = vetorListaAtivosCliente.find((item) => item.CodAtivo === CodAtivo);
    // Se ativo constar no Portifolio:
    if (existeAtivo) {
      const queryAtualizaAtivo = `UPDATE ProcessoSeletivoXP.Portfolio 
        SET QtdeAtivos = (QtdeAtivos + ?) WHERE WHERE IdAtivos = ? AND IdCliente = ?;`;
      await this.connection
        .execute<ResultSetHeader>(queryAtualizaAtivo, [QtdeAtivo, CodAtivo, CodCliente]);
      // Se ativo não constar no Portfolio:
    } else {
      const queryAtualizaAtivo = `INSERT INTO ProcessoSeletivoXP.Portfolio
      (IdCliente, IdAtivos, SiglaAtivos QtdeAtivos)
      VALUES (?, ?, ?, ?);`;
      const atualizaAtivo = await this.connection.execute<ResultSetHeader>(
        queryAtualizaAtivo,
        [CodCliente, CodAtivo, SiglaAtivo, QtdeAtivo],
      );
      await Promise.resolve(atualizaAtivo);
    }

    // Monta o comprovante que devolveremos ao cliente;
    const queryLocalizaOperacao = `SELECT ValorOperacao AS Valor, TipoOperacao, IdTrade, 
    CreatedAt AS DataOperacao FROM ProcessoSeletivoXP.Trade WHERE IdTrade = ?;`;
    const localizaOperacao = await this.connection.execute(queryLocalizaOperacao, [insertId]);
    const [rows] = localizaOperacao;
    const [ops] = rows as ITrade[];

    // Realiza as promises assincronas simultaneamente;
    await Promise.all([criaTrade, atualizaSaldo, localizaOperacao]);
    this.atualizaCorretora(`- ${QtdeAtivo}`, CodAtivo);

    // Monta objeto comprovante da operação financeira
    const { DataOperacao, IdTrade, TipoOperacao } = ops;
    return {
      CodCliente,
      IdTrade,
      TipoOperacao,
      CodAtivo,
      SiglaAtivo,
      QtdeAtivo,
      Valor: ops.Valor,
      DataOperacao,
    };
  }
}
