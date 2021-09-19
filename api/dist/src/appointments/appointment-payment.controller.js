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
exports.AppointmentPaymentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../authorization/guards/jwt-auth.guard");
const request_with_users_1 = require("../authorization/types/request-with-users");
const bootstrap_config_service_1 = require("../utils/bootstrap-config-service");
const appointment_proof_of_payment_service_1 = require("./services/appointment-proof-of-payment.service");
let AppointmentPaymentController = class AppointmentPaymentController {
    constructor(appointmentPaymentService) {
        this.appointmentPaymentService = appointmentPaymentService;
    }
    async uploadProofOfPayments(file, appointmentCode) {
        await this.appointmentPaymentService.makePayment(appointmentCode, file);
    }
};
__decorate([
    common_1.Post('/:appointmentCode'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        dest: 'uploads',
        limits: {
            fileSize: +bootstrap_config_service_1.appConfig.get('FILE_MAX_FILE_SIZE_BYTES', '20971520'),
        },
        fileFilter: (req, file, cb) => {
            let allowedMimeTypes = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/jpe',
                'application/pdf',
            ];
            cb(null, allowedMimeTypes.includes(file.mimetype));
        },
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Param('appointmentCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentPaymentController.prototype, "uploadProofOfPayments", null);
AppointmentPaymentController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('appointment-payment'),
    __metadata("design:paramtypes", [appointment_proof_of_payment_service_1.AppointmentProofOfPaymentService])
], AppointmentPaymentController);
exports.AppointmentPaymentController = AppointmentPaymentController;
//# sourceMappingURL=appointment-payment.controller.js.map