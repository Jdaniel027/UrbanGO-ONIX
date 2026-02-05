import { MapEntityDTO } from "../types/mapEntity.dto";
import { mapPOIDTOToPOI } from "@/src/map/pois/data/poi.mapper";
import { mapStopDTOToStop } from "@/src/map/stops/data/stops.mapper";

/**
 * mapEntityDTOToDomain
 * --------------------------------
 * Convierte una entidad del mapa recibida
 * desde la API a su representación de dominio.
 *
 * Backend → Dominio
 *
 * Este mapper es el ÚNICO lugar donde:
 * - Se decide qué es POI o STOP
 * - Se delega la conversión correcta
 */
export function mapEntityDTOToDomain(entity: MapEntityDTO) {
  switch (entity.type) {
    case "POI":
      return {
        kind: "POI",
        data: mapPOIDTOToPOI(entity),
      };

    case "STOP":
      return {
        kind: "STOP",
        data: mapStopDTOToStop(entity),
      };

    default:
      /**
       * Seguridad extra por si backend
       * envía algo inesperado
       */
      throw new Error(`Tipo de entidad no soportado: ${entity}`);
  }
}
