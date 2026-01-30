/**
 * POI (Point of Interest) Types
 * --------------------------------
 * Define la estructura base de un POI dentro del sistema.
 *
 * Este tipo se usa en:
 * - Datos locales (mock)
 * - Capas de Mapbox
 * - Futuras respuestas de API
 *
 * Centralizar los tipos aquí evita:
 * ❌ POIs incompletos
 * ❌ Propiedades mal escritas
 * ❌ Errores difíciles de rastrear
 */

export type POICategory =
  | "restaurant"
  | "hospital"
  | "school"
  | "shop"
  | "stop"; // paradas

export interface POI {
  /**
   * Identificador único del POI.
   * Debe ser estable y no depender de la posición. */
  id: string;
  /**
   * Nombre descriptivo del POI.
   * Puede usarse para popups, listas o detalles. */
  name: string;
  /**
   * Categoría del POI.
   * Se utiliza para:
   * - Seleccionar iconos
   * - Filtrar POIs
   * - Aplicar estilos distintos
   */
  category: POICategory;
  /**
   * Coordenadas geográficas del POI.
   * IMPORTANTE: [longitud, latitud]
   */
  coordinates: [number, number];

  // Futuro (cuando backend exista)
  // cityId?: string;
  // updatedAt?: string;
}
