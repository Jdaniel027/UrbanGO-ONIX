/**
 * MapEntityType
 * --------------------------------
 * Define los tipos de entidades
 * que pueden existir dentro del mapa.
 *
 * ⚠️ Este enum/string union debe
 * mantenerse sincronizado con backend.
 */
export type MapEntityType = "POI" | "STOP";

/**
 * BaseMapEntityDTO
 * --------------------------------
 * Contrato base que TODA entidad del mapa
 * debe cumplir cuando viene del backend.
 *
 * ❌ No define coordenadas
 * ❌ No define categoría
 * ❌ No define render
 *
 * Solo identifica el tipo de entidad.
 */
export interface BaseMapEntityDTO {
  /** Tipo de entidad para discriminación */
  type: MapEntityType;
}
