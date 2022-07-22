import { IClientes } from '../interfaces';
import { ClientesModel, connection } from '../models';
import HttpException from '../shared/HttpException';

export default class ClientesService {
  public model: ClientesModel;

  constructor() {
    this.model = new ClientesModel(connection);
  }

  public async getAll(): Promise<IClientes[]> {
    const user = await this.model.getAll();
    return user;
  }

  public async getById(id: number): Promise<IClientes> {
    const user = await this.model.getById(id);
    return user;
  }

  public async create(user: IClientes): Promise<IClientes> {
    const result: IClientes = await this.model.create(user);
    return result;
  }

  public async update(id: number, user: IClientes): Promise<void> {
    const thereIsUser = await this.model.getById(id);
    if (!thereIsUser) throw new HttpException(404, 'Cliente não encontrado.');
    return this.model.update(id, user);
  }

  public async remove(id: number): Promise<void> {
    const thereIsAProduct = await this.model.getById(id);
    if (!thereIsAProduct) throw new HttpException(404, 'Cliente não encontrado.');
    this.model.remove(id);
  }
}
