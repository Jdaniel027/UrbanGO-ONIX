import { useEffect, useState } from "react";
import { splitMapEntities } from "../data/map.adapter";
import { POI } from "@/src/map/pois/types/poi.types";
import { Stop } from "@/src/map/stops/types/types";

/**
 * useMapData
 * --------------------------------
 * Hook principal de datos del mapa.
 *
 * Responsabilidades:
 * - Obtener entidades del mapa (mock / API / cache)
 * - Adaptarlas a modelos de dominio
 * - Separar POIs y Stops
 * - Exponer datos listos para renderizar
 *
 * ❌ No conoce Mapbox
 * ❌ No renderiza
 * ❌ No contiene lógica de UI
 */
export function useMapData() {
  const [pois, setPois] = useState<POI[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        /**
         * 🔹 TEMPORAL (MOCK)
         * En producción será:
         * fetch("/api/map/entities")
         *  → response.json()
         */
        const module = await import("../__mock__/mapEntities.mock");
        const data = module.default;

        /**
         * 🛡 Defensa crítica
         * Nunca asumimos que backend/mock es correcto.
         */
        if (!Array.isArray(data)) {
          throw new Error("mapEntitiesMock no es un arreglo válido");
        }

        const { pois, stops } = splitMapEntities(data);

        if (!mounted) return;

        setPois(pois);
        setStops(stops);
      } catch (err) {
        console.error("Error cargando datos del mapa", err);

        if (mounted) {
          setError(err as Error);
          setPois([]);
          setStops([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { pois, stops, loading, error };
}
