interface IAtivos {
  CodCliente?: number;
  CodAtivo: number;
  SiglaAtivo: string;
  QtdeAtivos: number;
  Valor?: number;
}

interface IAtivosCorretora {
  nomeCorretora: string;
  Endereço: string;
  Cidade: string;
  AtivosDisponiveis: IAtivos[];
}

export {
  IAtivos,
  IAtivosCorretora,
};
