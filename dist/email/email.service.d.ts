import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(to: string, subject: string, context: {
        [key: string]: any;
    }): Promise<void>;
}
