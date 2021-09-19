import { Appointment, IAppointment } from 'src/appointments/entities/appointment.model';
import { IMinor } from 'src/clients/models/minor.model';
import { ITestResult } from 'src/test-result/entities/test-result.model';
import { IUser } from 'src/users/models/user.model';
import { AssetsServiceService } from '../assets-service/assets-service.service';
import { Readable } from 'stream';
export declare class ApplicationEmails {
    private assetsServiceService;
    constructor(assetsServiceService: AssetsServiceService);
    sendResults(data: {
        appointment: Pick<Appointment, 'code'>;
        result: Pick<ITestResult, 'resultData'>;
        clientUser: Pick<IUser, 'email' | 'fullName'>;
        underaged?: Pick<IMinor, 'fullName'>;
    }): Promise<void>;
    sendToSetPassword(data: {
        userDisplayName: string;
        email: string;
        token: string;
    }): Promise<void>;
    sendAppointmentInfo(data: {
        user: Pick<IUser, 'email' | 'fullName'>;
        appointment: Pick<IAppointment, 'code' | 'date' | 'testType'>;
        patientFullName: string;
        file: Readable;
    }): Promise<void>;
    sendToNotifyPaymentReview(data: {
        clientFullName: string;
        status: 'accepted' | 'rejected';
        email: string;
    }): Promise<void>;
}
