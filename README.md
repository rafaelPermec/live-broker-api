# Bem-vindos ao meu projeto !

Os detalhes do projeto estão todos escondidos pelos `<details>`, viu? =)

## 🥇 Como rodar o projeto?

<details>
  <summary><code>Localmente</code></summary><br>
  
  1 - Dê o fork no projeto e clone-o para sua maquina com o comando 
  `git clone git@github.com:rafaelPermec/processo-seletivo-XP-inc.git`
  em seu terminal.
  
  2 - Entre com o comando `cd processo-seletivo-XP-inc && cd xp-inc && npm install` para entrar no diretorio principal e instalar as dependencias do projeto.
  
  3 - Digite `npm start` ou `npm run dev` para começar a rodar o servidor. Ele estará na porta `3800`.
  
  4 - Abra seu GUI preferido (Postman, Insomnia ou Thunder Cliente) para fazer as requisições à minha API! 😃
  
  5 - Não se esqueça de direcionar sua GUI de requisições ou Browser para `http://localhost:3800`.
  
  6 - Para visualizar a documentação, basta acessar  `http://localhost:3800/api-doc`
 
</details>

<details>
  <summary><code>URL</code></summary><br>
  
  1 - O deploy do projeto foi realizado pelo heroku, utilizando db4free como fonte do MySQL;
  
  2 - Durante o processo, o código foi transpilado para javascript;
  
  3 - Você pode visualiza-lo clicando [aqui](https://xp-rafael-permec.herokuapp.com/api-doc/).
  
  4 - Ou copiando e colando a URL em seu browser: `https://xp-rafael-permec.herokuapp.com/api-doc/`.
  
  5 - Lembrando que começamos sempre pela documentação! =)
  
  6 - Faça sua primeira requisição pelo endpoint `/conta/cadastro` e depois faça requisição em `/login`, para coletar seu token JWT e receber autorização de entrada para o restante da API.
 
</details>

## ⚙️ O que foi implementado no projeto? 

<details>
  <summary>📓 Backlog </summary><br>
 
1- Introdução de `Github Actions` para Continous Integration, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/1) ;

2 - `Web-scrapping` para banco de dados de Ativos em tempo real, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/4);

3 - Criação e normalização de Entidades do `SQL` necessárias para o projeto, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/13);

4 - Disponibilizando `Seeds` para teste de desenvolvimento e Imagem da Normalização do Banco de Dados, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/14);

5 -  Estruturei o endpoint `/login`do  projeto, respeitando a finalidade que é a construção de um `front-end`, desenvolvendo um espaço para que o cliente possa logar na aplicação e ser autenticado, conforme token gerado pelo `jsonwebtoken`, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/17);

6 - Criação e Autenticação de Token do `JWT`, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/17);

7 - Implementei `Middlewares` de Erros na aplicação, para blindar de possíveis anomalias, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/17);

8 - Estruturei o endpoint `/contas`do  projeto, respeitando a finalidade que é a construção de um `front-end`, assim, não desenvolvendo meios para que houvessem requisições maliciosas (como um `PUT` na rota que contem o saldo final do cliente, por exemplo!), nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/17);

9 - Estruturei o endpoint `/login`do  projeto, aonde o usuário deve passar, após cadastro inicial, para se autenticar na plataforma através de token `JWT` e ter acesso aos endpoints específicos de sua conta, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/17);

10 - Estruturei o endpoint `/ativos`do  projeto, respeitando a finalidade que é a construção de um `front-end`. Sendo assim, optei por fazer as buscas de ativos por `/ativos/corretora`, para listar todos os ativos e sua quantidade em posse da corretora, `ativos/cliente/:id` para a busca de ativos por CodCliente, `/ativos/codigo/:id` para que possamos fazer uma busca individual do ativo, se ele constar na corretora, e `/ativos/sigla/:sigla` que faz a busca conforme o nome do papel cadastrado na Bovespa, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/17);

11 - Estruturei o endpoint `/investimentos` do projeto, criando conexão de backlog de transações de Compra e Venda entre ativos, limites de saldos e quantidades de disponibilidade dos mesmos. Através da rota `POST /investimentos/compra || /investimentos/venda`, o cliente consegue realizar transações, desde que esteja devidamente registrado e logado na aplicação. Um cliente não pode comprar ou vender ativos de/para outros clientes da aplicação, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/17);

12 - Estruturei `Middlewares` contra ataques de identidade para a aplicação, definindo que só os devidos donos das contas podem manipular ou verificar as mesmas, evitando assim ataques maliciosos, nesse [`Pull Request`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/pull/18);
</details>

<details>
  <summary>🏃‍♂️ Github Actions</summary><br>
  
 - Realizei uma integração de Actions, para facilitar o desenvolvimento do projeto utilizando o `EsLint` padronizado pelo Airbnb, com tipagem própria para Typescript. 
</details>

<details>
  <summary>🎲 Normalização do Banco de Dados SQL</summary><br>
  
<img src="https://github.com/rafaelPermec/processo-seletivo-XP-inc/blob/main/src/database/DB_Normalizado.png?raw=true" alt="DB Normalizado =)">
</details>

<details>
  <summary>📚 Linguagens Utilizadas</summary><br>
  
- Typescript
- Node.js
- MySQL
</details>

<details>
  <summary>📚 Bibliotecas e Frameworks</summary><br>

- eslint
- express
- mysql2
- express-async-errors
- dotenv 
- axios
- cheerio
- helmet
- joi
- jsontwebtoken (JWT)
- bcript-nodejs
- supertest
- nodemon
- swagger-ui-express
  
</details>

<details>
  <summary>♻️ Principais Funções</summary>

- [`apiBovespa()`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/blob/main/src/models/Simula%C3%A7%C3%A3o-API-Bovespa/fundamentus-scrapping.model.ts) : É uma função de Web-Scrapping criada à partir do site da Fundamentus que lista e cria um arquivo `.json` com toda a lista de ações da Bovespa e seu preço, em tempo real, ordenadas por ordem alfabética.

- [`apiBovespaSegmentada()`](https://github.com/rafaelPermec/processo-seletivo-XP-inc/blob/main/src/models/Simula%C3%A7%C3%A3o-API-Bovespa/fundamentus-scrapping.model.ts) : É uma função de Web-Scrapping criada à partir do site da Fundamentus que lista e cria um arquivo separado do citado acima, em `.json`, com toda a lista de ações da Bovespa e seu preço, em tempo real, filtrando e segmentando as ações listadas pela `apiBovespa()` de acordo com suas negociações adequadas.

- [`generateJWTToken({ user }: ICliente)`]() : Gera um Token JWT à partir das informações do cliente que passamos como parâmetro.

- [`authToken(token: string | undefined)`]() : Autentica o Token JWT que passamos para a função.

-  [`authenticateMiddleware()`]() : É utilizado para verificar se a autorização esta presente no Header da aplicação.

- [`HttpException(status: Number, message: string)`]() : É uma `classe` que estende a `superclasse` Error e consegue capturar qualquer qualquer erro que esteja envolvida, alterando a propriedade status e mensagem do erro capturado.

## Funções dos endpoint:
#### Principais funções que utilizei na API da Aplicação: 

<details>
       <summary><code>/login</code></summary><br>

- [` POST '/login' authenticate(user: req.body)`]() : É responsável por gerar o JWT Token que utilizamos na autenticação do usuário no ato do Login em nosso site, e é utilizado para todo o projeto. É a primeira barreira de segurança da aplicação. 

</details>
<details>
       <summary><code>/conta</code></summary>

- [` GET '/conta/:id' getAccById(id: number)`]() : Busca um único cliente, sendo este, o que esta verificado pelo JWT, e especifica suas informações cadastrais e seu Saldo na Corretora.

- [`POST '/conta/cadastro' createNewAcc({ user }: IClientes)`]() : Cria um novo usuário para a corretora e uma nova carteira designada para ele.

- [`POST '/conta/saque' accWithdraw(values: ITransacao)`]() : É o endopoint que controla os saques da conta da pessoa usuária.

- [`POST '/conta/deposito' accDeposit(values: ITransacao)`]() : É o endopoint que controla os depósitos da conta da pessoa usuária.

- [`PUT '/conta/editar-perfil/:id' updateAcc(id: number, { user }: IClientes)`]() : Altera informações cadastrais não vitais para o processo, respeitando a finalidade que da construção de um endpoint para que o cliente final consiga alterar suas próprias informações dentro da plataforma.
</details>

<details>
       <summary><code>/ativos</code></summary>

- [` GET '/ativos/corretora' ativosCorretora()`]() : Realiza a busca e mostra, conforme requisição, as ações listadas e em posse da corretora de valores. O seu preço é alterado dinamicamente, conforme a realidade.

- [` GET '/ativos/cliente/:id' ativosCliente(id: number)`]() : Mostra todos os ativos em posse do cliente, cujo CodCliente é apresentado na URL em forma de id (identificador unico).

- [` GET '/ativos/codigo/:id' ativosPorId(id: number)`]() :Mostra um único ativo, fazendo a busca através do seu CodAtivo (apresentado na URL em forma de id - identificador único), e nele esta incluso o valor da ação individual, sendo o preço real e mostrado conforme o índice de preços do pregão da Bovespa do momento.

- [` GET '/ativos/sigla/:id' ativosPorSigla(sigla: string)`]() : Mostra um único ativo, fazendo a busca através do seu SiglaAtivo (apresentado na URL em forma de sigla - nome registrado do papel na Bovespa, sendo uma sigla unica para cada empresa), e nele esta incluso o valor da ação individual, sendo o preço real e mostrado conforme o índice de preços do pregão da Bovespa do momento.
</details>

<details>
       <summary><code>/investimentos</code></summary>

- [`POST '/investimentos/compra' vendeAtivo(asset: IInvenstimentos)`]() : Compra um ativo cadastrado na entidade responsável pela transação (*corretora*) e tem seu valor (*em tempo real*) creditado de sua conta, ficando registrado na entidade responsável pelo backlog (*trade*) o código e a data da transação, com o valor fixo pago no momento.

- [`POST '/investimentos/venda' compraAtivo(asset:  IInvenstimentos)`]() : Vende um ativo cadastrado na entidade que armazena os investimentos do cliente (*portifolio*) e tem seu valor (*em tempo real*) debitado de sua conta, ficando registrado na entidade responsável pelo backlog (*trade*) o código e a data da transação, com o valor fixo pago no momento.
</details>

## Funções de Middleware:
#### Responsáveis por capturar possíveis erros abstraídos e atribuir fatores de segurança nas transações.

<details>
       <summary><code>Typo Errors</code></summary>

- [`LoginTypoMiddleware()`]() : Impede que o cliente cometa qualquer erro de digitação ou confusão no tipo de dado disposto no corpo da requisição no momento em que vai logar na aplicação, verificando também se ele já consta no banco de dados.

- [`ContasTypoMiddleware()`]() : Impede que o cliente cometa qualquer erro de digitação ou confusão no tipo de dado disposto no corpo da requisição no momento de seu cadastro no banco de dados de clientes da aplicação.

- [`ContasFinanceiroTypoMiddleware()`]() : Impede que o cliente cometa qualquer erro de digitação, confusão no tipo de dado disposto no corpo da requisição ou ataques maliciosos (como depósitos negativos) no momento em que fará transações financeiras de Deposito e Saque na aplicação.

- [`InvestimentosTypoMiddleware()`]() : Impede que o cliente cometa qualquer erro de digitação, confusão no tipo de dado disposto no corpo da requisição ou ataques maliciosos (como compras negativas) no momento em que fará transações financeiras de Compra e Venda de Ativos na aplicação.
</details>
<details>
       <summary><code>Database Middlewares</code></summary>

- [`LoginNotFoundMiddleware()`]() : Busca por cliente em entidade que armazena todos os clientes da aplicação e retorna erro se não for encontrado ou devidamente cadastrado.

- [`ContasAlreadyExistMiddleware()`]() : Busca por cliente em entidade que armazena todos os clientes da aplicação e retorna erro se já o *e-mail* já tiver sido cadastrado no sistema.

- [`ContasFinanceiroMiddleware()`]() : Busca por saldo do cliente no sistema e verifica se ele tem saldo para fazer transação.

- [`InvestimentosCompraMiddleware()`]() : Busca por saldo do cliente no sistema e verifica se o ativo existe na corretora, se ele tem saldo para fazer transação e se corretora tem quantidade de ativos para fazer a transação.

- [`InvestimentosVendaMiddleware()`]() : Busca por saldo do cliente no sistema e verifica se ele tem o ativo em posse, em seu portfolio, para fazer transação.
</details>
<details>
       <summary><code>Error Middleware</code></summary><br>

- [`ErrorMiddleware()`]() : É um middleware que captura qualquer erro que podemos ter na aplicação e retorna uma resposta para o servidor.
</details>
<details>
       <summary><code>Security</code></summary>

- [`antiMiddleManById()`]() : Realiza a busca do cliente em banco de dados e verifica se quem está realizando a operação é realmente o cliente que realizou o login e possui o token *JWT* em seu header, através do id passado por parâmetro na URL.

- [`antiMiddleManByBody()`]() : Realiza a busca do cliente em banco de dados e verifica se quem está realizando a operação é realmente o cliente que realizou o login e possui o token *JWT* em seu header, através do CodCliente passado por corpo da requisição
</details>
</details>

----
