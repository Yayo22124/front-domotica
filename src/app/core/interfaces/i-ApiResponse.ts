import { iActuatorsData } from './i-ActuatorsData.interface';
import { iSensorsData } from './iSensorsData.interface';

export interface iApiResponse {
  success: boolean;
  sensorsData?: iSensorsData[];
  actuatorsData?: iActuatorsData[];
  roomsNames?: {
    bedrooms: string[],
    bathrooms: string[],
    garages: string[],
    kitchens: string[],
    livingrooms: string[],
  }
  lastRecord?: any;
  error?: any;
}
