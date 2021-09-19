import { Column, DataType, Model, NotNull, Table } from "sequelize-typescript";

export enum ServiceType {
  Immediate = "Immediate",
  Enableable = "Enableable",
}

export interface IService {
  id: string;
  name: string;
  cost: string;
  serviceType: ServiceType;
}

@Table({
  modelName: "service",
})
export class Service extends Model<Service> implements IService {
  @Column({ primaryKey: true, autoIncrement: true })
  id: string;
  @Column
  @NotNull
  name: string;
  @Column({ type: DataType.DECIMAL })
  @NotNull
  cost: string;
  @Column
  @NotNull
  serviceType: ServiceType;
}
