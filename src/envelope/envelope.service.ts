import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CreateEnvelopeDto } from 'src/dtos/envelope.dto';
import { EnvelopeEntity } from 'src/entities/envelope.entity';
import { MailBoxEntity } from 'src/entities/mailbox.entity';
import { ENVELOPE_STATUS } from 'src/enums/envelope.enum';
import { MailboxService } from 'src/mailbox/mailbox.service';
import { Repository } from 'typeorm';

@Injectable()
export class EnvelopeService {
  constructor(
    @InjectRepository(EnvelopeEntity)
    private envelopeRepository: Repository<EnvelopeEntity>,
    private mailBoxService: MailboxService,
  ) {}

  async create(body: CreateEnvelopeDto) {
    // decalre mailbox
    let mailbox: MailBoxEntity;

    // check if this envelope does not have a mail box and create one
    if (!body.mail_box_reference) {
      // Check if mail box exists
      const existingMailBox = await this.mailBoxService.find(
        body.sender_reference,
      );

      if (existingMailBox.length === 0) {
        mailbox = await this.mailBoxService.create({
          owner_reference: body.sender_reference,
          owner_name: body.sender_name,
          owner_image: '',
          recipient_reference: body.receiver_reference,
          recipient_name: body.receiver_name,
          recipient_image: '',
        });
      } else {
        mailbox = existingMailBox[0];
      }
    }

    // create envelope object
    const envelopeInstance = this.envelopeRepository.create({
      envelope_reference: body.envelope_reference,
      message: body.message,
      sender_name: body.sender_name,
      receiver_name: body.receiver_name,
      sender_reference: body.sender_reference,
      receiver_reference: body.receiver_reference,
      sent_on: new Date(),
      mail_box_reference: body.mail_box_reference
        ? body.mail_box_reference
        : mailbox.reference,
      attachment: body.attachment,
      attachment_type: body.attachment_type,
    });

    // save in database
    const newEnvelope = await this.envelopeRepository.save(envelopeInstance);

    // create a receipt  and return it
    return {
      mail_box_reference: newEnvelope.mail_box_reference,
      status: ENVELOPE_STATUS.RECEIVED_BY_POST_OFFICE,
      envelope_reference: newEnvelope.envelope_reference,
    };
  }

  async find(mail_box_reference: string, pagination: IPaginationOptions) {
    return await paginate<EnvelopeEntity>(this.envelopeRepository, pagination, {
      where: { mail_box_reference },
    });
  }
}
