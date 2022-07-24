import { IAtivos } from './IAtivos.interface';

interface IConta {
  CodCliente?: number;
  Nome: string;
  Sobrenome?: string;
  Email: string;
  Senha?: string;
  Saldo?: number;
  IdCarteira?: number;
}

interface IAtivosCliente extends IConta {
  AtivosNoPortfolio: IAtivos[];
  SaldoTotalEmAtivos: number;
}

interface ITransacao {
  CodCliente: number;
  Valor: number;
}

interface IOperacao extends ITransacao {
  IdFinanceiro: number;
  TipoOperacao: string;
  DataOperacao: Date;
}

export {
  IConta,
  IAtivosCliente,
  ITransacao,
  IOperacao,
};
