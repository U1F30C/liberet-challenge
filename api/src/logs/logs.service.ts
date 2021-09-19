import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { Log } from "./log.model";

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log)
    private logModel: ModelCtor<Log>
  ) {}

  createLog(
    userId: string,
    serviceId: string,
    type: "Consume" | "Start" | "Stop",
    cost?: string
  ) {
    return this.logModel.create({
      userId,
      serviceId,
      cost: cost ?? "0",
      operation: type,
    });
  }

  getUserLogs(userId: string) {
    return this.logModel.findAll({ where: { userId } });
  }
}
