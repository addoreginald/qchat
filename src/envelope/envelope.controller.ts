import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateEnvelopeDto } from 'src/dtos/envelope.dto';
import { EnvelopeService } from './envelope.service';

@Controller('envelopes')
@ApiTags('Envelopes')
export class EnvelopeController {
  constructor(private service: EnvelopeService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachment', 5))
  create(
    @Body() body: CreateEnvelopeDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // handle file upload here

    // create envelope after attachment has been taken care of
    return this.service.create(body);
  }

  @Get()
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'mail_box_reference', type: 'string', required: true })
  find(
    @Query('mail_box_reference') mail_box_reference: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.find(mail_box_reference, { page, limit });
  }
}
