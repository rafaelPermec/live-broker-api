import { IAtivos } from './IAtivos.interface';

interface IConta {
  CodCliente?: number;
  Nome: string;
  Sobrenome?: string;
  Email: string;
  Senha?: string;
  Saldo?: number;
}

interface IAtivosCliente extends IConta {
  AtivosNoPortfolio: IAtivos[];
  SaldoTotalEmAtivos: number;
}

export {
  IConta,
  IAtivosCliente,
};
