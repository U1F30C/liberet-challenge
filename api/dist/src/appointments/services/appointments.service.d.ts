import { Transaction } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { AssetsServiceService } from 'src/shared/assets-service/assets-service.service';
import { BaseService } from 'src/shared/base/base.service';
import { ApplicationEmails } from 'src/shared/email/application-emails';
import { PdfService } from 'src/shared/pdf/pdf.service';
import { OdataQueryParams, PaginationWrapper, Querist } from 'src/shared/querying/querist';
import { TimeUtilsService } from 'src/shared/time/time-utils.service';
import { IUser } from 'src/users/models/user.model';
import { Appointment, IAppointment } from '../entities/appointment.model';
import { Consecutive } from '../entities/consecutive.model';
export declare class AppointmentsService extends BaseService<Appointment, IAppointment> {
    private consecutiveModel;
    private timeUtils;
    private emails;
    private pdfService;
    private assetsServiceService;
    constructor(appointmentModel: ModelCtor<Appointment>, querist: Querist<Appointment>, consecutiveModel: ModelCtor<Consecutive>, timeUtils: TimeUtilsService, emails: ApplicationEmails, pdfService: PdfService, assetsServiceService: AssetsServiceService);
    findOneByCode(code: string): Promise<any>;
    findOneByCodeExpand(code: string): Promise<any>;
    findWithResult(query: OdataQueryParams): Promise<PaginationWrapper<any>>;
    findForFinanceUser(query: any): Promise<PaginationWrapper<Appointment>>;
    private getCurrentDay;
    assignNewNumber(testCode: string, transaction: Transaction): Promise<void>;
    getAppointmentInfoFileData(testCode: string): Promise<{
        appointment: any;
        patient: {
            fullName: string;
        };
    }>;
    renderAppointmentInformationFile(data: {
        user: Pick<IUser, 'email' | 'fullName'>;
        appointment: Pick<IAppointment, 'code' | 'date' | 'testType'>;
        patientFullName: string;
        procedence: string;
    }): Promise<any>;
    sendAppointmentInformationEmail(testCode: string): Promise<void>;
}
