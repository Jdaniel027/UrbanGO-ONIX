import { useEffect, useState } from "react";
import { Route } from "../types/route.types";
import { routesMock } from "../data/routes.mock";

/**
 * useRoutes
 * --------------------------------
 * Hook de obtención de rutas.
 *
 * Hoy:
 * - Usa datos mock
 *
 * Mañana:
 * - fetch("/api/map/routes")
 * - mapRouteDTOToRoute
 */
export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    // mock temporal
    setRoutes(routesMock);
  }, []);

  return routes;
}
