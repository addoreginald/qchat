import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
