import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  providers: [EmailService],
  exports: [EmailService],
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService:ConfigService)=>({
        transport:{
          host: ConfigService.get('MAIL_HOST'),
          port: ConfigService.get('MAIL_PORT'),
          auth:{
            user: ConfigService.get('MAIL_USER'),
            pass: ConfigService.get('MAIL_PASS')
          }
        },
        defaults:{
          from: ConfigService.get('MAIL_SENDER')
        },
        template:{
          dir: join(process.cwd(), 'src', 'templates'),
          adapter: new HandlebarsAdapter(),
          options:{
            strict: true
          }
        }
      })
    })
  ]
})
export class EmailModule {}
