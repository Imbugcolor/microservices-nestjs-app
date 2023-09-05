import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async notifyEmail({ email, txt }: NotifyEmailDto) {
    this.mailerService.sendMail({
      from: this.configService.get('MAIL_USERNAME'),
      to: email,
      subject: 'Sleepr Notification',
      text: txt,
    });
  }
}
