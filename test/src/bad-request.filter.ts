import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const statusCode = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };
    console.log('exception', res);

    response
      .status(HttpStatus.FORBIDDEN)
      .json({
        code: statusCode,
        message: res?.message.join(','),
      })
      .end();
  }
}
