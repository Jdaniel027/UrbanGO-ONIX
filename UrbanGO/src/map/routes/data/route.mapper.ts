import { RouteDTO } from "../types/route.dto";
import { Route } from "../types/route.types";

/**
 * mapRouteDTOToRoute
 * --------------------------------
 * Normaliza rutas del backend
 * a formato dominio.
 */
export function mapRouteDTOToRoute(dto: RouteDTO): Route {
  return {
    id: dto.id,

    // conversión crítica
    coordinates: dto.points.map(([lat, lng]) => [lng, lat]),

    // por ahora default
    type: "SUGGESTED",
  };
}
