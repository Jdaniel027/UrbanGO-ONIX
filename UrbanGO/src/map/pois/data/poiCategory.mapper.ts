import { POICategory } from "../types/poi.types";

/**
 * POI Category Mapper
 * --------------------------------
 * Convierte categorías externas (Google / backend)
 * en categorías internas soportadas por la app.
 *
 * ⚠️ NUNCA usar directamente dto.category
 */
const POI_CATEGORY_MAP: Record<string, POICategory> = {
  restaurant: "restaurant",
  food: "restaurant",
  cafe: "restaurant",

  hospital: "hospital",
  clinic: "hospital",

  school: "school",
  university: "school",

  shop: "shop",
  store: "shop",
};

/**
 * mapPOICategory
 * --------------------------------
 * Devuelve una categoría válida del dominio.
 *
 * Si la categoría no existe:
 * - se asigna una categoría segura por defecto
 * - se evita romper el mapa
 */
export function mapPOICategory(rawCategory: string): POICategory {
  const normalized = rawCategory.toLowerCase();

  if (__DEV__ && !POI_CATEGORY_MAP[normalized]) {
    console.warn(`[POI] Categoría desconocida: "${rawCategory}"`);
  }

  return POI_CATEGORY_MAP[normalized] ?? "shop";
  //   return POI_CATEGORY_MAP[rawCategory.toLowerCase()] ?? "shop";
}
