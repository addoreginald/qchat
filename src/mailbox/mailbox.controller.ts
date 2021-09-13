import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMailBoxDto } from 'src/dtos/mailbox.dto';
import { MailboxService } from './mailbox.service';

@Controller('mail-boxes')
@ApiTags('Mail boxes')
export class MailboxController {
  constructor(private service: MailboxService) {}

  @Get()
  find(@Query('owner_reference') owner_reference: string) {
    return this.service.find(owner_reference);
  }

  @Post()
  create(@Body() body: CreateMailBoxDto) {
    return this.service.create(body);
  }
}
