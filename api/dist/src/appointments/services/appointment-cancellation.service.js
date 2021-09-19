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
exports.AppointmentCancelationService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const roles_1 = require("../../constants/roles");
const user_model_1 = require("../../users/models/user.model");
const users_service_1 = require("../../users/users.service");
const error_responses_1 = require("../../utils/error-responses");
const appointment_error_codes_1 = require("../constants/appointment-error-codes");
const appointment_states_1 = require("../constants/appointment-states");
const appointment_model_1 = require("../entities/appointment.model");
const file_model_1 = require("../entities/file.model");
const payment_model_1 = require("../entities/payment.model");
const appointment_availability_service_1 = require("./appointment-availability.service");
const appointment_payment_information_service_1 = require("./appointment-payment-information.service");
let AppointmentCancelationService = class AppointmentCancelationService {
    constructor(appointmentModel, paymentModel, proofOfPaymentModel, userService, appointmentAvailabilityService, appointmentPaymentInformationService) {
        this.appointmentModel = appointmentModel;
        this.paymentModel = paymentModel;
        this.proofOfPaymentModel = proofOfPaymentModel;
        this.userService = userService;
        this.appointmentAvailabilityService = appointmentAvailabilityService;
        this.appointmentPaymentInformationService = appointmentPaymentInformationService;
    }
    async cancelAppointment(appointmentCode, userId, transaction) {
        return this.changeToInvalidStatus(appointmentCode, userId, appointment_states_1.AppointmentStates.Cancelled, transaction);
    }
    async postponeAppointment(appointmentCode, userId, transaction) {
        return await this.changeToInvalidStatus(appointmentCode, userId, appointment_states_1.AppointmentStates.Postponed, transaction);
    }
    async changeToInvalidStatus(appointmentCode, userId, status, transaction) {
        let appointment = await this.getAppointmentWithPayment(appointmentCode);
        if (!appointment) {
            throw new common_1.NotFoundException(error_responses_1.createErrorResponse(appointment_error_codes_1.AppointmentNotFound));
        }
        await this.isUserAbleToPerformOperation(userId, appointment);
        this.validateAllowedOperation(appointment);
        let alreadyPayed = await this.appointmentPaymentInformationService.isAlreadyPayed(appointment);
        let appointmentChangedCode = await this.performTransactionalStateChange(appointment, status, transaction);
        return {
            alreadyPayed: alreadyPayed,
            resultingCode: appointmentChangedCode,
        };
    }
    async setNewCode(appointment, i = 0, transaction, operation) {
        if (i > 10) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.TooMuchReschedules));
        }
        let newCode = appointment.code + '[' + operation + '' + (i == 0 ? '' : i) + ']';
        let alreadyExist = await this.appointmentModel.count({
            where: {
                code: newCode,
            },
            transaction: transaction,
        });
        if (alreadyExist) {
            return await this.setNewCode(appointment, i + 1, transaction, operation);
        }
        await this.updateCodePreservingForeignkeys(appointment, newCode, transaction);
        return newCode;
    }
    async updateCodePreservingForeignkeys(appointment, newCode, transaction) {
        let proofOfPayments = await this.proofOfPaymentModel.findAll({
            where: {
                appointmentCode: appointment.code,
            },
            transaction: transaction,
        });
        let jsonProofOfPayments = proofOfPayments.map((pop) => pop.toJSON());
        let jsonPayment = appointment.payment.toJSON();
        await this.proofOfPaymentModel.destroy({
            where: {
                appointmentCode: appointment.code,
            },
            transaction: transaction,
        });
        await appointment.payment.destroy({
            transaction: transaction,
        });
        jsonPayment.appointmentCode = newCode;
        jsonProofOfPayments.forEach((pop) => (pop.appointmentCode = newCode));
        let updated = await this.appointmentModel.update({
            code: newCode,
        }, {
            where: {
                code: appointment.code,
            },
            transaction: transaction,
        });
        await this.paymentModel.create(jsonPayment, {
            transaction: transaction,
        });
        await this.proofOfPaymentModel.bulkCreate(jsonProofOfPayments, {
            transaction,
        });
    }
    async getAppointmentWithPayment(appointmentCode) {
        const result = await this.appointmentModel.findOne({
            where: {
                code: appointmentCode,
            },
            include: {
                model: payment_model_1.Payment,
            },
        });
        return result;
    }
    async performTransactionalStateChange(appointment, status, transaction) {
        if (!transaction) {
            return await this.appointmentModel.sequelize.transaction(async (t) => {
                return await this.applyChanges(appointment, status, t);
            });
        }
        else {
            return await this.applyChanges(appointment, status, transaction);
        }
    }
    async applyChanges(appointment, status, transaction) {
        const result = await this.appointmentModel.update({
            state: status,
        }, {
            where: {
                code: appointment.code,
            },
            transaction: transaction,
        });
        await this.appointmentAvailabilityService.decrementSlot(appointment.date, transaction);
        let appointmentChangedCode = await this.setNewCode(appointment, 0, transaction, status);
        return appointmentChangedCode;
    }
    validateAllowedOperation(appointment) {
        if (![appointment_states_1.AppointmentStates.NotAttended, appointment_states_1.AppointmentStates.Scheduled].includes(appointment.state)) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.NoCancellableAppointment));
        }
    }
    async isUserAbleToPerformOperation(userId, appointment) {
        let user = null;
        let exc = new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.YourAreNotAllowedToCancell));
        try {
            user = await this.userService.findById(userId);
        }
        catch (exception) {
            if (exception instanceof common_1.NotFoundException) {
                throw exc;
            }
            throw exception;
        }
        if (!([roles_1.Roles.SuperAdmin, roles_1.Roles.Administrative].includes(user.role) ||
            appointment.clientId == userId)) {
            throw exc;
        }
    }
};
AppointmentCancelationService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __param(1, sequelize_1.InjectModel(payment_model_1.Payment)),
    __param(2, sequelize_1.InjectModel(file_model_1.ProofOfPayment)),
    __metadata("design:paramtypes", [Object, Object, Object, users_service_1.UsersService,
        appointment_availability_service_1.AppointmentAvailabilityService,
        appointment_payment_information_service_1.AppointmentPaymentInformationService])
], AppointmentCancelationService);
exports.AppointmentCancelationService = AppointmentCancelationService;
//# sourceMappingURL=appointment-cancellation.service.js.map