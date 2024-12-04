import { IsNumber, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateBbbDto {
  @IsNotEmpty({ message: 'aaa 不能为空' })
  @IsEmail({}, { message: 'aaa 不是邮箱格式' })
  aaa: string;

  @IsNumber({}, { message: 'bbb 不是数字' })
  @IsNotEmpty({ message: 'bbb 不能为空' })
  bbb: number;
}
