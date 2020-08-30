import { Test, TestingModule } from '@nestjs/testing';
import { GoogleApiService } from './google-api.service';
import { ConfigModule } from '@nestjs/config';
import * as googlemaps from '@googlemaps/google-maps-services-js';

jest.mock('@googlemaps/google-maps-services-js', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        directions: jest.fn().mockImplementation(async (params: googlemaps.DirectionsRequest) => {
          return {
            data: {
              routes: [{ legs: [{ distance: {value: 123}, duration: {value: 456} }] }]
            }
          }
        })
      }
    })
  }
});

describe('GoogleApiService', () => {
  let service: GoogleApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleApiService],
      imports: [ConfigModule.forRoot({
        envFilePath: '.test.env',
      })]
    }).compile();

    service = module.get<GoogleApiService>(GoogleApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDirectionData', () => {

    it('should return distance and duration', async () => {
      const res = await service.getDirectionData({ latitude: 0, longitude: 0 }, { latitude: 1, longitude: 1 })

      expect(res).toEqual({ distance: 123, duration: 456 })
    })
  })
});
