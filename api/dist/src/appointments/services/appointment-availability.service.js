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
exports.AppointmentAvailabilityService = exports.CannotDecrease = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const lodash_1 = __importDefault(require("lodash"));
const sequelize_2 = require("sequelize");
const workable_time_service_1 = require("../../configuration/services/workable-time.service");
const time_utils_service_1 = require("../../shared/time/time-utils.service");
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
const error_responses_1 = require("../../utils/error-responses");
const appointment_error_codes_1 = require("../constants/appointment-error-codes");
const appointment_availability_model_1 = require("../entities/appointment-availability.model");
const AppointmentIntervalTimeSpanInMinutes = 10;
exports.CannotDecrease = 'CannotDecrease';
let AppointmentAvailabilityService = class AppointmentAvailabilityService {
    constructor(appointmentAvailabilityModel, workableTimeService, timeUtil) {
        this.appointmentAvailabilityModel = appointmentAvailabilityModel;
        this.workableTimeService = workableTimeService;
        this.timeUtil = timeUtil;
    }
    async isSlotAvailable(date) {
        let availabilityRecords = await this.getAvailability(date);
        let slot = availabilityRecords.find((a) => a.time.getTime() == date.getTime());
        if (slot && slot.availableSpaces > 0) {
            return true;
        }
        return false;
    }
    async getAvailability(queryDate) {
        const workableTime = await this.workableTimeService.getWorkableTimeRange(queryDate);
        if (queryDate < workableTime.startTime) {
            queryDate = workableTime.startTime;
        }
        this.verifyDateFormat(queryDate);
        let occupiedSpacesList = await this.getOccupiedSpaces(queryDate);
        let occupiedSpacesMap = lodash_1.default.chain(occupiedSpacesList)
            .keyBy((element) => new Date(element.appointmentDate).getTime())
            .mapValues((val) => val.numberOfAppointments)
            .value();
        let result = this.getRemainingSpaces(queryDate, workableTime.endTime, occupiedSpacesMap);
        return result;
    }
    async decrementSlot(date, transaction) {
        this.verifyDateFormat(date);
        let availabilitySlot = await this.appointmentAvailabilityModel.findOne({
            where: {
                appointmentDate: date,
            },
            transaction: transaction,
        });
        if (!availabilitySlot || availabilitySlot.numberOfAppointments == 0) {
            return;
        }
        await availabilitySlot.decrement('numberOfAppointments', {
            by: 1,
            transaction: transaction,
        });
    }
    async incrementSlot(date, transaction) {
        this.verifyDateFormat(date);
        let availabilitySlot = await this.appointmentAvailabilityModel.findOne({
            where: {
                appointmentDate: date,
            },
            transaction: transaction,
        });
        if (!availabilitySlot) {
            availabilitySlot = await this.appointmentAvailabilityModel.create({
                appointmentDate: date,
                numberOfAppointments: 0,
            }, {
                transaction: transaction,
            });
        }
        await availabilitySlot.increment('numberOfAppointments', {
            by: 1,
            transaction: transaction,
        });
    }
    getRemainingSpaces(startDate, lastDate, occupiedSpacesMap) {
        let limitOfSpaces = bootstrap_config_service_1.appConfig.get('AVAILABLE_SPACES_FOR_EACH_TEN_MINUTES', '5');
        let result = [];
        for (let it = startDate; it.getTime() <= lastDate.getTime(); it = new Date(it.getTime() + AppointmentIntervalTimeSpanInMinutes * 60 * 1000)) {
            let takenSpaces = occupiedSpacesMap[it.getTime()] || 0;
            result.push({
                availableSpaces: +limitOfSpaces - takenSpaces,
                time: it,
            });
        }
        return result;
    }
    getOccupiedSpaces(startTime) {
        return this.appointmentAvailabilityModel.findAll({
            where: {
                appointmentDate: {
                    [sequelize_2.Op.gte]: startTime,
                    [sequelize_2.Op.lte]: this.timeUtil.getLastMomentOfDay(startTime),
                },
            },
        });
    }
    verifyDateFormat(date) {
        if (date.getMinutes() % AppointmentIntervalTimeSpanInMinutes !== 0) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(appointment_error_codes_1.WrongTimeOfDay));
        }
    }
};
AppointmentAvailabilityService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_availability_model_1.AppointmentAvailability)),
    __metadata("design:paramtypes", [Object, workable_time_service_1.WorkableTimeService,
        time_utils_service_1.TimeUtilsService])
], AppointmentAvailabilityService);
exports.AppointmentAvailabilityService = AppointmentAvailabilityService;
//# sourceMappingURL=appointment-availability.service.js.map