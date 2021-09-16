import { MailboxService } from './mailbox.service';
import { MailboxController } from './mailbox.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailBoxEntity } from 'src/entities/mailbox.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MailBoxEntity])],
  controllers: [MailboxController],
  providers: [MailboxService],
  exports: [MailboxService],
})
export class MailboxModule {}
