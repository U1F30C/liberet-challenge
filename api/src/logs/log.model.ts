import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Service } from "src/services/service.model";
import { User } from "src/users/models/user.model";

export interface ILog {
  userId: string;
  serviceId: string;
  operation: string;
  cost: string;
}

@Table({
  modelName: "log",
})
export class Log extends Model<ILog> implements ILog {
  @Column({ allowNull: false })
  @ForeignKey(() => User)
  userId: string;
  @Column({ allowNull: false })
  @ForeignKey(() => Service)
  serviceId: string;
  @Column({ allowNull: false })
  operation: string;
  @Column({ type: DataType.DECIMAL, allowNull: false })
  cost: string;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Service)
  service: Service;
}
