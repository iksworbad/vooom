import { Injectable } from '@nestjs/common';
import { GoogleApiService } from './google-api/google-api.service';
import { ProviderService } from './provider/provider.service';

import { EstimateTripCostParams, EstimateTripCostResult } from './models/EstimateTripCostParams';

@Injectable()
export class AppService {
  constructor(private googleApiService: GoogleApiService, private providerService: ProviderService) { }

  async estimateTripCost({ start, finish, vehicle }: EstimateTripCostParams): Promise<EstimateTripCostResult> {
    const { duration, distance } = await this.googleApiService.getDirectionData(start, finish)

    const cents = this.providerService.estimateCost(distance, duration, vehicle)

    return {
      cents,
      approximateDurationInSeconds: duration,
      approximateTripLengthInKm: distance/1000,
    }
  }
}
