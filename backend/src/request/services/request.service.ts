import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
  getRequest() {
    return 'Request Service';
  }
}
