import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ContasService } from '../services';
import HttpException from '../shared/HttpException';

const contasService = new ContasService();

const ContasClienteSchema = Joi.object({
  Nome: Joi.string().min(3).required().messages({
    'any.required': 'Você precisa informar seu nome.',
    'string.empty': 'Por favor, digite seu nome.',
    'string.min': 'Seu nome é composto por mais de duas letras.',
  }),
  Sobrenome: Joi.string().min(3).required().messages({
    'any.required': 'Você precisa informar seu sobrenome',
    'string.empty': 'Por favor, digite seu sobrenome.',
    'string.min': 'Seu sobrenome é composto por mais de duas letras.',
  }),
  Email: Joi.string().email().required().messages({
    'any.required': 'Você precisa informar seu email.',
    'string.email': 'Por favor, digite um e-mail válido para continuar.',
    'string.empty': 'Por favor, digite seu e-mail.',
  }),
  Senha: Joi.string().min(8).required().messages({
    'any.required': 'Você precisa informar sua senha.',
    'string.empty': 'Por favor, digite sua senha.',
    'string.min': 'Sua senha é composta por mais de 8 caracteres.',
  }),
});

const ContasFinanceiroSchema = Joi.object({
  CodCliente: Joi.number().required().messages({
    'any.required': 'Você precisa informar seu código de cliente.',
    'number.base': 'O seu código de cliente é composto apenas por números.',
  }),
  Valor: Joi.number().min(0).required().messages({
    'any.required': 'Você precisa informar um valor.',
    'number.base': 'Por favor, digite somente números decimais.',
    'number.min': 'O valor de transferencia deve ser maior do que zero.',
  }),
});

const ContasTypoMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = ContasClienteSchema.validate(req.body);
  // console.log(error?.details[0].type);
  if (error) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, `${error.message}`);

  next();
};

const ContasNotFoundMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { Email } = req.body;
  const getUsers = await contasService.getAll();
  const thereIsUserEmail = getUsers.filter((item) => item.Email.includes(Email));

  if (!thereIsUserEmail || thereIsUserEmail.length <= 0) {
    throw new HttpException(
      StatusCodes.NOT_FOUND,
      'E-mail não encontrado. Para se cadastrar, você precisa ir até /contas/cadastro',
    );
  }

  next();
};

const ContasAlreadyExistMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { Email } = req.body;
  const getUsers = await contasService.getAll();
  const thereIsUserEmail = getUsers.find((item) => item.Email === Email);

  if (thereIsUserEmail) {
    throw new HttpException(
      StatusCodes.CONFLICT,
      'Este e-mail já está cadastrado em nossa plataforma.',
    );
  }

  next();
};

const ContasFinanceiroTypoMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = ContasFinanceiroSchema.validate(req.body);
  // console.log(error?.details[0].type);
  if (error) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, `${error.message}`);

  next();
};

const ContasFinanceiroMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { CodCliente, Valor } = req.body;
  const accCliente = await contasService.getAccById(CodCliente);
  const saldo = accCliente.Saldo as number;
  const hasEnough = (saldo - Valor);

  if (hasEnough < 0) {
    throw new HttpException(
      StatusCodes.FORBIDDEN,
      'Você não tem Saldo suficiente para a transação. Deposite em /contas/deposito.',
    );
  }

  next();
};

export {
  ContasTypoMiddleware,
  ContasNotFoundMiddleware,
  ContasAlreadyExistMiddleware,
  ContasFinanceiroTypoMiddleware,
  ContasFinanceiroMiddleware,
};
