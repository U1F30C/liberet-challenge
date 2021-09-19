import { Controller, Get, Param } from "@nestjs/common";
import { LogsService } from "./logs.service";

@Controller("logs")
export class LogsController {
  constructor(private logsService: LogsService) {}
  @Get(":userId(\\d+)")
  getAll(@Param("userId") userId: string) {
    return this.logsService.getUserLogs(userId);
  }
}
