import ErrorMiddleware from './error.middleware';
import ValidationMiddleware from './validate.token.middleware';
import {
  LoginNotFoundMiddleware,
  LoginTypoMiddleware,
  antiMiddleManById,
  antiMiddleManByBody,
} from './login.middlewares';
import {
  ContasTypoMiddleware,
  ContasAlreadyExistMiddleware,
  ContasFinanceiroTypoMiddleware,
  ContasFinanceiroMiddleware,
} from './conta.middlewares';

import {
  InvestimentosTypoMiddleware,
  InvestimentosCompraMiddleware,
} from './investimentos.middlewares';

export {
  ErrorMiddleware,
  ValidationMiddleware,
  LoginNotFoundMiddleware,
  LoginTypoMiddleware,
  antiMiddleManById,
  antiMiddleManByBody,
  ContasTypoMiddleware,
  ContasAlreadyExistMiddleware,
  ContasFinanceiroTypoMiddleware,
  ContasFinanceiroMiddleware,
  InvestimentosTypoMiddleware,
  InvestimentosCompraMiddleware,
};
