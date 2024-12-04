import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MyHeaders = createParamDecorator(
  (key, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return key ? req.headers[key.toLowerCase()] : req.headers;
  },
);
