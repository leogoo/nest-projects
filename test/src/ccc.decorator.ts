import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ccc = createParamDecorator((data, context: ExecutionContext) => {
  console.log(data, context);
  return 'ccc';
});
