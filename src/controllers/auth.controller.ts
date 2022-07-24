import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../services';

export default class ContasController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  public authenticate = async (req: Request, res: Response): Promise<Response> => {
    const { Cliente, token } = await this.service.authenticate(req.body);
    req.headers.authorization = token;
    return res.status(StatusCodes.CREATED).json({ Cliente, auth: true, token });
  };
}
