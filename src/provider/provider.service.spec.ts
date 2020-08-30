import { Test, TestingModule } from '@nestjs/testing';
import { ProviderService } from './provider.service';
import { Car, Motor, Scooter } from './../models/Vehicals';
import { PricesProviderOne, PricesProviderTwo } from './providers';

describe('ProviderServiceService', () => {
  let service: ProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderService],
    }).compile();

    service = module.get<ProviderService>(ProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('estimateCost', () => {
    it('should throw an error for to big distance', () => {
      expect(() => service.estimateCost(300000, 60, Car.Yaris)).toThrowError('Distance is to big for this vehicle')
    })
    //

    describe('', () => {
      [
        { vehicle: Motor.Yamaha, distance: 1000, time: 60, result: 45 },
        { vehicle: Car.Yaris, distance: 1000, time: 60, result: 160 },
        { vehicle: Car.Yaris, distance: 10000, time: 120, result: 940 },
        { vehicle: Car.Yaris, distance: 0, time: 0, result: 20 },
        { vehicle: Car.NissanLeafElectricAutomatic, distance: 0, time: 0, result: 0 },
        { vehicle: Car.NissanLeafElectricAutomatic, distance: 1000, time: 60, result: 175 },
        { vehicle: Motor.Yamaha, distance: 25000, time: 60, result: 750 },
        { vehicle: Motor.Yamaha, distance: 10000, time: 60, result: 450 },
        { vehicle: Scooter.ScooterOne, distance: 0, time: 0, result: 400 },
        { vehicle: Scooter.ScooterOne, distance: 332492, time: 14033, result: 6717 },

      ].forEach(data => {
        it(`shound return for vehicle: ${data.vehicle}, distance: ${data.distance}, time: ${data.time} cents equal ${data.result}`, () => {
          const cost = service.estimateCost(data.distance, data.time, data.vehicle)
          expect(cost).toEqual(data.result)
        })
      });
    })


    it('should return cost in ', () => {
      expect(service.estimateCost(1000, 60, Car.Yaris)).toEqual(160)
    })

  })

  describe('sumCosts', () => {
    [
      { vehicle: Car.Yaris, pricing: PricesProviderOne.get(Car.Yaris), distance: 1000, time: 60, result: 1.6 },
      { vehicle: Car.Yaris, pricing: PricesProviderOne.get(Car.Yaris), distance: 0, time: 0, result: 0.2 },
      { vehicle: Car.Yaris, pricing: PricesProviderOne.get(Car.Yaris), distance: 0, time: 0, result: 0.2 },
      { vehicle: Car.NissanLeafElectricAutomatic, pricing: PricesProviderOne.get(Car.NissanLeafElectricAutomatic), distance: 0, time: 0, result: 0 },
      { vehicle: Motor.Yamaha, pricing: PricesProviderOne.get(Motor.Yamaha), distance: 1000, time: 60, result: 0.3 },
      { vehicle: Motor.Yamaha, pricing: PricesProviderTwo.get(Motor.Yamaha), distance: 1000, time: 60, result: 0.45 },
      { vehicle: Scooter.ScooterOne, pricing: PricesProviderTwo.get(Scooter.ScooterOne), distance: 1000, time: 60, result: 4.19 },
    ].forEach((data) => {
      it(`shound return for vehicle: ${data.vehicle}, distance: ${data.distance}, time: ${data.time} cost equal ${data.result}`, () => {
        const cost = service.sumCosts(data.pricing, data.distance, data.time)
        expect(cost).toEqual(data.result)
      })
    })
  })
});
