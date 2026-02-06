import { useEffect, useState } from "react";
import { VehiclePosition } from "../types/types";
import { vehicleService } from "../service/vehicle.services";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<VehiclePosition[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const data = await vehicleService.getVehicles();
      if (mounted) setVehicles(data);
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return vehicles;
}
