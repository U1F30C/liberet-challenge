"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesConfigurationController = void 0;
const common_1 = require("@nestjs/common");
const workable_time_service_1 = require("./services/workable-time.service");
let SchedulesConfigurationController = class SchedulesConfigurationController {
    constructor(workableTimeService) {
        this.workableTimeService = workableTimeService;
    }
    getWorkableDays() {
        return this.workableTimeService.getYearWorkableDays();
    }
};
__decorate([
    common_1.Get('workable-days'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchedulesConfigurationController.prototype, "getWorkableDays", null);
SchedulesConfigurationController = __decorate([
    common_1.Controller('schedules-configuration'),
    __metadata("design:paramtypes", [workable_time_service_1.WorkableTimeService])
], SchedulesConfigurationController);
exports.SchedulesConfigurationController = SchedulesConfigurationController;
//# sourceMappingURL=schedules-configuration.controller.js.map