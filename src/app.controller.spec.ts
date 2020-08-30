import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleApiService } from './google-api/google-api.service';
import { ProviderService } from './provider/provider.service';
import { ConfigModule } from '@nestjs/config';

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
});
