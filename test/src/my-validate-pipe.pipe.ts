import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class MyValidatePipePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // dto
    const { metatype } = metadata;
    if (!metadata) {
      return value;
    }
    // 通过 class-transformer 包的 plainToInstance 把普通对象转换为 dto class 的实例对象
    const object = plainToInstance(metatype, value);
    // 调用 class-validator 包的 validate api 对它做验证
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('参数校验失败');
    }
    return value;
  }
}
