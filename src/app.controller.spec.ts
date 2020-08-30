import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleApiService } from './google-api/google-api.service';
import { ProviderService } from './provider/provider.service';
import { ConfigModule } from '@nestjs/config';
import { Scooter, Car } from './models/Vehicals';

jest.mock('@googlemaps/google-maps-services-js', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        directions: jest.fn().mockImplementation(async ({params}: any) => {
          return {
            data: {
              routes: [{ legs: [{ distance: {value: params.origin[0]}, duration: {value: params.origin[1]} }] }]
            }
          }
        })
      }
    })
  }
});

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [ConfigModule.forRoot({
        envFilePath: '.test.env',
      })],
      providers: [AppService, GoogleApiService, ProviderService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defind', () => {
      expect(appController).toBeDefined();
    });
  });


  describe('/estimateTripCost', () => {
    it('should return proper data', async () => {
      const res = await appController.estimateTripCost({
        start: {
          latitude: 1000,
          longitude: 60
        },
        finish: {
          latitude: 1,
          longitude: 1
        },
        vehicle: Scooter.ScooterOne
      })
      expect(res).toEqual({
        cents: 419,
        approximateDurationInSeconds: 60,
        approximateTripLengthInKm: 1
      })
    })


    it('should throw error about to big distance for this vehicle', () => {
      
      const res = appController.estimateTripCost({
        start: {
          latitude: 300000,
          longitude: 60
        },
        finish: {
          latitude: 1,
          longitude: 1
        },
        vehicle: Car.Yaris
      })

      expect(async () => await res).rejects.toThrowError('Distance is to big for this vehicle')
    })

    it('should throw error where there is not vehicle', () => {
      const res = appController.estimateTripCost({
        start: {
          latitude: 300000,
          longitude: 60
        },
        finish: {
          latitude: 1,
          longitude: 1
        },
        vehicle: '' as Car
      })

      expect(async () => await res).rejects.toThrowError('This vehical is not supported')
    })
  })
});
