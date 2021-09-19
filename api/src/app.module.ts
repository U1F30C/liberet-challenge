import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { dbConfig } from "../scripts/db-connection";
import { AppService } from "./app.service";
import { Log } from "./logs/log.model";
import { LogsService } from "./logs/logs.service";
import { ActiveService } from "./services/active-services/active-service.model";
import { ActiveServicesService } from "./services/active-services/active-services.service";
import { Service } from "./services/service.model";
import { ServicesController } from "./services/services.controller";
import { ServicesService } from "./services/services.service";
import { UsersModule } from "./users/users.module";
import { WalletController } from "./wallet/wallet.controller";
import { Wallet } from "./wallet/wallet.model";
import { WalletService } from "./wallet/wallet.service";

const options: SequelizeModuleOptions = dbConfig;

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      ...options,
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forFeature([Service, ActiveService, Log, Wallet]),
    UsersModule,
  ],
  providers: [
    AppService,
    ServicesService,
    WalletService,
    LogsService,
    ActiveServicesService,
  ],
  controllers: [ServicesController, WalletController],
})
export class AppModule {}
