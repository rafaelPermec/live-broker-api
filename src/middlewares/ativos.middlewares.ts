// import { NextFunction, Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import Joi from 'joi';
// import { ContasService } from '../services';
// import HttpException from '../shared/HttpException';

// const AtivosSchema = Joi.object({
//   Email: Joi.string().email().required().messages({
//     'any.required': 'Você precisa informar seu email para realizar o Login.',
//     'string.email': 'Por favor, digite um e-mail válido para continuar.',
//     'string.empty': 'Por favor, digite seu e-mail.',
//   }),
//   Senha: Joi.string().min(8).required().messages({
//     'any.required': 'Você precisa informar sua senha para realizar o Login.',
//     'string.empty': 'Por favor, digite sua senha.',
//     'string.min': 'Sua senha é composta por mais de 8 caracteres.',
//   }),
// });

// const AtivosTypoMiddleware = (req: Request, _res: Response, next: NextFunction) => {
//   const { error } = AtivosSchema.validate(req.body);
//   // console.log(error?.details[0].type);
//   if (error) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, `${error.message}`);

//   next();
// };

// const AtivosNotFoundMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
//   const { Email } = req.body;
//   const contasService = new ContasService();
//   const getUsers = await contasService.getAll();
//   const thereIsUserEmail = getUsers.filter((item) => item.Email.includes(Email));

//   if (!thereIsUserEmail || thereIsUserEmail.length <= 0) {
//     throw new HttpException(
//       StatusCodes.NOT_FOUND,
//       'E-mail não encontrado. Para se cadastrar, você precisa ir até /contas/cadastro',
//     );
//   }

//   next();
// };

// export {
//   AtivosTypoMiddleware,
//   AtivosNotFoundMiddleware,
// };
