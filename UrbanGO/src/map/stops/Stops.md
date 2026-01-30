## StopsLayer (Capa de Paradas)

¿Qué es StopsLayer?

StopsLayer es la capa de Mapbox responsable de renderizar las paradas de transporte en el mapa.

Incluye:
- Renderizado de paradas individuales
- Clustering automático cuando hay muchas paradas cercanas
- Control de zoom mínimo para que aparezcan antes que otros POIs

**Responsabilidad principal**

> Convertir un GeoJSON de paradas en elementos visuales del mapa.

**SÍ hace**

Renderiza paradas usando ShapeSource
- Activa clustering
- Define cómo se ven:
 - clusters (círculo + número)
 - Paradas individuales (icono)

**NO hace**

- No transforma datos
- No conoce backend
- No hace fetch
- No decide qué ciudad se está viendo

```ts
export function StopsLayer() {
  const geojson = useStopsGeoJSON(stopsMock);

  if (!geojson.features.length) return null;

  return (
    <Mapbox.ShapeSource ...>
      {/* clusters */}
      {/* contador */}
      {/* paradas individuales */}
    </Mapbox.ShapeSource>
  );
}
```

**Fuente de datos**

```ts
const geojson = useStopsGeoJSON(stopsMock);
```
- StopsLayer NO recibe datos crudos
- Siempre recibe un GeoJSON válido
- La transformación ocurre en useStopsGeoJSON

> Si mañana los datos vienen del backend u offline cache, StopsLayer NO cambia.

**ShapeSource (núcleo de Mapbox)**

```ts
<Mapbox.ShapeSource
  id="stops-source"
  shape={geojson}
  cluster
  clusterRadius={50}
  clusterMaxZoomLevel={14}
>
```

**¿Qué hace cada cosa?**

| Propiedad             | Función                            |
| --------------------- | ---------------------------------- |
| `shape`               | GeoJSON con todas las paradas      |
| `cluster`             | Activa clustering automático       |
| `clusterRadius`       | Distancia (px) para agrupar puntos |
| `clusterMaxZoomLevel` | Zoom máximo donde aún hay clusters |

> A partir de zoom 14, Mapbox deja de agrupar y muestra paradas individuales.

**Capa de CLUSTERS (círculos)**

```ts
<Mapbox.CircleLayer
  id="stops-clusters"
  filter={["has", "point_count"]}
```

- Solo se aplica a features que representan clusters
- point_count es generado automáticamente por Mapbox

**Estilos**

```ts
circleRadius: 18
circleColor: "#2563eb"
```

Cambia aquí:
- Tamaño del cluster
- Color por ciudad / estado / modo oscuro

**Contador de paradas en cluster**

```ts
<Mapbox.SymbolLayer
  id="stops-cluster-count"
  filter={["has", "point_count"]}
```

- Se renderiza encima del círculo
- Muestra cuántas paradas hay agrupadas

```ts
textField: ["get", "point_count"]
```

Si quieres:
- Cambiar tipografía
- Cambiar color
- Ocultar números pequeños

se hace aquí.

**Paradas individuales**

```ts
<Mapbox.SymbolLayer
  id="stops-point"
  filter={["!", ["has", "point_count"]]}
  minZoomLevel={12}
```

**¿Qué significa?**

- Solo se renderiza cuando NO es cluster
- Aparecen desde zoom 12
- Se muestran todas cuando el usuario hace zoom

Icono

```ts
iconImage: "stop"
```

- "stop" debe existir en <Mapbox.Images />
- Muchas paradas → un solo icono

## useStopsGeoJSON (Hook de transformación)

**¿Qué es?**

useStopsGeoJSON es un hook puro de transformación.

> Convierte paradas (Stop[]) en un FeatureCollection <Point> compatible con Mapbox.

**Responsabilidad**

**SÍ hace**

- Convertir datos del dominio (Stop)
- Generar GeoJSON estándar
- Mantener performance con useMemo

**NO hace**

- No renderiza
- No conoce Mapbox
- No maneja zoom, estilos o clustering

**Firma del hook**

```ts
export function useStopsGeoJSON(
  stops: Stop[]
): FeatureCollection<Point>
```

Entrada:
- Array de paradas (Stop[])

Salida:
- GeoJSON listo para Mapbox

**Transformación clave**

```ts
coordinates: [stop.longitude, stop.latitude]
```

Regla inquebrantable:

> GeoJSON SIEMPRE usa [lng, lat]

Esto evita:
- Bugs visuales
- Paradas en el océano
- Errores silenciosos