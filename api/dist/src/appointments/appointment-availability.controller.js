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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentAvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const workable_time_service_1 = require("../configuration/services/workable-time.service");
const error_responses_1 = require("../utils/error-responses");
const appointment_error_codes_1 = require("./constants/appointment-error-codes");
const appointment_availability_service_1 = require("./services/appointment-availability.service");
let AppointmentAvailabilityController = class AppointmentAvailabilityController {
    constructor(workableTimeService, appointmentAvailabilityService) {
        this.workableTimeService = workableTimeService;
        this.appointmentAvailabilityService = appointmentAvailabilityService;
    }
    async getAvailability(currentTimeQueryString) {
        const currentTime = new Date(currentTimeQueryString);
        if (!this.workableTimeService.isWorkableDay(currentTime)) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.NotWorkableDay));
        }
        const workableTimeRange = await this.workableTimeService.getWorkableTimeRange(currentTime);
        let result = await this.appointmentAvailabilityService.getAvailability(currentTime);
        return result;
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('currentTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentAvailabilityController.prototype, "getAvailability", null);
AppointmentAvailabilityController = __decorate([
    common_1.Controller('appointment-availability'),
    __metadata("design:paramtypes", [workable_time_service_1.WorkableTimeService,
        appointment_availability_service_1.AppointmentAvailabilityService])
], AppointmentAvailabilityController);
exports.AppointmentAvailabilityController = AppointmentAvailabilityController;
//# sourceMappingURL=appointment-availability.controller.js.map