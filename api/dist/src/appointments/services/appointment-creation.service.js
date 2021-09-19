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
exports.AppointmentCreationService = void 0;
const common_1 = require("@nestjs/common");
const appointment_availability_service_1 = require("./appointment-availability.service");
const sequelize_1 = require("@nestjs/sequelize");
const appointment_model_1 = require("../entities/appointment.model");
const appointment_creation_validation_service_1 = require("./appointment-creation-validation.service");
const date_fns_1 = require("date-fns");
const test_types_service_1 = require("./test-types.service");
const appointment_states_1 = require("../constants/appointment-states");
const appointment_payment_information_service_1 = require("./appointment-payment-information.service");
const payment_model_1 = require("../entities/payment.model");
const payment_methods_1 = require("../constants/payment-methods");
let AppointmentCreationService = class AppointmentCreationService {
    constructor(appointmentModel, testTypeService, appointmentPaymentInformationService, appointmentCreationValidationService, appointmentAvailabilityService) {
        this.appointmentModel = appointmentModel;
        this.testTypeService = testTypeService;
        this.appointmentPaymentInformationService = appointmentPaymentInformationService;
        this.appointmentCreationValidationService = appointmentCreationValidationService;
        this.appointmentAvailabilityService = appointmentAvailabilityService;
    }
    async createAppointment(userId, appointment, previousAppointment, transaction) {
        await this.validate(userId, appointment, previousAppointment, transaction);
        const testType = await this.getTestType(appointment.testTypeId);
        const code = this.generateCode(userId, appointment, testType);
        let toCreateAppointment = {
            clientId: userId,
            code: code,
            batch: testType.codePrefix,
            date: appointment.date,
            testTypeId: appointment.testTypeId,
            isForTraveling: appointment.isForTraveling,
            state: appointment_states_1.AppointmentStates.Scheduled,
            minorId: appointment.minorClientId,
            previousAppointment: previousAppointment,
            payment: {
                amount: testType.price,
                appointmentCode: code,
                code: '',
                invoiceDelivered: false,
                invoiceRequired: appointment.invoiceRequired,
                status: payment_model_1.PaymentStatuses.Pending,
                type: payment_methods_1.getPaymentMethodById(appointment.paymentMethod).code,
            },
            dateOnly: this.getDayOnly(appointment.date),
        };
        const created = await this.excecuteCreationTransaction(toCreateAppointment, transaction);
        return created;
    }
    getDayOnly(date) {
        const year = date.getFullYear().toString().padStart(4, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    generateCode(userId, appointment, testType) {
        let clientType = 'G';
        let patientId = userId;
        if (appointment.minorClientId) {
            clientType = 'M';
            patientId = appointment.minorClientId;
        }
        let appointmentDate = date_fns_1.format(appointment.date, 'yy.MM.dd');
        let result = `${patientId
            .toString()
            .padStart(4, '0')}-${clientType}-${appointmentDate}-${testType.codePrefix}`;
        return result;
    }
    async excecuteCreationTransaction(appointment, transaction) {
        if (!transaction) {
            return this.appointmentModel.sequelize.transaction(async (t) => {
                return await this.applyChanges(appointment, t);
            });
        }
        else {
            return await this.applyChanges(appointment, transaction);
        }
    }
    async applyChanges(appointment, transaction) {
        const created = await this.appointmentModel.create(appointment, {
            transaction: transaction,
            include: {
                model: payment_model_1.Payment,
            },
        });
        await this.appointmentAvailabilityService.incrementSlot(appointment.date, transaction);
        return created;
    }
    async getTestType(testTypeId) {
        return await this.testTypeService.findById(testTypeId);
    }
    async validate(userId, appointment, previousAppointmentCode, transaction) {
        let previousAppointmentAlreadyPayed = false;
        if (previousAppointmentCode) {
            let previousAppointment = await this.appointmentModel.findOne({
                where: {
                    code: previousAppointmentCode,
                },
                transaction: transaction,
            });
            previousAppointmentAlreadyPayed = await this.appointmentPaymentInformationService.isAlreadyPayed(previousAppointment, transaction);
        }
        await this.appointmentCreationValidationService.validateWorkableDateTime(appointment);
        await this.appointmentCreationValidationService.validateAvailability(appointment);
        if (!previousAppointmentAlreadyPayed) {
            await this.appointmentCreationValidationService.validateBankDepositCutOffTime(appointment);
            await this.appointmentCreationValidationService.validateBankDepositDay(appointment);
        }
        await this.appointmentCreationValidationService.validateTimeMargin(appointment);
        await this.appointmentCreationValidationService.validateOneAppointmentPerDay(userId, appointment, previousAppointmentCode, transaction);
        await this.appointmentCreationValidationService.validateForTraveling(userId, appointment);
        await this.appointmentCreationValidationService.validateMinor(userId, appointment);
        await this.appointmentCreationValidationService.vaidateInvoiceData(userId, appointment);
    }
};
AppointmentCreationService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __metadata("design:paramtypes", [Object, test_types_service_1.TestTypesService,
        appointment_payment_information_service_1.AppointmentPaymentInformationService,
        appointment_creation_validation_service_1.AppointmentCreationValidationService,
        appointment_availability_service_1.AppointmentAvailabilityService])
], AppointmentCreationService);
exports.AppointmentCreationService = AppointmentCreationService;
//# sourceMappingURL=appointment-creation.service.js.map