interface IListaAcoes {
  idAtivos?: number;
  CodAtivo: string;
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
