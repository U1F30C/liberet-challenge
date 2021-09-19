import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { ActiveService } from "./active-service.model";

@Injectable()
export class ActiveServicesService {
  constructor(
    @InjectModel(ActiveService)
    private activeServiceModel: ModelCtor<ActiveService>
  ) {}
  async getOrFail(userId: string, serviceId: string) {
    const activeService = await this.activeServiceModel.findOne({
      where: { userId, serviceId },
    });
    if (!activeService) {
      throw new NotFoundException("ServiceNotCurrentlyActive");
    }
    return activeService;
  }

  async start(userId: string, serviceId: string) {
    const activeService = await this.activeServiceModel.findOne({
      where: { userId, serviceId },
    });
    if (activeService) {
      throw new BadRequestException("ServiceAlreadyActive");
    }
    return this.activeServiceModel.create({
      userId,
      serviceId,
      accumulatedCost: "0",
    });
  }

  async stop(userId: string, serviceId: string) {
    const activeService = await this.getOrFail(userId, serviceId);
    return activeService.destroy();
  }
}
