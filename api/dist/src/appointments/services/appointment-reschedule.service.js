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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRescheduleService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const roles_1 = require("../../constants/roles");
const time_utils_service_1 = require("../../shared/time/time-utils.service");
const user_model_1 = require("../../users/models/user.model");
const users_service_1 = require("../../users/users.service");
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
const error_responses_1 = require("../../utils/error-responses");
const appointment_error_codes_1 = require("../constants/appointment-error-codes");
const appointment_states_1 = require("../constants/appointment-states");
const appointment_model_1 = require("../entities/appointment.model");
const date_fns_1 = require("date-fns");
const appointment_creation_service_1 = require("./appointment-creation.service");
const appointment_cancellation_service_1 = require("./appointment-cancellation.service");
const payment_methods_1 = require("../constants/payment-methods");
const payment_model_1 = require("../entities/payment.model");
const date_fns_2 = require("date-fns");
const lodash_1 = __importDefault(require("lodash"));
let AppointmentRescheduleService = class AppointmentRescheduleService {
    constructor(appointmentModel, paymentModel, userService, timeUtils, appointmentCancellationService, appointmentCreationService) {
        this.appointmentModel = appointmentModel;
        this.paymentModel = paymentModel;
        this.userService = userService;
        this.timeUtils = timeUtils;
        this.appointmentCancellationService = appointmentCancellationService;
        this.appointmentCreationService = appointmentCreationService;
    }
    async rescheduleAppointment(code, userId, newDate) {
        let appointment = await this.appointmentModel.findOne({
            where: {
                code: code,
            },
            include: {
                model: payment_model_1.Payment,
            },
        });
        if (!appointment) {
            throw new common_1.NotFoundException(error_responses_1.createErrorResponse(appointment_error_codes_1.AppointmentNotFound));
        }
        if (date_fns_2.isEqual(appointment.date, newDate)) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.CannotRescheduleToSameDate));
        }
        await this.isUserAbleToReschedule(userId, appointment);
        await this.validateReschedulable(appointment, newDate);
        return await this.performReschedule(appointment, userId, newDate);
    }
    async performReschedule(appointment, userId, newDate) {
        return await this.appointmentModel.sequelize.transaction(async (transaction) => {
            try {
                let appointmentCopy = this.copyAppointment(appointment);
                appointmentCopy.date = newDate;
                const postponedResult = await this.appointmentCancellationService.postponeAppointment(appointment.code, userId, transaction);
                let created = await this.appointmentCreationService.createAppointment(userId, appointmentCopy, postponedResult.resultingCode, transaction);
                if (appointment.payment) {
                    await this.paymentModel.update(lodash_1.default.omit(appointment.payment.toJSON(), 'appointmentCode'), {
                        where: {
                            appointmentCode: created.code,
                        },
                        transaction: transaction,
                    });
                }
                return created;
            }
            catch (ex) {
                console.log(ex);
                throw ex;
            }
        });
    }
    copyAppointment(appointment) {
        let payment = appointment.payment;
        let result = {
            date: appointment.date,
            isForTraveling: appointment.isForTraveling,
            minorClientId: appointment.minorId,
            paymentMethod: payment_methods_1.getPaymentMethodByEnum(payment.type).id,
            invoiceRequired: appointment.payment.invoiceRequired,
            testTypeId: appointment.testTypeId,
        };
        return result;
    }
    async validateReschedulable(appointment, newDate) {
        await this.validateAppointmentStatus(appointment);
        this.validateTimeMargin(newDate);
    }
    async validateAppointmentStatus(appointment) {
        if (![appointment_states_1.AppointmentStates.NotAttended, appointment_states_1.AppointmentStates.Scheduled].includes(appointment.state)) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.NoReschedullableAppointment));
        }
    }
    validateTimeMargin(newDate) {
        const timeMarginInHours = +bootstrap_config_service_1.appConfig.get('RESCHEDULE_TIME_MARGIN_IN_HORS');
        if (date_fns_1.isAfter(date_fns_1.addHours(this.timeUtils.getNow(), timeMarginInHours), newDate)) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.RescheduleAttemptIsLate));
        }
    }
    async isUserAbleToReschedule(userId, appointment) {
        let user = null;
        let exc = new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.YourAreNotAllowedToReschedule));
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
AppointmentRescheduleService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __param(1, sequelize_1.InjectModel(payment_model_1.Payment)),
    __metadata("design:paramtypes", [Object, Object, users_service_1.UsersService,
        time_utils_service_1.TimeUtilsService,
        appointment_cancellation_service_1.AppointmentCancelationService,
        appointment_creation_service_1.AppointmentCreationService])
], AppointmentRescheduleService);
exports.AppointmentRescheduleService = AppointmentRescheduleService;
//# sourceMappingURL=appointment-reschedule.service.js.map