import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

const EXCEPTIONS = {
  ValidationError: HttpStatus.BAD_REQUEST,
  InvalidStateError: HttpStatus.UNPROCESSABLE_ENTITY,
  UserNotFound: HttpStatus.NOT_FOUND,
  AffiliateNotFound: HttpStatus.BAD_REQUEST,
  UnauthorizedException: HttpStatus.UNAUTHORIZED,
  UnsufficientTokensError: HttpStatus.UNPROCESSABLE_ENTITY,
};

// Default error handler, catches all exceptions and sets status code accordingly.
// This is used in all the controllers with .useGlobalFilters().
@Catch()
export class DefaultErrorFilter implements ExceptionFilter {
  logger: Logger = new Logger('DefaultErrorFilter');

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = this.getStatus(exception);

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleString('es-AR'),
      path: request.url,
      exception: exception.name + ': ' + exception.message,
      stackTrace: exception.stack,
    };

    this.logger.log(exception.stack);
    response.status(status).json(errorResponse);
  }

  private getStatus(exception: Error) {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return EXCEPTIONS[exception.name] || 500;
  }
}
