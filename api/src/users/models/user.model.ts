import { Column, Model, Table } from "sequelize-typescript";

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
}
