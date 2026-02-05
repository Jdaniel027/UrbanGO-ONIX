import { POIDTO } from "@/src/map/pois/types/poi.dto";
import { StopDTO } from "@/src/map/stops/types/stop.dto";
import { BaseMapEntityDTO } from "./mapEntity.base.dto";

/**
 * MapPOIDTO
 * --------------------------------
 * POI extendido con discriminador de tipo.
 */
export interface MapPOIDTO extends POIDTO, BaseMapEntityDTO {
  type: "POI";
}

/**
 * MapStopDTO
 * --------------------------------
 * Stop extendido con discriminador de tipo.
 */
export interface MapStopDTO extends StopDTO, BaseMapEntityDTO {
  type: "STOP";
}

/**
 * MapEntityDTO
 * --------------------------------
 * Entidad unificada recibida desde la API
 * del mapa.
 *
 * Este tipo permite:
 * - discriminated unions
 * - type narrowing seguro
 * - separación limpia de lógica
 */
export type MapEntityDTO = MapPOIDTO | MapStopDTO;
