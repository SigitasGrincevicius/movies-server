import { Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
