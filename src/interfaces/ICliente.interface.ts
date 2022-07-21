import { IAtivos } from './IAtivos.interface';

interface IClientes {
  CodCliente: number;
  Nome: string;
  Sobrenome?: string;
  Email: string;
  Saldo?: number;
}

interface ITodosClientes {
  VisualizandoComoAdmin: IClientes[];
}

interface IAtivosCliente extends IClientes {
  AtivosNoPortfolio: IAtivos[];
}

export {
  IClientes,
  ITodosClientes,
  IAtivosCliente,
};
