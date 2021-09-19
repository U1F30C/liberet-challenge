import { Transaction } from 'sequelize';
import { WorkableTimeService } from 'src/configuration/services/workable-time.service';
import { AppointmentInsertionDTO } from '../dto/appointment-insertion.dto';
import { AppointmentAvailabilityService } from './appointment-availability.service';
import { Appointment } from '../entities/appointment.model';
import { TimeUtilsService } from 'src/shared/time/time-utils.service';
import { Client } from 'src/clients/models/client.model';
import { Minor } from 'src/clients/models/minor.model';
export declare class AppointmentCreationValidationService {
    private appointmentModel;
    private clientModel;
    private minorModel;
    private timeUtils;
    private workableTimeService;
    private appointmentAvailabilityService;
    constructor(appointmentModel: typeof Appointment, clientModel: typeof Client, minorModel: typeof Minor, timeUtils: TimeUtilsService, workableTimeService: WorkableTimeService, appointmentAvailabilityService: AppointmentAvailabilityService);
    validateMinor(userId: number, appointment: AppointmentInsertionDTO): Promise<void>;
    vaidateInvoiceData(userId: number, appointment: AppointmentInsertionDTO): Promise<void>;
    validateForTraveling(userId: number, appointment: AppointmentInsertionDTO): Promise<void>;
    validateWorkableDateTime(appointment: AppointmentInsertionDTO): Promise<void>;
    validateAvailability(appointment: AppointmentInsertionDTO): Promise<void>;
    validateBankDepositCutOffTime(appointment: AppointmentInsertionDTO): Promise<void>;
    validateBankDepositDay(appointment: AppointmentInsertionDTO): Promise<void>;
    validateTimeMargin(appointment: AppointmentInsertionDTO): Promise<void>;
    validateOneAppointmentPerDay(userId: number, appointment: AppointmentInsertionDTO, previousAppointmentCode?: string, transaction?: Transaction): Promise<void>;
}
