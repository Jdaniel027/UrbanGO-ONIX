import { VehicleRepository } from "../repository/vehicle.repository";
import { mockVehicles } from "../data/vehicle.mock";

export const vehicleService: VehicleRepository = {
  async getVehicles() {
    return mockVehicles;
  },
};
