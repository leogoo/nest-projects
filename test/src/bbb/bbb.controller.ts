import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseFilters,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Logger,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { MyValidatePipePipe } from 'src/my-validate-pipe.pipe';
import { MyException } from 'src/common';
import { MyExceptionFilter } from 'src/my-exception.filter';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('bbb')
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  private logger = new Logger();

  @Inject('CONFIG_OPTIONS')
  private readonly configOption: Record<string, any>;

  @Get()
  @UseFilters(MyExceptionFilter)
  findAll() {
    return this.bbbService.findAll();
  }

  @Post('/validate')
  validate(@Body(ValidationPipe) data: CreateBbbDto) {
    console.log('data', data);
    return '2222';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('1111', '2222');
    return '1111';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }

  @Post('fff')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads',
    }),
  )
  uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }
}
