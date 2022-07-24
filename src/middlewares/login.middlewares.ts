import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ContasService } from '../services';
import HttpException from '../shared/HttpException';

const contasService = new ContasService();

const LoginSchema = Joi.object({
  Email: Joi.string().email().required().messages({
    'any.required': 'Você precisa informar seu email para realizar o Login.',
    'string.email': 'Por favor, digite um e-mail válido para continuar.',
    'string.empty': 'Por favor, digite seu e-mail.',
  }),
  Senha: Joi.string().min(8).required().messages({
    'any.required': 'Você precisa informar sua senha para realizar o Login.',
    'string.empty': 'Por favor, digite sua senha.',
    'string.min': 'Sua senha é composta por mais de 8 caracteres.',
  }),
});

const LoginTypoMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = LoginSchema.validate(req.body);
  // console.log(error?.details[0].type);
  if (error) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, `${error.message}`);

  next();
};

const LoginNotFoundMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
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

const antiMiddleManById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { CodCliente } = res.locals.user.user;

  const buscaCliente = await contasService.getAll();
  const clienteExiste = buscaCliente.find((item) => item.CodCliente === Number(id));

  if (CodCliente !== Number(id)) {
    throw new HttpException(
      StatusCodes.UNAUTHORIZED,
      'Você não pode realizar essa operação.',
    );
  } if (!clienteExiste) {
    throw new HttpException(
      StatusCodes.NOT_FOUND,
      'Cliente não esta no banco de dados.',
    );
  }
  next();
};

const antiMiddleManByBody = async (req: Request, res: Response, next: NextFunction) => {
  const { CodCliente } = req.body;
  const { user } = res.locals.user;

  const buscaCliente = await contasService.getAll();
  const clienteExiste = buscaCliente.find((item) => item.CodCliente === CodCliente);

  if (Number(CodCliente) !== Number(user.CodCliente)) {
    throw new HttpException(
      StatusCodes.UNAUTHORIZED,
      'Você não pode realizar essa operação.',
    );
  } if (!clienteExiste) {
    throw new HttpException(
      StatusCodes.NOT_FOUND,
      'Cliente não esta no banco de dados.',
    );
  }

  next();
};

export {
  LoginTypoMiddleware,
  LoginNotFoundMiddleware,
  antiMiddleManById,
  antiMiddleManByBody,
};
