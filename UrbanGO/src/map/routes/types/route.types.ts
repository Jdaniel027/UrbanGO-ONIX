/**
 * Route (Dominio)
 * --------------------------------
 * Representa una ruta ya procesada
 * y lista para renderizarse en el mapa.
 */
export interface Route {
  /** ID estable de la ruta */
  id: string;

  /**
   * Coordenadas normalizadas (GeoJSON)
   * ⚠️ [lng, lat]
   */
  coordinates: [number, number][];

  /**
   * Tipo de ruta
   * (para estilos y lógica futura)
   */
  type: "SUGGESTED" | "ACTIVE" | "EXPLORER";
}
