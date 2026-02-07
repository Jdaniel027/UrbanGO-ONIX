import { Route } from "../types/route.types";

/**
 * routesMock
 * --------------------------------
 * Rutas simuladas para desarrollo local.
 *
 * ⚠️ Usa el formato de DOMINIO (Route),
 * no DTO, igual que POIs y Stops.
 *
 * Esto garantiza que:
 * - El backend se pueda conectar sin cambios
 * - Las capas de Mapbox no dependan de mocks
 */
export const routesMock: Route[] = [
  {
    id: "route-1",
    type: "SUGGESTED",
    coordinates: [
      [-108.486451, 25.566776],
      [-108.485875, 25.566631],
      [-108.485441, 25.566572],
      [-108.48454, 25.566598],
      [-108.483481, 25.566674],
      [-108.482788, 25.566798],
      [-108.481606, 25.567084],
      [-108.481083, 25.565312],
    ],
  },
];
