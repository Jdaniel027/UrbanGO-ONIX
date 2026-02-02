import { VehiclePosition } from "../types/types";

export interface VehicleRepository {
  getVehicles(): Promise<VehiclePosition[]>;
}
