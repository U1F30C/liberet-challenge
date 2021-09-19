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
exports.AppointmentCreationValidationService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const workable_time_service_1 = require("../../configuration/services/workable-time.service");
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
const error_responses_1 = require("../../utils/error-responses");
const payment_methods_1 = require("../constants/payment-methods");
const appointment_availability_service_1 = require("./appointment-availability.service");
const date_fns_1 = require("date-fns");
const appointment_error_codes_1 = require("../constants/appointment-error-codes");
const sequelize_2 = require("@nestjs/sequelize");
const appointment_model_1 = require("../entities/appointment.model");
const time_utils_service_1 = require("../../shared/time/time-utils.service");
const client_model_1 = require("../../clients/models/client.model");
const minor_model_1 = require("../../clients/models/minor.model");
const appointment_states_1 = require("../constants/appointment-states");
let AppointmentCreationValidationService = class AppointmentCreationValidationService {
    constructor(appointmentModel, clientModel, minorModel, timeUtils, workableTimeService, appointmentAvailabilityService) {
        this.appointmentModel = appointmentModel;
        this.clientModel = clientModel;
        this.minorModel = minorModel;
        this.timeUtils = timeUtils;
        this.workableTimeService = workableTimeService;
        this.appointmentAvailabilityService = appointmentAvailabilityService;
    }
    async validateMinor(userId, appointment) {
        if (appointment.minorClientId) {
            const minor = await this.minorModel.findOne({
                where: {
                    clientId: userId,
                    id: appointment.minorClientId,
                },
            });
            if (!minor) {
                throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.MinorDoesNotExist));
            }
            if (Math.abs(date_fns_1.differenceInYears(this.timeUtils.getNow(), minor.birthDate)) >=
                18) {
                throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.MinorNoLongerUnderaged));
            }
        }
    }
    async vaidateInvoiceData(userId, appointment) { }
    async validateForTraveling(userId, appointment) {
        if (appointment.isForTraveling) {
            let clientPassport = await this.clientModel.findOne({
                where: {
                    userId: userId,
                },
                attributes: ['passport'],
            });
            if (!clientPassport.passport) {
                throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.TravelAppointmentsNeedsPasport));
            }
        }
    }
    async validateWorkableDateTime(appointment) {
        let isValidTime = await this.workableTimeService.isWorkableTime(appointment.date);
        if (!isValidTime) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.WrongTimeOfDay));
        }
        let isValidDay = await this.workableTimeService.isWorkableDay(appointment.date);
        if (!isValidDay) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.NotWorkableDay));
        }
    }
    async validateAvailability(appointment) {
        let isAvailable = await this.appointmentAvailabilityService.isSlotAvailable(appointment.date);
        if (!isAvailable) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.NoAvailablePlaces));
        }
    }
    async validateBankDepositCutOffTime(appointment) {
        const selectedPaymentMethod = payment_methods_1.getPaymentMethodById(appointment.paymentMethod);
        if (selectedPaymentMethod.code == payment_methods_1.PaymentMethods.BankDeposit) {
            if (date_fns_1.differenceInHours(date_fns_1.startOfDay(this.timeUtils.getNow()), date_fns_1.startOfDay(appointment.date)) == -24) {
                let cutHour = bootstrap_config_service_1.appConfig.get('BANK_PAYMENT_CUT_HOUR', '16:00');
                let cutDateTime = date_fns_1.parse(cutHour, 'HH:mm', appointment.date);
                if (date_fns_1.isAfter(appointment.date, cutDateTime)) {
                    throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.CutOffTimeExceeded));
                }
            }
        }
    }
    async validateBankDepositDay(appointment) {
        const selectedPaymentMethod = payment_methods_1.getPaymentMethodById(appointment.paymentMethod);
        if (selectedPaymentMethod.code == payment_methods_1.PaymentMethods.BankDeposit) {
            if (Math.abs(date_fns_1.differenceInHours(date_fns_1.startOfDay(this.timeUtils.getNow()), date_fns_1.startOfDay(appointment.date))) < 24) {
                throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.BankDepositMustPayOneDayBefore));
            }
        }
    }
    async validateTimeMargin(appointment) {
        const marginTime = +bootstrap_config_service_1.appConfig.get('APPOINTMENT_MARGIN_TIME_IN_MINUTES', '60');
        const now = this.timeUtils.getNow();
        if (date_fns_1.isAfter(date_fns_1.addMinutes(now, marginTime), appointment.date)) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.TimeMarginExceeded));
        }
    }
    async validateOneAppointmentPerDay(userId, appointment, previousAppointmentCode, transaction) {
        let where = {
            clientId: userId,
            date: {
                [sequelize_1.Op.between]: [
                    date_fns_1.startOfDay(appointment.date),
                    date_fns_1.endOfDay(appointment.date),
                ],
            },
            state: {
                [sequelize_1.Op.notIn]: [
                    appointment_states_1.AppointmentStates.Cancelled,
                    appointment_states_1.AppointmentStates.NotAttended,
                    appointment_states_1.AppointmentStates.Postponed,
                ],
            },
            minorId: appointment.minorClientId || null,
        };
        if (previousAppointmentCode) {
            where.code = {
                [sequelize_1.Op.ne]: previousAppointmentCode,
            };
        }
        let isAlreadyAppointments = await this.appointmentModel.count({
            where: where,
            transaction: transaction,
        });
        if (isAlreadyAppointments) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.OnlyOneAppointmentPerDayPerClient));
        }
    }
};
AppointmentCreationValidationService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_2.InjectModel(appointment_model_1.Appointment)),
    __param(1, sequelize_2.InjectModel(client_model_1.Client)),
    __param(2, sequelize_2.InjectModel(minor_model_1.Minor)),
    __metadata("design:paramtypes", [Object, Object, Object, time_utils_service_1.TimeUtilsService,
        workable_time_service_1.WorkableTimeService,
        appointment_availability_service_1.AppointmentAvailabilityService])
], AppointmentCreationValidationService);
exports.AppointmentCreationValidationService = AppointmentCreationValidationService;
//# sourceMappingURL=appointment-creation-validation.service.js.map