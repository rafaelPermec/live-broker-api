import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

import { IListaAcoes, IAcoesSegmentadas } from '../../interfaces';

// Aqui, eu simulo a API da B3 de forma realista, através de algoritimo que criei para raspar listas de ações e preços em tempo real,
// diretamente do site de analise www.fundamentus.com.br.

// URL da página que vamos raspar os dados.
const url = 'https://www.fundamentus.com.br/resultado.php/api';

// Minha função assincrona que raspa dados do site de analise Fundamentus,
async function apiBovespa(): Promise<IListaAcoes[]> {
  try {
    // Faz o fetch e resgata o HTML do site Fundamentus;
    const { data } = await axios.get(url);

    // Carrega o HTML que resgatamos na linha anterior;
    const $ = cheerio.load(data);

    // Busca, resume e seleciona um trecho do HTML resgatado;
    const listItems = $('#resultado.resultado tbody tr');

    // Lista vetor, que simula API real da B3, para armazenarmos as informações resgatadas;
    const acoes: IListaAcoes[] = [];
    // Metodo 'each', que indica que queremos 'tocar' em
    // todos os itens do HTML, que estão no trecho resgatado;
    listItems.each((_index, element) => {
      // Objeto que vamos montar para a analise;
      const papel: IListaAcoes = { CodAtivo: 0, SiglaAtivo: '', Valor: 0 };

      // Metodos de busca em HTML elaborados pela lib 'cheerio'
      // 1º - atribui os valores para codigo do ativo
      // 2º - atribui os valores para os preços,
      // eles são filtrado e depois transformados em número;
      const codigosDeAtivos = $(element)
        .children()
        .first()
        .text()
        .trim();
      papel.SiglaAtivo = codigosDeAtivos;

      const precoDeAtivos = $(element)
        .children('td:nth-child(2)')
        .text()
        .replace('.', '')
        .replace(',', '.')
        .trim();
      papel.Valor = parseFloat(precoDeAtivos);

      // Popula o array com os objetos criados;
      acoes.push(papel);
    });
    // Ordena a lista de ações por ordem alfabetica;
    const ativosOrdenados = acoes
      .sort((a, b) => a.SiglaAtivo.localeCompare(b.SiglaAtivo))
      .map(({ SiglaAtivo, Valor }, index) => ({ CodAtivo: index + 1, SiglaAtivo, Valor }));

    // Escreve a lista de ações em um .json local;
    fs.writeFileSync(
      './src/database/simulacao-API-bovespa.json',
      JSON.stringify(ativosOrdenados, null, 2),
    );

    // log opcional em nosso console;
    // console.log(ativosOrdenados);

    // Retorna a lista de codigos de ativo e valores de ações em tempo real,
    // segundo o site Fundamentus.
    return ativosOrdenados;
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

async function apiBovespaSegmentada(): Promise<IAcoesSegmentadas> {
  const acoes = await apiBovespa();

  // Filtra vetor de ações com objetivo de identifica unicamente, na ordem alfabetica
  // e segmentar de acordo com a negociação adequada, como seria na API da B3.
  const ativosOrdinarios = acoes
    .filter((item) => item.SiglaAtivo.includes('3'))
    .filter((item) => !(item.SiglaAtivo.includes('13')) && !(item.SiglaAtivo.includes('33')))
    .filter((item) => item.Valor > 0);
  const ativosPreferenciais = acoes
    .filter((item) => item.SiglaAtivo.includes('4'))
    .filter((item) => item.Valor > 0);
  const unitsDBR = acoes
    .filter((item) => item.SiglaAtivo.includes('11'))
    .filter((item) => item.Valor > 0);

  // Monta o objeto designado pela interface IAcoesSegmentadas para devido retorno;
  const ativosSegmentados = { ativosPreferenciais, ativosOrdinarios, unitsDBR };

  // log opcional em nosso console;
  // console.log(ativosSegmentados);

  // Escreve a lista de ações em um .json local;
  fs.writeFileSync(
    './src/database/simulacao-API-bovespa-Segmentada.json',
    JSON.stringify([ativosSegmentados], null, 2),
  );

  return ativosSegmentados;
}

apiBovespaSegmentada();

export {
  apiBovespa,
  apiBovespaSegmentada,
};
