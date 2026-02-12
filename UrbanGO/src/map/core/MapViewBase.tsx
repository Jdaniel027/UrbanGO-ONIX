/**
 * MapViewBase
 * -------------
 * Este componente representa el MAPA PRINCIPAL de la aplicación.
 *
 * 🔹 Se renderiza UNA SOLA VEZ dentro del layout de /main.
 * 🔹 Permanece vivo mientras el usuario navega entre pantallas del flujo principal.
 * 🔹 Todas las pantallas se renderizan POR ENCIMA del mapa.
 *
 * Responsabilidades:
 * - Inicializar Mapbox con el access token
 * - Renderizar el MapView base
 * - Aplicar configuraciones globales del mapa (estilo, UI, 3D, controles)
 * - Definir la cámara inicial (posición, zoom, pitch)
 *
 * ❗ NO debe contener lógica de negocio ni datos dinámicos
 * ❗ Rutas, marcadores, camiones, etc. se agregan en componentes separados
 *
 * Las capas del mapa (ubicación, rutas, buses, eventos)
 * se agregan mediante componentes separados.
 */

import Mapbox from "@rnmapbox/maps";
import { StyleSheet } from "react-native";

import { MapCamera } from "../camera/Camera.config";
import { UserLocation } from "../location/UserLocation";

import { POIsLayer } from "../layers/pois/POIsLayer";
import { StopsLayer } from "../layers/stops/StopsLayer";
import { RoutesLayer } from "../layers/routes/RoutesLayers";
import { VehicleLayer } from "../layers/vehicle/VehicleLayer";

import { POICategory } from "../pois/types/poi.types";
import { mockVehicles } from "../vehicle/data/vehicle.mock";

import { MapMode } from "../core/mapMode.types";
import { MAP_CONFIG_BY_MODE } from "../core/mapConfig";

import { useMapData } from "../hooks/useMapData";
import { useRoutes } from "../routes/hooks/useRoutes";

// Inicializa Mapbox con el token definido en variables de entorno en el .env
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN!);

interface MapViewBaseProps {
  mapMode: MapMode;
}

export function MapViewBase({ mapMode }: MapViewBaseProps) {
  const { pois, stops, loading } = useMapData();

  const config =
    MAP_CONFIG_BY_MODE[mapMode] ?? MAP_CONFIG_BY_MODE["SELECT_POINTS"];

  const routes = useRoutes();

  if (loading || !config) return null;

  // Esta constante define que categorias de POIS se muestran en el mapa
  const visibleCategories: POICategory[] = [
    "restaurant",
    "hospital",
    "school",
    "shop",
  ];

  return (
    <Mapbox.MapView
      style={StyleSheet.absoluteFill}
      /**
       * Estilo base del mapa.
       * Puede cambiarse por un estilo personalizado de Mapbox Studio.*/
      styleURL="mapbox://styles/joose027/cml45nfc3000s01r86i4i5823"
      /**
       * Deshabilita elementos visuales que no necesitamos
       * para una UI más limpia. */
      scaleBarEnabled={false}
      logoEnabled={false}
      compassEnabled={false}
      attributionEnabled={false}
      /** Habilita vista 3D para futuras animaciones. */
      pitchEnabled={true}
      rotateEnabled={true}
      scrollEnabled={true}
      zoomEnabled={true}
    >
      {/**
       * Registro de imágenes para Mapbox.
       * El nombre ("test") debe coincidir con:
       * properties.icon en los POIs.
       */}
      <Mapbox.Images
        images={{
          // test: require("@/assets/images/map/icons/light/poiEjemplo.png"),
          restaurant: require("@/assets/images/map/icons/light/poiRestaurant.png"),
          hospital: require("@/assets/images/map/icons/light/poiHospital.png"),
          school: require("@/assets/images/map/icons/light/poiSchool.png"),
          shop: require("@/assets/images/map/icons/light/poiShop.png"),
          stop: require("@/assets/images/map/icons/light/poiStop.png"),
          bus: require("@/assets/images/map/icons/light/bus.png"),
        }}
      />
      {/* Capa de rutas */}
      {config.showRoutes !== "NONE" && <RoutesLayer routes={routes} />}
      {/* Capa de POIs */}
      {config.showPois && (
        <POIsLayer pois={pois} visibleCategories={visibleCategories} />
      )}
      {/* Capa de paradas */}
      {config.showStops !== "NONE" && <StopsLayer stops={stops} />}
      {/* Capa de vehículos */}
      {config.showVehicles && <VehicleLayer vehicles={mockVehicles} />}
      {/* Cámara inicial del mapa */}
      <MapCamera />
      {/* Ubicación del usuario */}
      <UserLocation />
    </Mapbox.MapView>
  );
}
