# POIs (Points of Interest)

Esta carpeta contiene **toda la arquitectura relacionada con los Puntos de Interés (POIs)** que se muestran en el mapa.

El módulo de POIs está diseñado para crecer sin romperse cuando:
- Aumenten los POIs (cientos o miles)
- Se agreguen nuevas categorías
- Se integren múltiples ciudades
- Se conecte un backend real

---

Para una visión general del proyecto, ver el [README.md](../../../README.md)

---

## Objetivos del módulo

- ✅ Mantener una **arquitectura escalable**
- ✅ Separar **datos, lógica y renderizado**
- ✅ Facilitar la integración con **API backend**
- ✅ Evitar que el mapa se rompa cuando crezcan los datos
- ✅ Permitir que frontend y backend trabajen en paralelo

---

## Concepto clave

> **El mapa es solo una vista.**  
> **Los POIs son datos.**  
> **Nunca se mezclan.**

Esto significa que los POIs:

- ❌ NO se crean directamente en el mapa
- ❌ NO se renderizan manualmente uno por uno
- ❌ NO dependen del estilo del mapa
- ❌ NO conocen ciudades, backend ni API

Todo el sistema pasa por **capas bien definidas**.

---

## Estructura de carpetas

```txt
pois/
 ├─ api/
 │  └─ pois.api.ts
 ├─ services/
 │  └─ pois.service.ts
 ├─ data/
 │  └─ pois.mock.ts
 ├─ layers/
 │  └─ POIsLayer.tsx
 ├─ styles/
 │  └─ pois.styles.ts
 ├─ types/
    └─ poi.types.ts
```

---

## Responsabilidad de cada carpeta

### types/ (CONTRATO DEL SISTEMA)

**Archivo:** `poi.types.ts`

Define la estructura oficial de un POI.

- Es el **contrato entre frontend y backend**
- **NO debe romperse sin coordinación**
- Cualquier cambio aquí impacta todo el sistema

**IMPORTANTE**

- Coordinates SIEMPRE es [longitud, latitud]
- Category debe coincidir exactamente con los valores definidos
- No agregar categorías sin registrar iconos y estilos

### api/ (DEFINICIÓN DE ENDPOINTS)

**Archivo:** `pois.api.ts`

Define las rutas de la API.
No contiene lógica ni fetch.

```ts
export const POIS_API = {
  byCity: (cityId: string) => `/cities/${cityId}/pois`,
};
```

> Si cambia la URL del backend, solo se modifica aquí.

### services/ (COMUNICACIÓN CON BACKEND)

**Archivo:** `pois.service.ts`

Encapsula la comunicación HTTP.
- Maneja fetch o axios
- Aplica headers, auth, cache
- Devuelve datos ya tipados

```ts
export async function fetchPOIsByCity(cityId: string): Promise<POI[]> {
  const res = await fetch(POIS_API.byCity(cityId));
  return res.json();
}
```

> Nunca hacer fetch desde el mapa o las capas visuales.

### data/ (MOCK / DATOS TEMPORALES)

Archivo: pois.mock.ts
- Usado mientras el backend no está listo
- Permite avanzar frontend sin bloquearse
- Debe eliminarse cuando la API esté estable

### Hooks del mapa (ORQUESTACIÓN)

Los hooks NO viven dentro del módulo `pois`.

En este proyecto, los hooks están centralizados en:

map/hooks/

Motivo:
- El mapa es un sistema compuesto
- Los hooks orquestan múltiples dominios (POIs, cámara, ubicación, eventos)
- Evita duplicación y dependencias circulares

Ejemplo de hook consumidor de POIs:

map/hooks/useMapPOIs.ts

### layers/ (RENDERIZADO EN MAPBOX)

**Archivo:** `POIsLayer.tsx`

Responsabilidades:
- Convertir POIs a GeoJSON
- Renderizarlos con ShapeSource y SymbolLayer
- Filtrar por categoría y zoom

NO debe:
- Hacer fetch
- Tener datos hardcodeados
- Conocer ciudades o backend

### styles/ (CONFIGURACIÓN VISUAL)

**Archivo:** `pois.styles.ts`

Contiene solo valores visuales:
- Tamaños
- Zoom mínimo
- Overlap
- Escalado por zoom

> Permite ajustar diseño sin tocar lógica.

### Iconos de POIs

Los iconos se registran una sola vez en `MapViewBase` usando `Mapbox.Images`.

Regla:
- 1 icono por categoría
- Muchos POIs pueden usar el mismo icono

```ts
<Mapbox.Images
  images={{
    shop: require(".../poi-shop.png"),
    school: require(".../poi-school.png"),
    hospital: require(".../poi-hospital.png"),
    test: require(".../poi-test.png"),
  }}
/>
```

> El nombre del icono DEBE coincidir con `POICategory`.

## Reglas de crecimiento del módulo

- Agregar un POI NO debe requerir tocar capas ni estilos
- Agregar una categoría requiere:
  - Actualizar `POICategory`
  - Registrar icono
  - (Opcional) ajustar estilos

Si alguna de estas reglas se rompe, la arquitectura debe revisarse.





















