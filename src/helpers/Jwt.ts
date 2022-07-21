import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import HttpException from '../shared/HttpException';
import { IClientes } from '../interfaces';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'squadDataScienceXP';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateJWTToken = (user: Omit<IClientes, 'Senha, Saldo'>) =>
  sign({ user }, TOKEN_SECRET, jwtConfig);

const authToken = async (token: string | undefined): Promise<string | JwtPayload> => {
  if (!token) {
    throw new HttpException(401, 'Autorização Inválida, seu safadinho!');
  }

  try {
    const validate = verify(token, TOKEN_SECRET);
    return validate;
  } catch (error) {
    throw new HttpException(401, 'Autorização Inválida, seu safadinho!');
  }
};

export { generateJWTToken, authToken };
