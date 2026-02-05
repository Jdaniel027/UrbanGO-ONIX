import { StopDTO } from "../types/stop.dto";
import { Stop } from "../types/types";

/**
 * mapStopDTOToStop
 * --------------------------------
 * Convierte una parada recibida desde la API
 * al tipo Stop del dominio.
 *
 * Backend → Dominio
 *
 * Este mapper garantiza que:
 * - El frontend NO dependa del formato del backend
 * - Las coordenadas estén normalizadas
 */
export function mapStopDTOToStop(dto: StopDTO): Stop {
  return {
    /** ID estable de la parada */
    id: dto.id,

    /** Nombre visible */
    name: dto.name,

    /** Categoría fija para paradas de transporte */
    category: "bus",

    /**
     * Coordenadas normalizadas
     * GeoJSON usa SIEMPRE:
     * [longitud, latitud]
     */
    coordinates: [dto.lng, dto.lat],
  };
}
