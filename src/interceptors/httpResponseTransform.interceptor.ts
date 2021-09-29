import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpResponseTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // get response
    const response: Response = context.switchToHttp().getResponse();

    // transform response to standard structure
    return next.handle().pipe(
      map((data: any) => ({
        statusCode: response.statusCode,
        message: process.env.FC_CONSTANT_HTTP_STATUS_SUCCESS,
        data,
      }))
    );
  }
}
