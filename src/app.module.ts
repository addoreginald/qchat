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
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestLoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: HttpResponseTransformInterceptor },
  ],
})
export class AppModule {}
