import { Controller, Get } from '@nestjs/common';
import { RequestService } from './services/request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('create')
  getRequest() {
    return this.requestService.getRequest();
  }
}
