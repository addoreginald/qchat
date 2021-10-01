import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMailBoxDto {
  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  owner_reference: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  owner_name: string;

  @ApiProperty({ type: String, default: '', required: false })
  @IsOptional()
  owner_image: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  recipient_reference: string;

  @ApiProperty({ type: String, default: '' })
  @IsNotEmpty()
  recipient_name: string;

  @ApiProperty({ type: String, default: '', required: false })
  @IsOptional()
  recipient_image: string;

  @ApiProperty({ type: String, default: '', required: false })
  @IsOptional()
  reference: string;
}
