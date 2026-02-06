import { POI } from "../types/poi.types";
import { POIDTO } from "../types/poi.dto";
import { mapPOICategory } from "./poiCategory.mapper";

/**
 * mapPOIDTOToPOI
 * --------------------------------
 * Convierte un POI recibido desde la API
 * al tipo POI del dominio de la aplicación.
 *
 * Backend → Dominio
 *
 * Responsabilidades:
 * ✅ Normalizar coordenadas (GeoJSON)
 * ✅ Asegurar tipos consistentes
 * ✅ Definir valores por defecto
 *
 * ❌ No hace requests
 * ❌ No aplica lógica de UI
 */
export function mapPOIDTOToPOI(dto: POIDTO): POI {
  return {
    /** ID estable dentro del sistema */
    id: dto.id,

    /** Nombre visible en mapa y listas */
    name: dto.name,

    /** Categoría validada y segura */
    category: mapPOICategory(dto.category),

    /**
     * Coordenadas en formato GeoJSON
     * ⚠️ SIEMPRE [longitud, latitud]
     */
    coordinates: [dto.lng, dto.lat],

    /**
     * Importancia por defecto.
     * Puede calcularse más adelante
     * (popularidad, rating, tipo, etc.)
     */
    importance: "high",
  };
}
