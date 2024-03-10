import { iActuatorsData } from "./i-ActuatorsData.interface";
import { iSensorsData } from "./iSensorsData.interface";

export interface iBedroom {
  id: number;
  name: string;
  description: string;
  location: string;
  sensors?: iSensorsData[];
  actuators?: iActuatorsData[];
  status: boolean;
}
