import { WorkableTimeService } from 'src/configuration/services/workable-time.service';
import { AppointmentAvailabilityService } from './services/appointment-availability.service';
export declare class AppointmentAvailabilityController {
    private workableTimeService;
    private appointmentAvailabilityService;
    constructor(workableTimeService: WorkableTimeService, appointmentAvailabilityService: AppointmentAvailabilityService);
    getAvailability(currentTimeQueryString: string): Promise<import("./services/appointment-availability.service").AvailabilityResult[]>;
}
