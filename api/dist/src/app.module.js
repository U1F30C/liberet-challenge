"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const sequelize_1 = require("@nestjs/sequelize");
const db_connection_1 = require("../scripts/db-connection");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const services_controller_1 = require("./services/services.controller");
const wallet_controller_1 = require("./wallet/wallet.controller");
const options = db_connection_1.dbConfig;
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            sequelize_1.SequelizeModule.forRoot(Object.assign(Object.assign({}, options), { autoLoadModels: true, synchronize: false })),
            users_module_1.UsersModule,
        ],
        providers: [app_service_1.AppService],
        controllers: [services_controller_1.ServicesController, wallet_controller_1.WalletController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map