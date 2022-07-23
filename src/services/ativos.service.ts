// import bcrypt from 'bcrypt-nodejs';
import { IAtivos } from '../interfaces';
import { AtivosModel, connection } from '../models';
// import HttpException from '../shared/HttpException';

export default class AtivosService {
  public model: AtivosModel;

  constructor() {
    this.model = new AtivosModel(connection);
  }

  public async ativosCorretora(): Promise<IAtivos[]> {
    const clients = await this.model.ativosCorretora();
    return clients;
  }

  // public async getAccById(id: number): Promise<IAtivos> {
  //   const cliente = await this.model.getAccById(id);
  //   return cliente;
  // }

  // public async createNewAcc(user: IConta): Promise<Omit<IConta, 'Senha'>> {
  //   const salt = bcrypt.genSaltSync(5);
  //   user.Senha = bcrypt.hashSync(user.Senha as string, salt);
  //   const result: IConta = await this.model.createNewAcc(user) as IConta;
  //   return result;
  // }

  // public async updateAcc(id: number, user: IConta): Promise<void> {
  //   const thereIsUser = await this.model.getAccById(id);
  //   if (!thereIsUser) throw new HttpException(404, 'Cliente não encontrado.');
  //   const salt = bcrypt.genSaltSync(5);
  //   user.Senha = bcrypt.hashSync(user.Senha as string, salt);
  //   return this.model.updateAcc(id, user);
  // }

  // public async accWithdraw(/* id: number, */ values: ITransacao): Promise<IOperacao> {
  //   const transaction: IOperacao = await this.model.accWithdraw(values);
  //   return transaction;
  // }

  // public async accDeposit(values: ITransacao): Promise<IOperacao> {
  //   const transaction: IOperacao = await this.model.accDeposit(values);
  //   return transaction;
  // }
}
