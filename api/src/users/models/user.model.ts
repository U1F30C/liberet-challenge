import { Column, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Log } from "../../logs/log.model";
import { Wallet } from "../../wallet/wallet.model";

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

@Table({
  modelName: "user",
})
export class User extends Model<User> implements IUser {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  name: string;
  @Column
  lastName: string;
  @Column({ unique: true })
  email: string;
  @HasOne(() => Wallet)
  wallet: Wallet;
  @HasMany(() => Log)
  logs: Log[];
}
