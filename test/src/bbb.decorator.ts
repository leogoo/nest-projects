import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { Aaa } from './aaa.decorator';

export const Bbb = (path) => {
  return applyDecorators(Get(path), UseGuards(LoginGuard), Aaa('111111'));
};
