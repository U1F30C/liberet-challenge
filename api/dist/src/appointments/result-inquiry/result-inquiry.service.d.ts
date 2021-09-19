import { ModelCtor } from 'sequelize-typescript';
import { AssetsServiceService } from 'src/shared/assets-service/assets-service.service';
import { PdfService } from 'src/shared/pdf/pdf.service';
import { Appointment } from '../entities/appointment.model';
export declare class ResultInquiryService {
    private appointmentModel;
    private pdfService;
    private assetsServiceService;
    constructor(appointmentModel: ModelCtor<Appointment>, pdfService: PdfService, assetsServiceService: AssetsServiceService);
    getResult(appointmentCode: string): Promise<any>;
    calculateAge(birthday: Date, atTime: Date): number;
}
