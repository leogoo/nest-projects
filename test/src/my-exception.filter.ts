import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MyException } from './common';

@Catch(MyException)
export class MyExceptionFilter<MyException> implements ExceptionFilter {
  catch(exception: MyException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof MyException) {
      response
        .status(HttpStatus.UNAUTHORIZED)
        .json({
          code: HttpStatus.UNAUTHORIZED,
          message: exception.message,
          data: exception.message || '用户未登录',
        })
        .end();
    } else {
      //
    }
  }
}
