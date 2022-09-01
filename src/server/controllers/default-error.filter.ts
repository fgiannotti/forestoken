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
  UserNotFound: HttpStatus.NOT_FOUND,
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
      timestamp: new Date().toISOString(),
      path: request.url,
      exception: exception.name + ': ' + exception.message,
    };

    this.logger.log(JSON.stringify(errorResponse));
    response.status(status).json(errorResponse);
  }

  private getStatus(exception: Error) {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return EXCEPTIONS[exception.name] || 500;
  }
}
