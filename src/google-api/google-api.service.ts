import { Injectable } from '@nestjs/common';
import { DirectionsResponse } from 'src/models/google';
import { Geo } from 'src/models/geo';
import { Client, DirectionsRequest } from '@googlemaps/google-maps-services-js'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleApiService {
  constructor(private configService: ConfigService) { }

  async getDirectionData(origin: Geo, destination: Geo): Promise<DirectionsResponse> {
    const apiKey = this.configService.get<string>('GOOGLE_API_KEY')
    const googleMapsClient = new Client({});

    let params = {
      params: {
        origin: [origin.latitude, origin.longitude],
        destination: [destination.latitude, origin.longitude],
        key: apiKey
      }
    } as DirectionsRequest;

    const { distance, duration } = (await googleMapsClient.directions(params)).data.routes[0].legs[0]
    console.log({ distance, duration })
    return { distance, duration }
  }

}
