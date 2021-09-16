import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvelopeEntity } from './entities/envelope.entity';
import { MailBoxEntity } from './entities/mailbox.entity';
import { EnvelopeModule } from './envelope/envelope.module';
import { MailboxModule } from './mailbox/mailbox.module';

@Module({
  imports: [
    EnvelopeModule,
    MailboxModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [MailBoxEntity, EnvelopeEntity],
      // extra: {socketPath: process.env.DATABASE_SOCKET},
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
