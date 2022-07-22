import bcrypt from 'bcrypt-nodejs';
import HttpException from '../shared/HttpException';
import { generateJWTToken } from '../helpers';
import { IConta } from '../interfaces';
import { connection, ContasModel } from '../models';

export default class AuthService {
  public model: ContasModel;

  constructor() {
    this.model = new ContasModel(connection);
  }

  public async authenticate(client: Omit<IConta, 'Senha, Saldo'>): Promise<unknown> {
    if (!client.Email || !client.Senha) {
      throw new HttpException(401, 'Por favor, tente novamente com dados válidos.');
    }

    const allClients: IConta[] = await this.model.getAll();
    const clientData = allClients.filter((element) => element.Email.includes(client.Email));
    const isMatch = bcrypt.compareSync(client.Senha, clientData[0].Senha);

    if (clientData.length === 0 || !isMatch) {
      throw new HttpException(401, 'Usuário não cadastrado.');
    }

    const token = generateJWTToken({
      Nome: clientData[0].Nome,
      Email: clientData[0].Email,
      Senha: clientData[0].Senha,
    });

    return { Cliente: `${clientData[0].Nome} ${clientData[0].Sobrenome}`, token };
  }
}
