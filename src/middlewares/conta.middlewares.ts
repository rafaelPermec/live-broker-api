import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ContasService } from '../services';
import HttpException from '../shared/HttpException';

const ContasSchema = Joi.object({
  Nome: Joi.string().min(2).required().messages({
    'any.required': 'Você precisa informar seu nome.',
    'string.empty': 'Por favor, digite seu nome.',
    'string.min': 'Seu nome é composto por mais de duas letras.',
  }),
  Sobrenome: Joi.string().min(2).required().messages({
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

const ContasTypoMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = ContasSchema.validate(req.body);
  console.log(error?.details[0].type);
  if (error) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, `${error.message}`);

  next();
};

const ContasNotFoundMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { Email } = req.body;
  const contasService = new ContasService();
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

export {
  ContasTypoMiddleware,
  ContasNotFoundMiddleware,
};
