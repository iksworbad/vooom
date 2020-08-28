import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleApiService } from './google-api/google-api.service';
import { ProviderService } from './provider/provider.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleApiService, ProviderService],
})

export class AppModule { }
