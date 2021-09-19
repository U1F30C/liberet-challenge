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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkableTimeService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const time_utils_service_1 = require("../../shared/time/time-utils.service");
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
let WorkableTimeService = class WorkableTimeService {
    constructor(timeUtils) {
        this.timeUtils = timeUtils;
    }
    async isWorkableDateTime(date) {
        let isValidDay = await this.isWorkableDay(date);
        let isValidTime = await this.isWorkableTime(date);
        return isValidDay && isValidTime;
    }
    async isWorkableDay(date) {
        return true;
    }
    async isWorkableTime(date) {
        const workableTime = await this.getWorkableTimeRange(date);
        return (date.getTime() >= workableTime.startTime.getTime() &&
            date.getTime() <= workableTime.endTime.getTime());
    }
    async getWorkableTimeRange(date) {
        let dateWithoutTime = this.timeUtils.getDateOnly(date);
        let [startTimeHour, startTimeMinutes] = bootstrap_config_service_1.appConfig
            .get('WORKABLE_START_TIME', '8:00')
            .split(':');
        let [endTimeHour, endTimeMinutes] = bootstrap_config_service_1.appConfig
            .get('WORKABLE_END_TIME', '10:30')
            .split(':');
        return {
            startTime: date_fns_1.addMinutes(this.timeUtils.addHours(dateWithoutTime, +startTimeHour), +startTimeMinutes),
            endTime: date_fns_1.addMinutes(this.timeUtils.addHours(dateWithoutTime, +endTimeHour), +endTimeMinutes),
        };
    }
    async getYearWorkableDays() {
        let limitDate = new Date(2022, 0);
        let result = {};
        for (let currentDate = new Date(2021, 0, 1); currentDate < limitDate; currentDate = new Date(currentDate.getTime() + 24 * 3600000)) {
            let key = this.timeUtils.getDateOnlyString(currentDate);
            if (![6, 0].includes(currentDate.getDay())) {
                result[key] = true;
            }
            else
                result[key] = false;
        }
        return result;
    }
};
WorkableTimeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [time_utils_service_1.TimeUtilsService])
], WorkableTimeService);
exports.WorkableTimeService = WorkableTimeService;
//# sourceMappingURL=workable-time.service.js.map