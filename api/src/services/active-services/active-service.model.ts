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
  @Column({ allowNull: false })
  @ForeignKey(() => User)
  userId: string;
  @Column({ allowNull: false })
  @ForeignKey(() => Service)
  serviceId: string;
  @Column({ type: DataType.DECIMAL, allowNull: false })
  accumulatedCost: string;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Service)
  service: Service;
}