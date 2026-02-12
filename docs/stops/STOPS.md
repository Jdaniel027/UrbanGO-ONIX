# Stops (Paradas de transporte)

El módulo de Stops se encarga de representar las paradas de camión en el mapa de forma escalable y fácil de extender.

---

## Objetivos del módulo

- ✅ Mostrar paradas de transporte de forma clara y legible.
- ✅ Agrupar paradas cercanas mediante clustering para evitar ruido visual.
- ✅ Mantener separadas las capas de renderizado, la transformación a GeoJSON y el dominio `Stop`.
- ✅ Facilitar el cambio de fuente de datos (mock → backend) sin romper el mapa.

---

## Estructura de carpetas

```txt
src/map/stops/
  ├─ api/
  │   └─ stops.api.ts
  ├─ data/
  │   ├─ stops.mapper.ts
  │   └─ stops.mock.tsx
  ├─ hooks/
  │   └─ useStopsGeoJSON.ts
  ├─ repository/
  │   └─ stops.repository.ts
  ├─ services/
  │   └─ stops.services.ts
  └─ types/
      ├─ stop.dto.ts
      └─ types.ts
```

---

## Contratos del dominio (types/)

**Archivo:** `types.ts`

Reglas:

- coordinates es SIEMPRE [longitud, latitud].
- Por ahora solo existe la categoría "bus", pero el modelo permite crecer.

```ts
export type StopCategory = "bus";

export interface Stop {
  id: string;
  name: string;
  category: StopCategory;
  coordinates: [number, number]; // [lng, lat]
}
```

**Archivo:** `stop.dto.ts`

- Representa cómo viene la parada desde backend o mocks genéricos.
- No se usa directamente en Mapbox; siempre pasa por el mapper.

```ts
export interface StopDTO {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "STOP";
}
```

---

## Mapeo Backend → Dominio (data/stops.mapper.ts)

`Responsabilidad: convertir StopDTO a Stop.`

Puntos clave:

- El frontend no depende del formato exacto del backend.
- Las coordenadas se normalizan a [lng, lat].
- La categoría se fija en "bus" para todas las paradas.

---

### Datos temporales (data/stops.mock.tsx)

**Archivo:** `stops.mock.tsx`

- Contiene un arreglo de Stop[] ya normalizados.
- Se usa mientras no existe backend o mientras se define el flujo real.

> Cuando el backend esté listo, este mock podrá eliminarse o moverse a __mock__ sin cambiar la capa ni el hook.

---

### Hook de transformación (hooks/useStopsGeoJSON.ts)

**Qué es**

useStopsGeoJSON es un hook puro de transformación:

> Convierte paradas (Stop[]) en un FeatureCollection<Point> compatible con Mapbox.

Responsabilidades (SÍ hace)

- Convertir datos de dominio (Stop) a GeoJSON estándar.
- Incluir propiedades útiles (id, name, category) para filtros/estilos.
- Optimizar rendimiento usando useMemo.

Lo que NO hace

- No renderiza.
- No conoce estilos ni zoom.
- No hace fetch ni habla con el backend.

**Regla clave**

- geometry.coordinates usa siempre stop.coordinates, que ya están en formato [lng, lat].

---

**Capa de mapa (StopsLayer)**

StopsLayer vive en src/map/layers/stops/StopsLayer.tsx y es la capa de Mapbox encargada de pintar las paradas.

**Responsabilidad principal**

> Tomar un GeoJSON de paradas y convertirlo en elementos visuales (clusters + puntos individuales).

**Que si hace**

- Usa ShapeSource con cluster activado.
- Define:
  - Círculos de cluster (CircleLayer).
  - Contador de paradas por cluster (SymbolLayer con point_count).
  - Paradas individuales (SymbolLayer con filtro !has point_count).

**Que no hace**

- No transforma datos (eso es trabajo de useStopsGeoJSON / mappers).
- No conoce el backend ni decide la ciudad actual.
- No decide qué paradas cargar; solo pinta las que recibe.

---

## Futuro: API, service y repository

**Por ahora:**

- stops.api.ts
- stops.services.ts
- stops.repository.ts

Pueden estar vacíos o con TODOs documentados.

**Rol esperado a futuro:**

- api/ define endpoints (/cities/:cityId/stops).
- services/ hace las llamadas HTTP y devuelve StopDTO[].
- repository/ decide la fuente (mock vs backend), aplica mapStopDTOToStop y entrega Stop[] a los hooks.

---

## Flujo de datos de Stops

**Resumen del flujo esperado:**

1. Fuente de datos

- Hoy: stops.mock.tsx (Stop[]).
- Futuro: stops.services.ts → StopDTO[].

2. Mapper (stops.mapper.ts)

- StopDTO → Stop con coordenadas normalizadas.

3. Dominio (Stop[])

- Estructura estable usada por el frontend.

4. Hook (useStopsGeoJSON)

- Stop[] → FeatureCollection<Point>.

5. Capa (StopsLayer)

- Usa el GeoJSON para renderizar clusters y paradas individuales en Mapbox.

---

**Regla de oro del módulo Stops**

> Datos (Stop / StopDTO) → Mapper → Hook (useStopsGeoJSON) → GeoJSON → StopsLayer → Mapbox.

---

- **[Volver al README principal](../../README.md)**
