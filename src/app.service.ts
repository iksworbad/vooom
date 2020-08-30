import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleApiService } from './google-api/google-api.service';
import { ProviderService } from './provider/provider.service';

import { EstimateTripCostParams, EstimateTripCostResult } from './models/EstimateTripCostParams';
import { AllVehicals } from './models/Vehicals';
import { stringOfenumValue } from './utils/stringOfEnum';

@Injectable()
export class AppService {
  constructor(private googleApiService: GoogleApiService, private providerService: ProviderService) { }

  async estimateTripCost({ start, finish, vehicle }: EstimateTripCostParams): Promise<EstimateTripCostResult> {
    if(!stringOfenumValue(AllVehicals, vehicle)){
      throw new HttpException('This vehical is not supported', HttpStatus.BAD_REQUEST);
    }

    const { duration, distance } = await this.googleApiService.getDirectionData(start, finish)

    const cents = this.providerService.estimateCost(distance, duration, vehicle)

    return {
      cents,
      approximateDurationInSeconds: duration,
      approximateTripLengthInKm: distance/1000,
    }
  }
}
