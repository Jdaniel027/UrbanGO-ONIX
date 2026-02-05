/**
 * StopDTO
 * --------------------------------
 * Representa una parada tal como viene
 * desde la API del backend.
 *
 * ⚠️ Este tipo NO se usa directamente en el mapa.
 */
export interface StopDTO {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "STOP";
}
