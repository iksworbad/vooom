import { Injectable } from '@nestjs/common';
import { GoogleApiService } from './google-api/google-api.service';

@Injectable()
export class AppService {
  constructor(private googleApiService: GoogleApiService) { }
  estimateTripCost(): string {
    this.googleApiService.getDirectionData({
      latitude: 50.0646454,
      longitude: 19.9449779
    },
      {
        latitude: 52.2291168,
        longitude: 21.015462
      }
    )

    return 'Hello World!';
  }
}
