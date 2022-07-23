interface IListaAcoes {
  CodAtivo?: number;
  SiglaAtivos: string;
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
