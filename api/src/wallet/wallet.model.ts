import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
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
  @ForeignKey(() => User)
  userId: string;
  @Column({ type: DataType.DECIMAL, allowNull: false })
  credits: string;

  @BelongsTo(() => User, "userId")
  user: User;
}
