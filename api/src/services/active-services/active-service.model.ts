import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Service } from "../../services/service.model";
import { User } from "../../users/models/user.model";

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
  @Column({ allowNull: false, primaryKey: true })
  @ForeignKey(() => User)
  userId: string;
  @Column({ allowNull: false, primaryKey: true })
  @ForeignKey(() => Service)
  serviceId: string;
  @Column({ type: DataType.DECIMAL, allowNull: false })
  accumulatedCost: string;

  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Service)
  service: Service;
}
