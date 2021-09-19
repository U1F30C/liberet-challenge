import { Transaction } from 'sequelize';
import { WorkableTimeService } from 'src/configuration/services/workable-time.service';
import { TimeUtilsService } from 'src/shared/time/time-utils.service';
import { AppointmentAvailability } from '../entities/appointment-availability.model';
export declare const CannotDecrease = "CannotDecrease";
export interface AvailabilityResult {
    time: Date;
    availableSpaces: number;
}
export declare class AppointmentAvailabilityService {
    private appointmentAvailabilityModel;
    private workableTimeService;
    private timeUtil;
    constructor(appointmentAvailabilityModel: typeof AppointmentAvailability, workableTimeService: WorkableTimeService, timeUtil: TimeUtilsService);
    isSlotAvailable(date: Date): Promise<boolean>;
    getAvailability(queryDate: Date): Promise<AvailabilityResult[]>;
    decrementSlot(date: Date, transaction?: Transaction): Promise<void>;
    incrementSlot(date: Date, transaction?: Transaction): Promise<void>;
    private getRemainingSpaces;
    private getOccupiedSpaces;
    private verifyDateFormat;
}
