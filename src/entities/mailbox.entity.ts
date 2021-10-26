import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'mail_boxes' })
export class MailBoxEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  reference: string;

  @Column({ type: 'varchar', nullable: false })
  owner_reference: string;

  @Column({ type: 'varchar', nullable: false })
  recipient_reference: string;

  @Column({ type: 'varchar', nullable: false })
  recipient_name: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  recipient_image: string;

  @Column({ type: 'text', nullable: true })
  recent_message: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  recent_message_date: string;
}
