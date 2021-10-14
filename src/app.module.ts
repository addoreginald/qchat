import { SyncModule } from './sync/sync.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvelopeEntity } from './entities/envelope.entity';
import { MailBoxEntity } from './entities/mailbox.entity';
import { EnvelopeModule } from './envelope/envelope.module';
import { HttpResponseTransformInterceptor } from './interceptors/httpResponseTransform.interceptor';
import { RequestLoggerInterceptor } from './interceptors/requestLogger.interceptor';
import { MailboxModule } from './mailbox/mailbox.module';
import {
  WebhookEntity,
  WebhookModule,
  WebhookRequestEntity,
} from 'mftl-webhook';

// Events
// ======

export const events = {
  ENVELOPE_CREATED: 'ENVELOPE_CREATED',
};

@Module({
  imports: [
    SyncModule,
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
      entities: [
        MailBoxEntity,
        EnvelopeEntity,
        WebhookEntity,
        WebhookRequestEntity,
      ],
      // extra: {socketPath: process.env.DATABASE_SOCKET},
      synchronize: true,
    }),

    // Webhook
    WebhookModule.register(events, { maxRedirects: 5, timeout: 5000 }),
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestLoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: HttpResponseTransformInterceptor },
  ],
})
export class AppModule {}
