interface IListaAcoes {
  CodAtivo: number;
  SiglaAtivo: string;
  Valor: number;
}

interface IAcoesSegmentadas {
  ativosOrdinarios: IListaAcoes[];
  ativosPreferenciais: IListaAcoes[];
  unitsDBR: IListaAcoes[];
}

export {
  IListaAcoes,
  IAcoesSegmentadas,
};
