import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Car, Motor, Scooter } from 'src/models/vehicals';
import { PricesProviderOne } from './providers';
import { stringOfenumValue } from 'src/utils/stringOfEnum';

@Injectable()
export class ProviderService {

  estimateCost(distance: number, time: number, vehicle: Car | Motor | Scooter) {
    if (stringOfenumValue(Car, vehicle) || (stringOfenumValue(Motor, vehicle) && distance > 20000)) {
      const pricing = PricesProviderOne.get(vehicle as Car | Motor)
      let cost = 0;
      if ('maxDaily' in pricing && pricing.maxDaily < distance / 1000) {
        throw new HttpException('Distance is to big for this vehicle', HttpStatus.BAD_REQUEST);
      }
      Object.keys(pricing).forEach((key: string) => {
        if (key === 'maxDaily') { }
        if (key === 'startPrice') {
          cost += pricing.startPrice
        }
        if (key === 'stopPrice') {
          cost += pricing.stopPrice
        }
        if (key === 'drivingPricePerMinute') {
          cost += pricing.drivingPricePerMinute * (time / 60)
        }
        if (key === 'kmPrice') {
          cost += pricing.kmPrice * (distance / 1000)
        }
      })
      return cost
    }
  }
}
