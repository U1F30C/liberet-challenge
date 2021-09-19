import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { LogsService } from "src/logs/logs.service";
import { User } from "src/users/models/user.model";
import { UsersService } from "src/users/users.service";
import { Wallet } from "src/wallet/wallet.model";
import { WalletService } from "src/wallet/wallet.service";
import { ActiveService } from "./active-services/active-service.model";
import { ActiveServicesService } from "./active-services/active-services.service";
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
    private usersService: UsersService,
    private activeServicesService: ActiveServicesService
  ) {}

  @Cron("0 * * * * *")
  async runServices() {
    console.log("Running active services")
    const activeServices = await this.activeServicesService.findAllRunning();
    for (const activeService of activeServices) {
      // do something whith activeService
      await activeService.increment({
        accumulatedCost: activeService.service.cost,
      });
      await this.walletService.decrease(
        activeService.userId,
        activeService.service.cost
      );
    }
  }

  getAllWithStatusForUser(userId: string) {
    return this.serviceModel.findAll({
      include: { model: ActiveService, required: false, where: { userId } },
    });
  }

  getAll() {
    return this.serviceModel.findAll();
  }

  async getServiceOrFail(serviceId: string) {
    const service = await this.serviceModel.findByPk(serviceId);
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
    const activeService = await this.activeServicesService.getOrFail(
      userId,
      serviceId
    );
    await this.activeServicesService.stop(userId, serviceId);
    await this.logsService.createLog(
      userId,
      serviceId,
      "Stop",
      activeService.accumulatedCost
    );
  }

  async startService(userId: string, serviceId: string) {
    const service = await this.getServiceOrFail(serviceId);
    const user = await this.usersService.getOrFail(
      userId,
      (options) => (options.include = { model: Wallet })
    );
    await this.activeServicesService.start(userId, serviceId);
    await this.logsService.createLog(userId, serviceId, "Start");
  }
}
