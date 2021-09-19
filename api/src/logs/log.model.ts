import {
  BelongsTo,
  Column,
  DataType,
  Model,
  NotNull,
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
  @Column
  @NotNull
  userId: string;
  @Column
  @NotNull
  serviceId: string;
  @Column
  @NotNull
  operation: string;
  @Column({ type: DataType.DECIMAL })
  @NotNull
  cost: string;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Service)
  service: Service;
}
