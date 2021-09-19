import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { User } from "./models/user.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}
  async getOrFail(userId: string, customize: { (options: FindOptions): void }) {
    const options = {};
    customize(options);
    const user = await this.userModel.findByPk(userId, options);
    if (!user) {
      throw new NotFoundException("UserNotFound");
    }
    return user;
  }
}
