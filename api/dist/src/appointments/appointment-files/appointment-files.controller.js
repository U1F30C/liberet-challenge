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
exports.AppointmentFilesController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("../services/appointments.service");
let AppointmentFilesController = class AppointmentFilesController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    async getPaymentDocument(appointmentCode, res) {
        const fileStream = await this.appointmentService
            .getAppointmentInfoFileData(appointmentCode)
            .then(({ patient, appointment }) => this.appointmentService.renderAppointmentInformationFile({
            user: {
                email: appointment.client.user.email,
                fullName: appointment.client.user.fullName,
            },
            patientFullName: patient.fullName,
            procedence: appointment.client.originCountry.name,
            appointment,
        }));
        fileStream.pipe(res);
    }
};
__decorate([
    common_1.Get('info-file/:appointmentCode'),
    __param(0, common_1.Param('appointmentCode')),
    __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppointmentFilesController.prototype, "getPaymentDocument", null);
AppointmentFilesController = __decorate([
    common_1.Controller('appointment-files'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentFilesController);
exports.AppointmentFilesController = AppointmentFilesController;
//# sourceMappingURL=appointment-files.controller.js.map