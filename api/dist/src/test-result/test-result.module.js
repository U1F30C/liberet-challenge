"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultModule = void 0;
const common_1 = require("@nestjs/common");
const test_result_service_1 = require("./test-result.service");
const test_result_controller_1 = require("./test-result.controller");
const shared_module_1 = require("../shared/shared.module");
const sequelize_1 = require("@nestjs/sequelize");
const test_result_model_1 = require("./entities/test-result.model");
const appointment_model_1 = require("../appointments/entities/appointment.model");
const appointments_module_1 = require("../appointments/appointments.module");
let TestResultModule = class TestResultModule {
};
TestResultModule = __decorate([
    common_1.Module({
        imports: [
            shared_module_1.SharedModule,
            sequelize_1.SequelizeModule.forFeature([test_result_model_1.TestResult, appointment_model_1.Appointment]),
            appointments_module_1.AppointmentsModule,
        ],
        controllers: [test_result_controller_1.TestResultController],
        providers: [test_result_service_1.TestResultService],
    })
], TestResultModule);
exports.TestResultModule = TestResultModule;
//# sourceMappingURL=test-result.module.js.map