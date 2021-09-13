import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEnvelopeDto {
  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  envelope_reference: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  sender_name: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  receiver_name: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  sender_reference: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  receiver_reference: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  mail_box_reference: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  attachment: any;

  @IsOptional()
  attachment_type: string;
}
