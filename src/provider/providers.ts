import { Car, Motor, Scooter } from "../models/Vehicles"
import { PriceInfo } from "../models/priceInfo"

export const PricesProviderOne = new Map<Car | Motor, PriceInfo>()
  .set(Car.Yaris, {
    drivingPricePerMinute: 0.6,
    stopPrice: 0.2,
    kmPrice: 0.8,
    maxDaily: 120,
  })
  .set(Car.NissanLeafElectricAutomatic, {
    drivingPricePerMinute: 0.95,
    kmPrice: 0.8,
  })
  .set(Motor.Yamaha, {
    maxDaily: 30,
    kmPrice: .3,
  })

export const PricesProviderTwo = new Map<Motor | Scooter, PriceInfo>()
  .set(Motor.Yamaha, {
    maxDaily: 20,
    kmPrice: .45,
  })
  .set(Scooter.ScooterOne, {
    stopPrice: 4,
    kmPrice: 0.19,
  })
