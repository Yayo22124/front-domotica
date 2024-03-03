export interface iBedroom {
  id: number;
  name: string;
  description: string;
  location: string;
  sensors?: any[];
  actuators?: any[];
  status: boolean;
}
