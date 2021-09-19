import { Dictionary } from 'lodash';
import { TimeUtilsService } from 'src/shared/time/time-utils.service';
export interface WorkableTime {
    startTime: Date;
    endTime: Date;
}
export declare class WorkableTimeService {
    private timeUtils;
    constructor(timeUtils: TimeUtilsService);
    isWorkableDateTime(date: Date): Promise<boolean>;
    isWorkableDay(date: Date): Promise<boolean>;
    isWorkableTime(date: Date): Promise<boolean>;
    getWorkableTimeRange(date: Date): Promise<WorkableTime>;
    getYearWorkableDays(): Promise<Dictionary<boolean>>;
}
