import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CreateEnvelopeDto } from 'src/dtos/envelope.dto';
import { EnvelopeEntity } from 'src/entities/envelope.entity';
import { ENVELOPE_STATUS } from 'src/enums/envelope.enum';
import { Repository } from 'typeorm';

@Injectable()
export class EnvelopeService {
  constructor(
    @InjectRepository(EnvelopeEntity)
    private envelopeRepository: Repository<EnvelopeEntity>,
  ) {}

  async create(body: CreateEnvelopeDto) {
    // create envelope object
    const envelopeInstance = this.envelopeRepository.create({
      envelope_reference: body.envelope_reference,
      message: body.message,
      sender_name: body.sender_name,
      receiver_name: body.receiver_name,
      sender_reference: body.sender_reference,
      receiver_reference: body.receiver_reference,
      sent_on: new Date(),
      mail_box_reference: body.mail_box_reference,
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
