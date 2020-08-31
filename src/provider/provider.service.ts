import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Car, Motor, Scooter } from '../models/Vehicals';
import { stringOfEnumValue } from '../utils/stringOfEnum';
import { PricesProviderOne, PricesProviderTwo } from './providers';
import { PriceInfo } from 'src/models/priceInfo';

@Injectable()
export class ProviderService {

  estimateCost(distance: number, time: number, vehicle: Car | Motor | Scooter) {
    const pricing = this.getPricing(vehicle, distance)
    const cost = this.sumCosts(pricing, distance, time)

    return Math.round(cost * 100)

  }

  getPricing(vehicle: Car | Motor | Scooter, distance: number) {
    let pricing
    if (stringOfEnumValue(Car, vehicle) || (stringOfEnumValue(Motor, vehicle) && distance > 20000))
      pricing = PricesProviderOne.get(vehicle as Car | Motor)
    else
      pricing = PricesProviderTwo.get(vehicle as Motor | Scooter)

    this.checkMaxDaily(pricing, distance)
    return pricing
  }

  checkMaxDaily(pricing: PriceInfo, distance: number) {
    if (pricing && 'maxDaily' in pricing && pricing.maxDaily < distance / 1000) {
      throw new HttpException('Distance is to big for this vehicle', HttpStatus.BAD_REQUEST);
    }
  }

  sumCosts(pricing: PriceInfo, distance: number, time: number): number {
    let cost = 0;
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
