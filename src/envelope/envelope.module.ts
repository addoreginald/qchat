import { EnvelopeService } from './envelope.service';
import { EnvelopeController } from './envelope.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvelopeEntity } from 'src/entities/envelope.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnvelopeEntity]),
    MulterModule.register({ dest: 'upload' }),
  ],
  controllers: [EnvelopeController],
  providers: [EnvelopeService],
})
export class EnvelopeModule {}
