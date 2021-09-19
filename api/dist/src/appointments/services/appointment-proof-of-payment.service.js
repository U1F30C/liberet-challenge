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
exports.AppointmentProofOfPaymentService = exports.AppointmentNotFound = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const error_responses_1 = require("../../utils/error-responses");
const appointment_payment_error_codes_1 = require("../constants/appointment-payment-error-codes");
const payment_methods_1 = require("../constants/payment-methods");
const proof_of_payment_statuses_1 = require("../constants/proof-of-payment-statuses");
const file_model_1 = require("../entities/file.model");
const payment_model_1 = require("../entities/payment.model");
const fs_1 = require("fs");
const path_1 = require("path");
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
const appointment_model_1 = require("../entities/appointment.model");
const user_model_1 = require("../../users/models/user.model");
const roles_1 = require("../../constants/roles");
exports.AppointmentNotFound = 'AppointmentNotFound';
let AppointmentProofOfPaymentService = class AppointmentProofOfPaymentService {
    constructor(prooOfPaymentModel, appointmentModel, paymentModel, userModel) {
        this.prooOfPaymentModel = prooOfPaymentModel;
        this.appointmentModel = appointmentModel;
        this.paymentModel = paymentModel;
        this.userModel = userModel;
    }
    async makePayment(appointmentCode, file) {
        let payment = await this.paymentModel.findOne({
            where: {
                appointmentCode: appointmentCode,
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException(error_responses_1.createErrorResponse(exports.AppointmentNotFound));
        }
        await this.validate(payment);
        await this.createProofOfPayment(payment, file);
    }
    async createProofOfPayment(payment, file) {
        await this.prooOfPaymentModel.sequelize.transaction(async (transaction) => {
            await this.prooOfPaymentModel.create({
                originalName: file.originalname,
                mimeType: file.mimetype,
                fileName: file.filename,
                path: file.path,
                size: file.size,
                proofOfPaymentStatus: proof_of_payment_statuses_1.ProofOfPaymentStatuses.InReview,
                appointmentCode: payment.appointmentCode,
            }, {
                transaction: transaction,
            });
            await this.paymentModel.update({ status: payment_model_1.PaymentStatuses.InReview }, {
                where: {
                    appointmentCode: payment.appointmentCode,
                },
                transaction: transaction,
            });
        });
    }
    async validate(payment) {
        if (payment.status == payment_model_1.PaymentStatuses.Paidout) {
            return new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_payment_error_codes_1.AlreadyPaidout));
        }
        if (payment.type != payment_methods_1.PaymentMethods.BankDeposit) {
            return new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_payment_error_codes_1.WrongPaymentMethod));
        }
        const proofOfPayment = await this.prooOfPaymentModel.count({
            where: {
                proofOfPaymentStatus: proof_of_payment_statuses_1.ProofOfPaymentStatuses.InReview,
                appointmentCode: payment.appointmentCode,
            },
        });
        if (proofOfPayment) {
            return new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_payment_error_codes_1.AlreadyPaidout));
        }
    }
    async getPaymentImage(appointmentCode, userId) {
        if (await this.isAbleToViewProofOfPayment(userId, appointmentCode)) {
            const proofOfPayment = await this.prooOfPaymentModel.findOne({
                where: {
                    appointmentCode: appointmentCode,
                    proofOfPaymentStatus: proof_of_payment_statuses_1.ProofOfPaymentStatuses.InReview,
                },
                order: [['createdAt', 'DESC']],
            });
            const baseDownloadPath = bootstrap_config_service_1.appConfig.get('FILE_DOWNLOAD_FOLDER');
            const proofOfPaymentPath = path_1.resolve(baseDownloadPath, proofOfPayment.path);
            const readStream = fs_1.createReadStream(proofOfPaymentPath);
            return readStream;
        }
        throw new common_1.UnauthorizedException();
    }
    async isAbleToViewProofOfPayment(userId, appointmentCode) {
        const appointment = await this.appointmentModel.findOne({
            where: {
                code: appointmentCode,
            },
        });
        const user = await this.userModel.findOne({
            where: {
                id: userId,
            },
        });
        if (appointment.clientId == userId ||
            [roles_1.Roles.Finances, roles_1.Roles.SuperAdmin].includes(user.role)) {
            return true;
        }
        return false;
    }
    async rejectProofOfPayment(appointmentCode) {
        await this.paymentModel.update({
            status: payment_model_1.PaymentStatuses.Pending,
        }, {
            where: {
                appointmentCode: appointmentCode,
            },
        });
    }
    async acceptProofOfPayment(appointmentCode) {
        await this.paymentModel.update({
            status: payment_model_1.PaymentStatuses.Paidout,
        }, {
            where: {
                appointmentCode: appointmentCode,
            },
        });
    }
};
AppointmentProofOfPaymentService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(file_model_1.ProofOfPayment)),
    __param(1, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __param(2, sequelize_1.InjectModel(payment_model_1.Payment)),
    __param(3, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], AppointmentProofOfPaymentService);
exports.AppointmentProofOfPaymentService = AppointmentProofOfPaymentService;
//# sourceMappingURL=appointment-proof-of-payment.service.js.map