import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";

const dataToUpdate = [
  "name",
  "lastName",
  "mothersLastName",
  "email",
  "role",
  "active",
];

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    userModel: typeof User
  ) {}
}
