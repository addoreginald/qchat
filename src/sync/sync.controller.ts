import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSyncDto } from '../dtos/sync.dto';
import { Response } from 'express';

@Controller('sync')
@ApiTags('sync')
export class SyncController {
  @Post()
  sync(@Body() body: CreateSyncDto, @Res() res: Response) {
    // return response imediately
    res.send({ type: body.type, status: 'success' });

    // proceed to process sync
  }
}
