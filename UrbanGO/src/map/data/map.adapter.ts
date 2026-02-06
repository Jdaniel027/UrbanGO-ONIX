/**
 * splitMapEntities
 * --------------------------------
 * Adaptador principal del mapa.
 *
 * Convierte una respuesta unificada de la API:
 *   MapEntityDTO[]
 *
 * En modelos de dominio separados:
 *   - POI[]
 *   - Stop[]
 *
 * API → Dominio
 */
import { MapEntityDTO } from "../types/mapEntity.dto";
import { mapPOIDTOToPOI } from "@/src/map/pois/data/poi.mapper";
import { mapStopDTOToStop } from "@/src/map/stops/data/stops.mapper";
import { POI } from "@/src/map/pois/types/poi.types";
import { Stop } from "@/src/map/stops/types/types";

export function splitMapEntities(data: MapEntityDTO[]): {
  pois: POI[];
  stops: Stop[];
} {
  if (!Array.isArray(data)) {
    throw new Error("Map entities debe ser un arreglo válido");
  }

  const pois: POI[] = [];
  const stops: Stop[] = [];

  for (const entity of data) {
    switch (entity.type) {
      case "POI": {
        pois.push(mapPOIDTOToPOI(entity));
        break;
      }

      case "STOP": {
        stops.push(mapStopDTOToStop(entity));
        break;
      }

      default: {
        // Esto SOLO pasa si el contrato API se rompe
        throw new Error(
          `Tipo de entidad no soportado: ${(entity as any).type}`,
        );
      }
    }
  }

  return { pois, stops };
}
