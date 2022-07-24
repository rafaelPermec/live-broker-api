import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { apiBovespaSegmentada } from '../models/Simulação-API-Bovespa/fundamentus-scrapping.model';
import { AtivosService, ContasService } from '../services';
import HttpException from '../shared/HttpException';

const contasService = new ContasService();
const ativosService = new AtivosService();

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

const InvestimentosCompraMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { CodCliente, CodAtivo, QtdeAtivo } = req.body;
  const { ativosPreferenciais } = await apiBovespaSegmentada();

  const valorTempoReal = ativosPreferenciais.find((item) => item.CodAtivo === CodAtivo);
  if (!valorTempoReal) {
    throw new HttpException(
      StatusCodes.NOT_FOUND,
      'Ativo não encontrado, ou código de ativo inválido.',
    );
  }
  const valor = valorTempoReal?.Valor;

  const saldoCliente = await contasService.getAccById(CodCliente);
  const saldo = saldoCliente.Saldo as number;

  const portfolioCorretora = await ativosService.ativosCorretora();
  const ativoCorretora = portfolioCorretora.find((item) => item.CodAtivo === CodAtivo);
  const qtdeCorretora = ativoCorretora?.QtdeAtivo as number;

  const temSaldo = (saldo - (valor * QtdeAtivo));
  const corretoraTemAtivo = (qtdeCorretora - QtdeAtivo);

  if (temSaldo < 0) {
    throw new HttpException(
      StatusCodes.FORBIDDEN,
      'Você não tem Saldo suficiente para a transação. Deposite em /contas/deposito.',
    );
  } if (corretoraTemAtivo < 0) {
    throw new HttpException(
      StatusCodes.FORBIDDEN,
      'Não podemos efetuar a transação por conta do número de ativos disponivel.',
    );
  }

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

export {
  InvestimentosTypoMiddleware,
  InvestimentosCompraMiddleware,
};
