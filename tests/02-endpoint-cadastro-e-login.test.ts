/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-var-requires */
import request from 'supertest';
import * as iconv from 'iconv-lite';
import app from '../src';
import connection from '../src/models/connection';
import recreateDatabase from './recreateDatabase';

iconv.encodingExists('foo');

describe('1- Se o corpo da requisição recebe informações corretas', () => {
  beforeAll(async () => {
    await recreateDatabase(connection);
  });

  it('Será validado que o campo "Email" é obrigatório', async () => {
    const result = await request(app).post('/conta/cadastro').send({
      Nome: 'Rafael',
      Sobrenome: 'Perdigão Melo Castro',
      Senha: 'TESTEDevDeProjeto',
    });
    expect(result.statusCode).toEqual(406);
    expect(result.body.message).toEqual('Você precisa informar seu email.');
  });

  it('Será validado que o campo "Senha" é obrigatório', async () => {
    const result = await request(app).post('/conta/cadastro').send({
      Nome: 'Rafael',
      Sobrenome: 'Perdigão Melo Castro',
      Email: 'dev.rafaelpermec@gmail.com',
    });
    expect(result.statusCode).toEqual(406);
    expect(result.body.message).toEqual('Você precisa informar sua senha.');
  });

  it('Será validado que o campo "Email" é uma string com mais de 2 caracteres', async () => {
    const result = await request(app).post('/conta/cadastro').send({
      Nome: 'Ra',
      Sobrenome: 'Perdigão Melo Castro',
      Email: 'dev.rafaelpermec@gmail.com',
      Senha: 'TESTEDevDeProjeto',
    });
    expect(result.statusCode).toEqual(406);
    expect(result.body.message).toEqual('Seu nome é composto por mais de duas letras.');
  });
  it('Será validado que o campo "Senha" é uma string com 8 ou mais caracteres', async () => {
    const result = await request(app).post('/conta/cadastro').send({
      Nome: 'Rafael',
      Sobrenome: 'Perdigão Melo Castro',
      Email: 'dev.rafaelpermec@gmail.com',
      Senha: '12345',
    });
    expect(result.statusCode).toEqual(406);
    expect(result.body.message).toEqual('Sua senha é composta por mais de 8 caracteres.');
  });
});

describe('2 - Se o endpoint /conta/cadastro consegue:', () => {
  it('cadastrar a cliente com sucesso', async () => {
    const user = {
      Nome: 'Rafael',
      Sobrenome: 'Perdigão Melo Castro',
      Email: 'dev.rafaelpermec@gmail.com',
      Senha: 'TESTEDevDeProjeto',
    };
    const result = await request(app).post('/conta/cadastro').send(user);

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual({
      CodCliente: 6,
      Nome: 'Rafael',
      Sobrenome: 'Perdigão Melo Castro',
      Email: 'dev.rafaelpermec@gmail.com',
    });
  });
});

describe('3- Se o corpo da requisição recebe informações corretas, em /login', () => {
  it('Será validado que o campo "Email" é obrigatório', async () => {
    const result = await request(app).post('/login').send({
      Senha: 'TESTEDevDeProjeto',
    });
    expect(result.statusCode).toEqual(406);
    expect(result.body.message).toEqual('Você precisa informar seu email para realizar o Login.');
  });

  it('Será validado que o campo "Senha" é obrigatório', async () => {
    const result = await request(app).post('/login').send({
      Email: 'dev.rafaelpermec@gmail.com',
    });
    expect(result.statusCode).toEqual(406);
    expect(result.body.message).toEqual('Você precisa informar sua senha para realizar o Login.');
  });

  it('Será validado que o campo "Senha" é uma string com 8 ou mais caracteres', async () => {
    const result = await request(app).post('/login').send({
      Email: 'dev.rafaelpermec@gmail.com',
      Senha: 'TEto',
    });
    expect(result.statusCode).toEqual(406);
    expect(result.body.message).toEqual('Sua senha é composta por mais de 8 caracteres.');
  });
});

describe('4 - Se o endpoint /login consegue:', () => {
  it('logar cliente com sucesso', async () => {
    const user = {
      Email: 'dev.rafaelpermec@gmail.com',
      Senha: 'TESTEDevDeProjeto',
    };
    const result = await request(app).post('/login').send(user);

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('Cliente');
    expect(result.body).toHaveProperty('auth');
    expect(result.body).toHaveProperty('token');
    connection.end();
  });
});
