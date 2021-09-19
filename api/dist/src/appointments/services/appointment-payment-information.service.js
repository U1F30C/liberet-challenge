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
exports.AppointmentPaymentInformationService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const payment_model_1 = require("../entities/payment.model");
let AppointmentPaymentInformationService = class AppointmentPaymentInformationService {
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    async isAlreadyPayed(appointment, transaction) {
        let payment = appointment.payment;
        if (!payment) {
            payment = await this.paymentModel.findOne({
                where: {
                    appointmentCode: appointment.code,
                },
                transaction: transaction,
            });
        }
        if (!payment) {
            return false;
        }
        if ([payment_model_1.PaymentStatuses.Paidout, payment_model_1.PaymentStatuses.InReview].includes(payment.status)) {
            return true;
        }
        return false;
    }
};
AppointmentPaymentInformationService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(payment_model_1.Payment)),
    __metadata("design:paramtypes", [Object])
], AppointmentPaymentInformationService);
exports.AppointmentPaymentInformationService = AppointmentPaymentInformationService;
//# sourceMappingURL=appointment-payment-information.service.js.map