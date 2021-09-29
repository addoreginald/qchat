import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // get response
    const request: Request = context.switchToHttp().getRequest();

    // transform response to standard structure
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${request.method} ${request.url} ${
              request.body && request.method !== 'GET'
                ? '::: ' + JSON.stringify(request.body)
                : ''
            }`,
            'RequestLoggerInterceptor'
          )
        )
      );
  }
}
