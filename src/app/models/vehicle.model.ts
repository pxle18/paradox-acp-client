import internal from "stream";

export interface VehicleModel {
	id: number;
	owner: string;
	ownerId: number;
  vehiclehash: string;
  modelName: string;
  isModCar: boolean;
  
  price: number;
  maxSpeed: number;

  plate: string;
  note: string;
  garageId: number;
  
  inGarage: boolean;
}