import { POI } from "../types/poi.types";
import { POIDTO } from "../types/poi.dto";

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

    /**
     * Cast temporal.
     * En el futuro se recomienda:
     * - Validar categorías
     * - O mapear backend → POICategory
     */
    category: dto.category as any,

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
