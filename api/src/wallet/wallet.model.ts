import {
  BelongsTo,
  Column,
  DataType,
  Model,
  NotNull,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/models/user.model";

export interface IWallet {
  userId: string;
  credits: string;
}

@Table({
  modelName: "wallet",
})
export class Wallet extends Model<IWallet> implements IWallet {
  @Column({ primaryKey: true, autoIncrement: true })
  @NotNull
  userId: string;
  @Column({ type: DataType.DECIMAL })
  @NotNull
  credits: string;
  @BelongsTo(() => User)
  user: User;
}
