import { Geo } from "./geo";
import { Car, Motor, Scooter } from "./vehicals";

export interface EstimateTripCostParams {
  start: Geo,
  finish: Geo,
  vehicle: Car | Motor | Scooter
}

export interface EstimateTripCostResult {
  cents: number
  approximateDurationInSeconds: number
  approximateTripLengthInKm: number
}