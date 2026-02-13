# Routes (Rutas de transporte)

El módulo de Routes se encarga de mostrar rutas ya calculadas y limpias en el mapa, sin recalcular caminos en el frontend.

---

## Objetivos del módulo

- ✅ Mostrar rutas de camión en el mapa de forma clara y performante.
- ✅ Separar el cálculo/normalización de rutas (backend) del consumo en la app.
- ✅ Mantener un modelo de dominio (`Route`) estable, independiente del backend.
- ✅ Permitir cambiar la fuente (mock → API real) sin tocar las capas de Mapbox.

---

## Estructura de carpetas

```txt
src/map/routes/
  ├─ data/
  │   ├─ route.mapper.ts      # RouteDTO -> Route
  │   └─ routes.mock.ts       # Rutas de dominio para desarrollo
  ├─ hooks/
  │   ├─ useRoutes.ts         # Obtiene rutas (hoy: mock)
  │   └─ useRoutesGeoJSON.ts  # Route[] -> GeoJSON (LineString)
  ├─ styles/
  │   └─ route.styles.ts      # Estilos por tipo de ruta
  └─ types/
      ├─ route.dto.ts         # Formato crudo desde backend
      └─ route.types.ts       # Modelo de dominio
```

> En el mapa, las rutas se renderizan desde src/map/layers/routes/RoutesLayers.tsx y se conectan a MapViewBase.

---

## Contratos del dominio (types/)

**route.types.ts – Dominio**

```ts
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
```

- coordinates está listo para usarse en un LineString.
- type permite aplicar estilos distintos (ruta sugerida, activa, de exploración, etc.).

**route.dto.ts – DTO del backend**

```ts
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
```

- Representa cómo llega la ruta desde el backend.
- El orden de coordenadas es distinto y debe normalizarse.