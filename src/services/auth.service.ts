import bcrypt from 'bcrypt-nodejs';
import HttpException from '../shared/HttpException';
import { generateJWTToken } from '../helpers';
import { IConta } from '../interfaces';
import { connection, ContasModel } from '../models';
import { ILogin } from '../interfaces/ILogin.interface';

export default class AuthService {
  public model: ContasModel;

  constructor() {
    this.model = new ContasModel(connection);
  }

  public async authenticate(client: Omit<IConta, 'Senha, Saldo'>): Promise<ILogin> {
    if (!client.Email || !client.Senha) {
      throw new HttpException(401, 'Por favor, tente novamente com dados válidos.');
    }

    const allClients: IConta[] = await this.model.getAll();
    const clientData = allClients.filter((element) => element.Email === (client.Email));
    const isMatch = bcrypt.compareSync(client.Senha, clientData[0].Senha as string);

    if (clientData.length === 0) throw new HttpException(401, 'Usuário não cadastrado.');
    if (!isMatch) throw new HttpException(401, 'E-mail ou Senha incorretos.');

    const token = generateJWTToken({
      CodCliente: clientData[0].CodCliente,
      Nome: clientData[0].Nome,
      Sobrenome: clientData[0].Sobrenome,
      Email: clientData[0].Email,
    });

    return {
      Cliente: `Bem vindo de volta, ${clientData[0].Nome} ${clientData[0].Sobrenome}!`,
      token,
    };
  }
}
