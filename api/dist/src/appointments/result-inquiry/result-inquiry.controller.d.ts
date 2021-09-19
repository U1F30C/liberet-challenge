import { ResultInquiryService } from './result-inquiry.service';
export declare class ResultInquiryController {
    private resultInquiryService;
    constructor(resultInquiryService: ResultInquiryService);
    getResultDoc(appointmentCode: string, res: any): Promise<void>;
}
