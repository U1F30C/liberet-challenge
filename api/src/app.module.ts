import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { dbConfig } from "../scripts/db-connection";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ServicesController } from './services/services.controller';
import { WalletController } from './wallet/wallet.controller';
import { ServicesService } from './services/services.service';
import { WalletService } from './wallet/wallet.service';
import { LogsService } from './logs/logs.service';
import { ActiveServicesService } from './services/active-services/active-services.service';

const options: SequelizeModuleOptions = dbConfig;

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      ...options,
      autoLoadModels: true,
      synchronize: false,
    }),
    UsersModule,
  ],
  providers: [AppService, ServicesService, WalletService, LogsService, ActiveServicesService],
  controllers: [ServicesController, WalletController],
})
export class AppModule {}
