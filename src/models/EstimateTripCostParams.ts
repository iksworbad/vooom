import { Geo } from "./geo";
import { Car, Motor, Scooter } from "./Vehicles";
import { IsNotEmpty } from 'class-validator';

export class EstimateTripCostParams {
  @IsNotEmpty()
  start: Geo;

  @IsNotEmpty()
  finish: Geo;

  @IsNotEmpty()
  vehicle: Car | Motor | Scooter
}

export interface EstimateTripCostResult {
  cents: number
  approximateDurationInSeconds: number
  approximateTripLengthInKm: number
}