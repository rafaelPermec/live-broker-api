import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
// import { ContasService } from '../services';
import HttpException from '../shared/HttpException';

// const contasService = new ContasService();

const InvestimentosSchema = Joi.object({
  CodCliente: Joi.number().required().messages({
    'any.required': 'Você precisa informar seu código de cliente.',
    'number.base': 'O seu código de cliente é composto apenas por números.',
  }),
  CodAtivo: Joi.number().integer().min(0).required()
    .messages({
      'any.required': 'Você precisa informar o código de ativo.',
      'number.base': 'Por favor, digite somente números.',
      'number.min': 'O código do ativo é sempre maior do que zero.',
      'number.integer': 'O número não pode conter casas decimais',
    }),
  QtdeAtivo: Joi.number().integer().min(0).required()
    .messages({
      'any.required': 'Você precisa informar a quantidade de ativos.',
      'number.base': 'Por favor, digite somente números.',
      'number.min': 'O valor de transferencia deve ser maior do que zero.',
      'number.integer': 'O número não pode conter casas decimais',
    }),
});

const InvestimentosTypoMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = InvestimentosSchema.validate(req.body);
  if (error) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, `${error.message}`);

  next();
};

// const ContasAlreadyExistMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
//   const { Email } = req.body;
//   const getUsers = await contasService.getAll();
//   const thereIsUserEmail = getUsers.find((item) => item.Email === Email);

//   if (thereIsUserEmail) {
//     throw new HttpException(
//       StatusCodes.CONFLICT,
//       'Este e-mail já está cadastrado em nossa plataforma.',
//     );
//   }

//   next();
// };

// const ContasFinanceiroTypoMiddleware = (req: Request, _res: Response, next: NextFunction) => {
//   const { error } = ContasFinanceiroSchema.validate(req.body);
//   // console.log(error?.details[0].type);
//   if (error) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, `${error.message}`);

//   next();
// };

// const InvestimentosFinanceiroMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
//   const { CodCliente, QtdeAtivo } = req.body;
//   const accCliente = await contasService.getAccById(CodCliente);
//   const saldo = accCliente.Saldo as number;
//   const hasEnough = (saldo - Valor);

//   if (hasEnough < 0) {
//     throw new HttpException(
//       StatusCodes.FORBIDDEN,
//       'Você não tem Saldo suficiente para a transação. Deposite em /contas/deposito.',
//     );
//   }

//   next();
// };

export {
  InvestimentosTypoMiddleware,
};
