import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RequestWithUser } from 'src/authorization/types/request-with-users';
import { AppointmentProofOfPaymentService } from './services/appointment-proof-of-payment.service';
export declare class AppointmentProofOfPaymentImageController {
    private appointmentPaymentService;
    private jwtService;
    constructor(appointmentPaymentService: AppointmentProofOfPaymentService, jwtService: JwtService);
    downloadProofOfPayment(request: RequestWithUser, response: Response, appointmentCode: string): Promise<any>;
}
