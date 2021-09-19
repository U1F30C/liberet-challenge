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

export interface IActiveService {
  userId: string;
  serviceId: string;
  accumulatedCost: string;
}

@Table({
  modelName: "activeService",
})
export class ActiveService
  extends Model<IActiveService>
  implements IActiveService {
  @Column
  @NotNull
  userId: string;
  @Column
  @NotNull
  serviceId: string;
  @Column({ type: DataType.DECIMAL })
  @NotNull
  accumulatedCost: string;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Service)
  service: Service;
}
