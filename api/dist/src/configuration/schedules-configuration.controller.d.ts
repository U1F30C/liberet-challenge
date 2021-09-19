import { WorkableTimeService } from "./services/workable-time.service";
export declare class SchedulesConfigurationController {
    private workableTimeService;
    constructor(workableTimeService: WorkableTimeService);
    getWorkableDays(): Promise<any>;
}
