import bcrypt from 'bcrypt-nodejs';
import { IConta } from '../interfaces';
import { ContasModel, connection } from '../models';
import HttpException from '../shared/HttpException';

export default class ContasService {
  public model: ContasModel;

  constructor() {
    this.model = new ContasModel(connection);
  }

  public async getAll(): Promise<IConta[]> {
    const clients = await this.model.getAll();
    return clients;
  }

  public async getAccById(id: number): Promise<IConta> {
    const cliente = await this.model.getAccById(id);
    return cliente;
  }

  public async createNewAcc(user: IConta): Promise<Omit<IConta, 'Senha'>> {
    const salt = bcrypt.genSaltSync(5);
    user.Senha = bcrypt.hashSync(user.Senha, salt);
    const result: IConta = await this.model.createNewAcc(user) as IConta;
    return result;
  }

  public async updateAcc(id: number, user: IConta): Promise<void> {
    const thereIsUser = await this.model.getAccById(id);
    if (!thereIsUser) throw new HttpException(404, 'Cliente não encontrado.');
    return this.model.updateAcc(id, user);
  }
}
