import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

import IListaAcoes from '../../interfaces/IListaAcoes.interface';

// URL da página que vamos raspar os dados.
const url = 'https://www.fundamentus.com.br/resultado.php/api';

// Nossa função asincrona que raspa dados do site de analise Fundamentus;
export default async function raspagemDeDados(): Promise<IListaAcoes[] | undefined> {
  try {
    // Faz o fetch e resgata o HTML do site Fundamentus;
    const { data } = await axios.get(url);

    // Carrega o HTML que resgatamos na linha anterior;
    const $ = cheerio.load(data);

    // Busca, resume e seleciona um trecho do HTML resgatado;
    const listItems = $('#resultado.resultado tbody tr');

    // Nossa lista vetor, para armazenarmos as informações resgatadas;
    const acoes: IListaAcoes[] = [];
    // Metodo 'each', que indica que queremos 'tocar' em
    // todos os itens do HTML, que estão no trecho resgatado;
    listItems.each((_index, element) => {
      // Objeto que vamos montar para a analise;
      const papel: IListaAcoes = { codAtivo: '', Valor: 0 };

      // Metodos de busca em HTML elaborados pela lib 'cheerio';
      const codigosDeAtivos = $(element)
        .children()
        .first()
        .text()
        .trim();
      papel.codAtivo = codigosDeAtivos;

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
    acoes.sort((a, b) => a.codAtivo.localeCompare(b.codAtivo));

    // Escreve a lista de ações em um .json local;
    fs.writeFileSync('./xp-inc/src/models/ListaDeAtivos.json', JSON.stringify(acoes, null, 2));

    // Escreve a lista de ações no log do terminal;
    // console.log();
    console.log(acoes);

    // Retorna a lista de codigos de ativo e valores de ações em tempo real,
    // segundo o site Fundamentus.
    return acoes;
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

raspagemDeDados();
