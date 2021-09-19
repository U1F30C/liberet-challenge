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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentProofOfPaymentImageController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const express_1 = require("express");
const request_with_users_1 = require("../authorization/types/request-with-users");
const application_emails_1 = require("../shared/email/application-emails");
const users_service_1 = require("../users/users.service");
const bootstrap_config_service_1 = require("../utils/bootstrap-config-service");
const appointment_proof_of_payment_service_1 = require("./services/appointment-proof-of-payment.service");
let AppointmentProofOfPaymentImageController = class AppointmentProofOfPaymentImageController {
    constructor(appointmentPaymentService, jwtService) {
        this.appointmentPaymentService = appointmentPaymentService;
        this.jwtService = jwtService;
    }
    async downloadProofOfPayment(request, response, appointmentCode) {
        const jwt = request.cookies['session'];
        if (jwt &&
            this.jwtService.verify(jwt, {
                secret: bootstrap_config_service_1.appConfig.get('JWT_KEY'),
            })) {
            const decoded = this.jwtService.decode(jwt);
            console.log(decoded);
            let readStream = await this.appointmentPaymentService.getPaymentImage(appointmentCode, decoded['id']);
            return readStream.pipe(response);
        }
        throw new common_1.UnauthorizedException();
    }
};
__decorate([
    common_1.Get('image/:appointmentCode'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('appointmentCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentProofOfPaymentImageController.prototype, "downloadProofOfPayment", null);
AppointmentProofOfPaymentImageController = __decorate([
    common_1.Controller('proof-of-payment'),
    __metadata("design:paramtypes", [appointment_proof_of_payment_service_1.AppointmentProofOfPaymentService, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AppointmentProofOfPaymentImageController);
exports.AppointmentProofOfPaymentImageController = AppointmentProofOfPaymentImageController;
//# sourceMappingURL=appointment-proof-of-payment-image.controller.js.map