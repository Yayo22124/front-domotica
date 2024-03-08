import { iActuatorsData } from './i-ActuatorsData.interface';
import { iSensorsData } from './iSensorsData.interface';

export interface iApiResponse {
  success: boolean;
  sensorsData?: iSensorsData[];
  actuatorsData?: iActuatorsData[];
  error?: any;
}
