import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/estimateTripCost (GET) return data', () => {
    return request(app.getHttpServer())
      .put('/estimateTripCost')
      .send({
        start: {
            latitude: 1000,
            longitude: 60
        },
        finish: {
            latitude: 1,
            longitude: 1
        },
        vehicle: "scooter-one"
    })
      .expect(200)
      .expect({
        cents: 419,
        approximateDurationInSeconds: 60,
        approximateTripLengthInKm: 1
      });
  });

  it('/estimateTripCost (GET) throw error for wrong vehicle', () => {
    return request(app.getHttpServer())
      .put('/estimateTripCost')
      .send({
        start: {
            latitude: 1000,
            longitude: 60
        },
        finish: {
            latitude: 1,
            longitude: 1
        },
        vehicle: "test"
    })
      .expect(400)
      .expect({ statusCode: 400, message: 'This vehicle is not supported' });
  });

  it('/estimateTripCost (GET) return data', () => {
    return request(app.getHttpServer())
      .put('/estimateTripCost')
      .send({
        start: {
            latitude: 1000,
            longitude: 60
        },
        finish: {
            latitude: 1,
            longitude: 1
        },
        vehicle: "scooter-one"
    })
      .expect(200)
      .expect({
        cents: 419,
        approximateDurationInSeconds: 60,
        approximateTripLengthInKm: 1
      });
  });

  it('/estimateTripCost (GET) throw error for maxDaily', () => {
    return request(app.getHttpServer())
      .put('/estimateTripCost')
      .send({
        start: {
            latitude: 31000,
            longitude: 60
        },
        finish: {
            latitude: 1,
            longitude: 1
        },
        vehicle: "yamaha"
    })
      .expect(400)
      .expect({ statusCode: 400, message: 'Distance is to big for this vehicle' });
  });

});
