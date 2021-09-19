"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const shared_module_1 = require("../shared/shared.module");
const client_model_1 = require("./models/client.model");
const clients_service_1 = require("./services/clients.service");
const client_controller_1 = require("./client.controller");
const address_model_1 = require("./models/address.model");
const client_user_registration_service_1 = require("./services/client-user-registration.service");
const users_module_1 = require("../users/users.module");
const public_client_controller_1 = require("./public-client.controller");
const set_password_token_model_1 = require("./models/set-password-token.model");
const set_password_token_service_1 = require("./services/set-password-token.service");
const profile_controller_1 = require("./profile.controller");
const profile_service_1 = require("./services/profile.service");
const minor_model_1 = require("./models/minor.model");
const appointment_model_1 = require("../appointments/entities/appointment.model");
const billing_data_model_1 = require("../appointments/entities/billing-data.model");
const invoiceData_service_1 = require("./services/invoiceData.service");
const invoiceData_controller_1 = require("./invoiceData.controller");
let ClientsModule = class ClientsModule {
};
ClientsModule = __decorate([
    common_1.Module({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                client_model_1.Client,
                address_model_1.Address,
                set_password_token_model_1.SetPasswordToken,
                minor_model_1.Minor,
                appointment_model_1.Appointment,
                billing_data_model_1.BillingData
            ]),
            shared_module_1.SharedModule,
            users_module_1.UsersModule,
        ],
        providers: [
            clients_service_1.ClientService,
            client_user_registration_service_1.ClientUserRegistrationService,
            set_password_token_service_1.PasswordTokenService,
            profile_service_1.ProfileService,
            invoiceData_service_1.InvoiceDataService
        ],
        controllers: [client_controller_1.ClientController, public_client_controller_1.PublicClientController, profile_controller_1.ProfileController, invoiceData_controller_1.InvoiceDataController],
        exports: [sequelize_1.SequelizeModule, clients_service_1.ClientService, invoiceData_service_1.InvoiceDataService],
    })
], ClientsModule);
exports.ClientsModule = ClientsModule;
//# sourceMappingURL=clients.module.js.map