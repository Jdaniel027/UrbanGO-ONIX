/**
 * RouteDTO
 * --------------------------------
 * Ruta tal como viene del backend.
 *
 * Backend → Mapper → Dominio
 */
export interface RouteDTO {
  id: string;

  /**
   * Array de puntos en formato backend
   * [lat, lng]
   */
  points: [number, number][];
}
