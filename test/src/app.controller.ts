import {
  Body,
  Controller,
  Get,
  Inject,
  Ip,
  Logger,
  Optional,
  Post,
  Query,
  Render,
  Session,
  SetMetadata,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilterFilter } from './test-filter.filter';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';
import { MyHeaders } from './my-headers.decorator';
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import * as fs from 'fs';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

@Controller()
@SetMetadata('roles', ['admin'])
export class AppController {
  // 构造器采纳数依赖
  constructor(private readonly appService: AppService) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;

  @Get()
  @Render('user')
  getHome() {
    return { name: 'bob', age: 12 };
  }

  @Post('/upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads',
    }),
  )
  upload(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    const fileName = body.name.match(/(.+)\_\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    // 移动到独立的文件夹
    // path是在服务器的存储路径
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;
    const files = fs.readdirSync(chunkDir);
    let startPos = 0;
    const getIndex = (str: string): number => {
      const match = str.match(/_(\d+)$/);
      return +match[1];
    };
    // 需要排序，否则文件会损坏
    const arr = files.sort((a, b) => {
      return getIndex(a) - getIndex(b);
    });
    arr.map((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      // 合并文件并写入到uploads中
      stream.pipe(
        fs.createWriteStream('uploads/' + name, {
          start: startPos,
        }),
      );
      startPos += fs.statSync(filePath).size;
    });
  }

  @Get('/ip')
  getIp(@Ip() ip: string): string {
    console.log('ip', ip);
    return this.appService.getHello();
  }

  @Get('/session')
  getSession(@Session() session) {
    if (!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;
    return session.count;
  }

  // @Post('/bbb')
  // test() {
  //   return '1111';
  // }

  @Get('/aaa')
  @SetMetadata('roles', ['user'])
  getHello2(): string {
    console.log('controller handler');
    return this.appService.getHello();
  }

  @Bbb('/decorator')
  getDecorator() {
    return this.appService.getHello();
  }

  @Get('/ccc')
  getCcc(@MyHeaders('cookie') ccc) {
    console.log(ccc);
    return '11111';
  }
}
