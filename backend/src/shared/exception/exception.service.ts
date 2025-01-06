import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ExceptionService {
  constructor(private readonly logger: LoggerService) {}

  throwUnauthorizedException(message: string, trace?: string) {
    this.logger.logError(message, trace, 'UnauthorizedException');
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  throwBadRequestException(message: string, trace?: string) {
    this.logger.logError(message, trace, 'BadRequestException');
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  throwInternalServerErrorException(message: string, trace?: string) {
    this.logger.logError(message, trace, 'InternalServerErrorException');
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
