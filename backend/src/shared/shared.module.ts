import { Global, Module } from '@nestjs/common';
import { ExceptionService } from './exception/exception.service';
import { LoggerService } from './logger/logger.service';

@Global()
@Module({
  providers: [LoggerService, ExceptionService],
  exports: [LoggerService, ExceptionService],
})
export class SharedModule {}
