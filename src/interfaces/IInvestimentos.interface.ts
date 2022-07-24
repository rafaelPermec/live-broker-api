interface IBodyInvestimento {
  CodCliente: number;
  CodAtivo: number;
  QtdeAtivo: number;
}

interface IInvestimentos {
  CodCliente: number;
  CodAtivo: number;
  SiglaAtivo: string;
  QtdeAtivo: number;
  Valor: number;
  IdCarteira?: number;
}

interface ITrade extends IInvestimentos {
  IdTrade: number;
  TipoOperacao: string;
  DataOperacao: Date;
}
// CodCliente, CodAtivo, QtdeAtivo, Valor, IdCarteira

export {
  IBodyInvestimento,
  IInvestimentos,
  ITrade,
};
