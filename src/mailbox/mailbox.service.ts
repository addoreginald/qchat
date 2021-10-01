import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMailBoxDto } from 'src/dtos/mailbox.dto';
import { MailBoxEntity } from 'src/entities/mailbox.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailboxService {
  constructor(
    @InjectRepository(MailBoxEntity)
    private mailboxRepository: Repository<MailBoxEntity>,
  ) {}

  async create(body: CreateMailBoxDto) {
    // conversation reference
    const conversation_reference = String(Date.now());

    // create mail box A
    const mailboxA = this.mailboxRepository.create({
      reference: body.reference ?? conversation_reference,
      owner_reference: body.owner_reference,
      recipient_reference: body.recipient_reference,
      recipient_image: body.recipient_image,
      recipient_name: body.recipient_name,
    });

    const ownerMailbox = await this.mailboxRepository.save(mailboxA);

    // create mailbox B
    const mailboxB = this.mailboxRepository.create({
      reference: body.reference ?? conversation_reference,
      owner_reference: body.recipient_reference,
      recipient_reference: body.owner_reference,
      recipient_image: body.owner_image,
      recipient_name: body.owner_name,
    });

    await this.mailboxRepository.save(mailboxB);

    return ownerMailbox;
  }

  async find(query: any) {
    return await this.mailboxRepository.find({ where: { ...query } });
  }
}
