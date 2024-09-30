import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

    constructor(private readonly mailerService:MailerService){}

    async sendMail(to:string, subject:string, context:{[key:string]:any}){
        await this.mailerService.sendMail({
            to,
            subject,
            template:'welcome',
            context
        });
    }
}
