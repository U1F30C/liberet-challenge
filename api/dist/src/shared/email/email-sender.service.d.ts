import { Attachment } from 'nodemailer/lib/mailer';
export declare class EmailSender {
    private transporter;
    constructor();
    sendMail(to: string, template: string, locals?: any, attachments?: Attachment[]): Promise<void>;
}
export declare const emailSender: EmailSender;
