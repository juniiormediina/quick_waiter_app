import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  logInfo(message: string, context?: string) {
    const formattedMessage = `${new Date().toISOString()} - INFO: ${message}`;
    this.log(formattedMessage, context);
  }

  logError(message: string, trace?: string, context?: string) {
    const formattedMessage = `${new Date().toISOString()} - ERROR: ${message}`;
    this.error(formattedMessage, trace, context);
  }

  logWarning(message: string, context?: string) {
    const formattedMessage = `${new Date().toISOString()} - WARNING: ${message}`;
    this.warn(formattedMessage, context);
  }

  logDebug(message: string, context?: string) {
    const formattedMessage = `${new Date().toISOString()} - DEBUG: ${message}`;
    this.debug(formattedMessage, context);
  }
}
