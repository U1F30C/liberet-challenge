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
exports.AppointmentProofOfPaymentValidationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../authorization/guards/jwt-auth.guard");
const request_with_users_1 = require("../authorization/types/request-with-users");
const application_emails_1 = require("../shared/email/application-emails");
const users_service_1 = require("../users/users.service");
const appointment_proof_of_payment_service_1 = require("./services/appointment-proof-of-payment.service");
const appointments_service_1 = require("./services/appointments.service");
let AppointmentProofOfPaymentValidationController = class AppointmentProofOfPaymentValidationController {
    constructor(applicationEmail, appointmentService, userService, appointmentProofOfPaymentService) {
        this.applicationEmail = applicationEmail;
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.appointmentProofOfPaymentService = appointmentProofOfPaymentService;
    }
    async validateProofOfPayment(request, appointmentCode) {
        let appointment = await this.appointmentService.findOneByCode(appointmentCode);
        let user = await this.userService.findById(appointment.clientId);
        await this.appointmentProofOfPaymentService.acceptProofOfPayment(appointmentCode);
        this.applicationEmail.sendToNotifyPaymentReview({
            clientFullName: user.fullName,
            email: user.email,
            status: 'accepted',
        });
    }
    async noValidateProofOfPayment(request, appointmentCode) {
        let appointment = await this.appointmentService.findOneByCode(appointmentCode);
        let user = await this.userService.findById(appointment.clientId);
        await this.appointmentProofOfPaymentService.rejectProofOfPayment(appointmentCode);
        this.applicationEmail.sendToNotifyPaymentReview({
            clientFullName: user.fullName,
            email: user.email,
            status: 'rejected',
        });
    }
};
__decorate([
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.Post('validate/:appointmentCode'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('appointmentCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentProofOfPaymentValidationController.prototype, "validateProofOfPayment", null);
__decorate([
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.Post('mark-as-wrong/:appointmentCode'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('appointmentCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentProofOfPaymentValidationController.prototype, "noValidateProofOfPayment", null);
AppointmentProofOfPaymentValidationController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('proof-of-payment-validation'),
    __metadata("design:paramtypes", [application_emails_1.ApplicationEmails,
        appointments_service_1.AppointmentsService,
        users_service_1.UsersService,
        appointment_proof_of_payment_service_1.AppointmentProofOfPaymentService])
], AppointmentProofOfPaymentValidationController);
exports.AppointmentProofOfPaymentValidationController = AppointmentProofOfPaymentValidationController;
//# sourceMappingURL=appointment-proof-of-payment-validation.controller.js.map