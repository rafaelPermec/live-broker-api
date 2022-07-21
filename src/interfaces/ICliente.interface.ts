interface IClientes {
  CodCliente: number;
  Nome: string;
  Sobrenome: string;
  Email: string;
  Saldo: number;
}

interface ITodosClientes {
  VisualizandoComoAdmin: IClientes[];
}

export {
  IClientes,
  ITodosClientes,
};
