import { AppointmentInsertionDTO } from '../dto/appointment-insertion.dto';
import { AppointmentAvailabilityService } from './appointment-availability.service';
import { Appointment } from '../entities/appointment.model';
import { AppointmentCreationValidationService } from './appointment-creation-validation.service';
import { TestTypesService } from './test-types.service';
import { AppointmentPaymentInformationService } from './appointment-payment-information.service';
import { Transaction } from 'sequelize/types';
export declare class AppointmentCreationService {
    private appointmentModel;
    private testTypeService;
    private appointmentPaymentInformationService;
    private appointmentCreationValidationService;
    private appointmentAvailabilityService;
    constructor(appointmentModel: typeof Appointment, testTypeService: TestTypesService, appointmentPaymentInformationService: AppointmentPaymentInformationService, appointmentCreationValidationService: AppointmentCreationValidationService, appointmentAvailabilityService: AppointmentAvailabilityService);
    createAppointment(userId: number, appointment: AppointmentInsertionDTO, previousAppointment?: string, transaction?: Transaction): Promise<any>;
    private getDayOnly;
    private generateCode;
    private excecuteCreationTransaction;
    private applyChanges;
    private getTestType;
    validate(userId: number, appointment: AppointmentInsertionDTO, previousAppointmentCode?: string, transaction?: Transaction): Promise<void>;
}
