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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../authorization/guards/jwt-auth.guard");
const request_with_users_1 = require("../authorization/types/request-with-users");
const querist_1 = require("../shared/querying/querist");
const appointment_insertion_dto_1 = require("./dto/appointment-insertion.dto");
const appointment_reschedule_dto_1 = require("./dto/appointment-reschedule.dto");
const payment_model_1 = require("./entities/payment.model");
const appointment_cancellation_service_1 = require("./services/appointment-cancellation.service");
const appointment_creation_service_1 = require("./services/appointment-creation.service");
const appointment_reschedule_service_1 = require("./services/appointment-reschedule.service");
const appointments_service_1 = require("./services/appointments.service");
let AppointmentsController = class AppointmentsController {
    constructor(appointmentsService, appointmentCreationService, appointmentCancellationService, appointmentRescheduleService) {
        this.appointmentsService = appointmentsService;
        this.appointmentCreationService = appointmentCreationService;
        this.appointmentCancellationService = appointmentCancellationService;
        this.appointmentRescheduleService = appointmentRescheduleService;
    }
    async create(appointment, request) {
        const created = await this.appointmentCreationService.createAppointment(request.user.id, appointment);
        return created;
    }
    async validateAppointment(appointment, request) {
        await this.appointmentCreationService.validate(request.user.id, appointment);
    }
    async cancelAppointment(appointmentCode, request) {
        let cancellationResult = await this.appointmentCancellationService.cancelAppointment(appointmentCode, request.user.id);
        return cancellationResult;
    }
    async rescheduleAppointment(code, request, rescheduleModel) {
        let rescheduledAppointment = await this.appointmentRescheduleService.rescheduleAppointment(code, request.user.id, new Date(rescheduleModel.newDate));
        return rescheduledAppointment;
    }
    async findAll(query) {
        return this.appointmentsService.findAll(query, (query) => {
            query.include = [
                {
                    model: payment_model_1.Payment,
                },
            ];
            query.order = [['date', 'DESC']];
        });
    }
    async findWithResult(query) {
        return this.appointmentsService.findWithResult(query);
    }
    async findForFinanceUser(query) {
        return this.appointmentsService.findForFinanceUser(query);
    }
    findOneByCode(code) {
        return this.appointmentsService.findOneByCode(code);
    }
    findOneByCodeExpand(code) {
        return this.appointmentsService.findOneByCodeExpand(code);
    }
};
__decorate([
    common_1.UsePipes(new common_1.ValidationPipe()),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_insertion_dto_1.AppointmentInsertionDTO, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "create", null);
__decorate([
    common_1.Post('validate'),
    common_1.HttpCode(204),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_insertion_dto_1.AppointmentInsertionDTO, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "validateAppointment", null);
__decorate([
    common_1.Post('cancellation/:code'),
    __param(0, common_1.Param('code')),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "cancelAppointment", null);
__decorate([
    common_1.Put('reschedule/:code'),
    __param(0, common_1.Param('code')),
    __param(1, common_1.Req()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, appointment_reschedule_dto_1.AppointmentRescheduleDTO]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "rescheduleAppointment", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    common_1.Get('results'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "findWithResult", null);
__decorate([
    common_1.Get('finances'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "findForFinanceUser", null);
__decorate([
    common_1.Get(':code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findOneByCode", null);
__decorate([
    common_1.Get('expand/:code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findOneByCodeExpand", null);
AppointmentsController = __decorate([
    common_1.Controller('appointments'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService,
        appointment_creation_service_1.AppointmentCreationService,
        appointment_cancellation_service_1.AppointmentCancelationService,
        appointment_reschedule_service_1.AppointmentRescheduleService])
], AppointmentsController);
exports.AppointmentsController = AppointmentsController;
//# sourceMappingURL=appointments.controller.js.map