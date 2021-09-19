import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/users/models/user.model";
import { UsersService } from "src/users/users.service";
import { Wallet } from "src/wallet/wallet.model";
import { WalletService } from "src/wallet/wallet.service";
import { Service } from "./service.model";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service)
    private serviceModel: ModelCtor<Service>,
    @InjectModel(User)
    private userModel: ModelCtor<User>,
    private walletService: WalletService,
    private logsService: LogsService,
    private usersService: UsersService
  ) {}

  getAll() {
    return this.serviceModel.findAll();
  }

  async getServiceOrFail(serviceId: string) {
    const service = await this.serviceModel.findByPk(serviceId, {
      include: { model: Wallet },
    });
    if (!service) {
      throw new NotFoundException("ServiceNotFound");
    }
    return service;
  }

  async consumeService(userId: string, serviceId: string) {
    const service = await this.getServiceOrFail(serviceId);
    const user = await this.usersService.getOrFail(
      userId,
      (options) => (options.include = { model: Wallet })
    );
    if (parseFloat(user.wallet?.credits ?? "0") < parseFloat(service.cost)) {
      throw new BadRequestException("NotEnoughCredits");
    }
    await this.logsService.createLog(
      userId,
      serviceId,
      "Consume",
      service.cost
    );
    await this.walletService.decrease(userId, service.cost);
  }

  async stopService(userId: string, serviceId: string) {

    const service = await this.getServiceOrFail(serviceId);
    const user = await this.usersService.getOrFail(
      userId,
      (options) => (options.include = { model: Wallet })
    );
    // const activeService =  this.activeServicesService.getOrFail(userId, serviceId);
    // await this.logsService.createLog(
    //   userId,
    //   serviceId,
    //   "Stop",
    //   service.cost
    // );
  }

  startService(userId: string, serviceId: string) {
  }
}
