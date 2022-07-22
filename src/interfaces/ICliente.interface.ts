import { IAtivos } from './IAtivos.interface';

interface IClientes {
  CodCliente?: number;
  Nome: string;
  Sobrenome?: string;
  Email: string;
  Senha?: string;
  Saldo?: number;
}

interface ITodosClientes {
  VisualizandoComoAdmin: IClientes[];
}

interface IAtivosCliente extends IClientes {
  AtivosNoPortfolio: IAtivos[];
  SaldoTotalEmAtivos: number;
}

export {
  IClientes,
  ITodosClientes,
  IAtivosCliente,
};
