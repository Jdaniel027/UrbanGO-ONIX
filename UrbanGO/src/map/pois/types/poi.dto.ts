/**
 * POIDTO (Data Transfer Object)
 * --------------------------------
 * Representa un Point Of Interest tal como
 * es recibido desde la API del backend.
 *
 * ⚠️ Este tipo:
 * - NO se usa directamente en el mapa
 * - NO debe asumirse estable para siempre
 * - Puede cambiar según la fuente de datos (Google, Mapbox, etc.)
 *
 * Su único propósito es:
 * Backend → Mapper → Dominio (POI)
 */
export interface POIDTO {
  /** Identificador único en el backend */
  id: string;

  /** Nombre público del lugar */
  name: string;

  /**
   * Categoría tal como la define el backend.
   * Ej: "restaurant", "hospital", "school"
   *
   * Categoría cruda del backend.
   * ⚠️ No se puede usar directamente sin validar.
   */
  category: string;

  /** Latitud geográfica */
  lat: number;

  /** Longitud geográfica */
  lng: number;

  /**
   * Datos opcionales que el backend puede exponer
   * y que NO son necesarios para el mapa base,
   * pero sí para detalles o pantallas futuras.
   */
  openingHours?: string[];
  address?: string;
  updatedAt?: string;
}
