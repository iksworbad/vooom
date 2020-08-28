import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EstimateTripCostParams, EstimateTripCostResult } from './models/EstimateTripCostParams';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/estimateTripCost')
  async estimateTripCost(@Body() data: EstimateTripCostParams): Promise<EstimateTripCostResult> {
    return await this.appService.estimateTripCost(data);
  }
}
