import { AppointmentsService } from '../services/appointments.service';
export declare class AppointmentFilesController {
    private appointmentService;
    constructor(appointmentService: AppointmentsService);
    getPaymentDocument(appointmentCode: string, res: any): Promise<void>;
}
