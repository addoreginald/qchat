import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'envelopes' })
export class EnvelopeEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  envelope_reference: string;

  @Column({ type: 'varchar', nullable: false })
  message: string;

  @Column({ type: 'varchar', nullable: false })
  sender_name: string;

  @Column({ type: 'varchar', nullable: false })
  receiver_name: string;

  @Column({ type: 'varchar', nullable: false })
  sender_reference: string;

  @Column({ type: 'varchar', nullable: false })
  receiver_reference: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: new Date().toDateString(),
  })
  sent_on: Date;

  @Column({ type: 'varchar', nullable: false })
  mail_box_reference: string;

  @Column({ type: 'json', nullable: true })
  attachment: string[];

  @Column({ type: 'varchar', nullable: true })
  attachment_type: string;
}
