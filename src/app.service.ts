import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  estimateTripCost(): string {
    return 'Hello World!';
  }
}
