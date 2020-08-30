export enum Motor {
  Yamaha = 'yamaha'
}

export enum Scooter {
  ScooterOne = 'scooter-one'
}

export enum Car {
  Yaris = 'yaris',
  NissanLeafElectricAutomatic = 'nissan',
}

export const AllVehicals =  Object.assign({}, Motor, Scooter, Car)