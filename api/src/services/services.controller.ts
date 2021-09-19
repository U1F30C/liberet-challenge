import { Controller, Get, Param, Post } from "@nestjs/common";
import { ServicesService } from "./services.service";

@Controller("services")
export class ServicesController {
  constructor(private servicesService: ServicesService) {}
  @Get()
  getAll() {
    return this.servicesService.getAll();
  }
  @Get("active/:userId(\\d+)")
  getAllWithStatusForUser(@Param("userId") userId: string) {
    return this.servicesService.getAllWithStatusForUser(userId);
  }

  @Post(":serviceId(\\d+)/consume/:userId(\\d+)")
  useService(
    @Param("serviceId") serviceId: string,
    @Param("userId") userId: string
  ) {
    return this.servicesService.consumeService(userId, serviceId);
  }

  @Post(":serviceId(\\d+)/start/:userId(\\d+)")
  startService(
    @Param("serviceId") serviceId: string,
    @Param("userId") userId: string
  ) {
    return this.servicesService.startService(userId, serviceId);
  }

  @Post(":serviceId(\\d+)/stop/:userId(\\d+)")
  stopService(
    @Param("serviceId") serviceId: string,
    @Param("userId") userId: string
  ) {
    return this.servicesService.stopService(userId, serviceId);
  }
}
