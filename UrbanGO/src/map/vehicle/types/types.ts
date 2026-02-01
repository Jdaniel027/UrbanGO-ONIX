export type VehiclePosition = {
  id: string;
  latitude: number;
  longitude: number;
  bearing?: number; // rotación del camión
  speed?: number;
  timestamp: number;
};
