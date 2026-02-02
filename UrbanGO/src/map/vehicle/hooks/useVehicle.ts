import { useEffect, useState } from "react";
import { VehiclePosition } from "../types/types";
import { vehicleService } from "../service/vehicle.services";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<VehiclePosition[]>([]);

  useEffect(() => {
    vehicleService.getVehicles().then(setVehicles);
  }, []);

  return vehicles;
}
