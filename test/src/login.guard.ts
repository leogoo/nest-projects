import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(AppService)
  private appService: AppService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard', this.appService.getHello());
    const classMetaData = this.reflector.get('roles', context.getClass());
    const handlerMetaData = this.reflector.get('roles', context.getHandler());
    const handlerMetaData2 = this.reflector.get('aaa', context.getHandler());
    console.log(handlerMetaData2);
    return true;
  }
}
