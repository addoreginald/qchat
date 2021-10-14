import { IsNotEmpty } from 'class-validator';

export class CreateSyncDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  extra: any;
}
