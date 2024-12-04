import { LoggerService } from '@nestjs/common';
import { Logger, createLogger } from 'winston';
import * as dayjs from 'dayjs';

export class MyLogger implements LoggerService {
  private logger: Logger;
  constructor(options) {
    this.logger = createLogger(options);
  }
  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    this.logger.log('error', `[${context}] ${message}`);
  }

  warn(message: string, context: string) {
    this.logger.log('warn', `[${context}] ${message}`);
  }
}
