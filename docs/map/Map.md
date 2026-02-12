# Documentación del Mapa

Este documento describe la arquitectura, estructura y responsabilidades del sistema de mapas de la aplicación.

El mapa es un **componente persistente** que sirve como base visual para el flujo principal de la app.

---

## Objetivo del mapa

El mapa tiene como propósito:

- Mostrar la ubicación del usuario
- Visualizar rutas de camiones
- Renderizar camiones en tiempo real
- Servir como base sobre la cual se muestran las pantallas del flujo principal

El mapa **NO cambia al navegar entre pantallas** del flujo `/main`.

---

## Arquitectura general

El mapa está diseñado siguiendo el principio de **separación de responsabilidades** y **arquitectura por dominios**.

```txt
Mapa Base (persistente)
├─ Core (MapView)
├─ camera
├─ location
├─ layers (Rutas, Camiones, POIs, Stops)
├─ events
├─ styles
└─ Hooks
```

---

## Estructura de archivos

```txt
src/map/
├─ __mock__/                 # Datos de prueba para el mapa
│   └─ mapEntities.mock.ts
│
├─ camera/                   # Configuración de cámara
│   └─ Camera.config.tsx
│
├─ core/                     # Núcleo del mapa
│   └─ MapViewBase.tsx
│
├─ data/                     # Adaptadores y mapeo genérico de entidades
│   ├─ map.adapter.ts
│   └─ map.mapper.ts
│
├─ event/
│   └─ mapEvent.ts           # Eventos globales del mapa
│
├─ hooks/
│   └─ useMapData.ts         # Hook principal que orquesta datos del mapa
│
├─ layers/                   # Capas visuales
│   ├─ pois/POIsLayer.tsx
│   ├─ routes/RoutesLayers.tsx
│   ├─ stops/StopsLayer.tsx
│   ├─ user/UserLayer.tsx
│   └─ vehicle/VehicleLayer.tsx
│
├─ location/
│   └─ UserLocation.tsx
│
├─ pois/                     # Dominio de POIs 
├─ routes/                   # Dominio de rutas
├─ stops/                    # Dominio de paradas
├─ vehicle/                  # Dominio de vehículos
│
├─ styles/
│   └─ mapStyles.ts          # Estilos visuales base del mapa
│
├─ types/
│   ├─ mapEntity.base.dto.ts
│   └─ mapEntity.dto.ts
│
└─ index.ts
```

---

## MapViewBase

Archivo: core/MapViewBase.tsx

Responsabilidades:
- Inicializa Mapbox con el access token
- Renderiza el MapView
- Aplica configuraciones globales del mapa
- Monta la cámara inicial
- core/MapViewBase.tsx

Notas importantes:
- Se renderiza una sola vez
- Vive dentro del layout de /main
- Las pantallas se renderizan encima del mapa
- No contiene lógica de negocio

---

## Camera

Archivo: camera/camera.config.tsx
Define la vista inicial del mapa:
- Zoom
- Coordenadas iniciales
- Inclinación (pitch)
- Animación inicial

> Las coordenadas usan el formato:
> [longitud, latitud]

---

## Ubicación del usuario

Archivo: location/UserLocation.tsx

Responsabilidades:
- Solicitud de permisos de ubicación
- Obtención de la posición GPS
- Seguimiento del usuario en tiempo real

Usos comunes:
- Centrar el mapa
- Navegación
- Mostrar posición actual

---

## Capas del mapa / layers

Las capas son componentes visuales puros.

### Rutas

Archivo: layers/routes/RoutesLayer.tsx

Renderiza rutas en el mapa usando coordenadas:
- Polylines
- GeoJSON
- Múltiples rutas

> No obtiene datos por sí mismo, solo los representa.

### Camiones

Archivo: layers/buses/BusLayer.tsx

Renderiza camiones/vehículos:
- Marcadores personalizados
- Actualización en tiempo real
- Rotación según dirección

---

## Eventos del mapa

Archivo: events/mapEvents.ts

Centraliza eventos del mapa:
- Movimiento de cámara
- Zoom
- Toques del usuario

Permite reaccionar cuando:
- El usuario mueve el mapa
- Se pierde el seguimiento
- Cambia la región visible

---

## Estilos del mapa

Archivo: styles/mapStyles.ts

Centraliza:
- Colores
- Tamaños
- Estilos visuales

Facilita:
- Cambios visuales
- Temas claros/oscuros
- Mantenimiento del diseña

---

## Hooks generales

Hooks generales:
- Estado de carga del mapa
- Sincronización de capas
- Eventos globales

> No contiene lógica específica de capas

---

## Dominios del mapa

Además de las capas, el mapa se organiza por dominios:

- `pois/` – Puntos de interés ([Documentacion en POIS](../pois/POIS.md)).
- `stops/` – Paradas de camión.
- `routes/` – Rutas de transporte.
- `vehicle/` – Vehículos en movimiento.

Cada dominio sigue un patrón similar: `api/`, `data/`, `repository/`, `services/`, `styles/`, `types/`, y expone datos listos para las capas del mapa.

---

## Qué NO debe hacerse

- ❌ No agregar lógica de negocio al mapa
- ❌ No manejar autenticación
- ❌ No consumir APIs directamente desde capas visuales
- ❌ No renderizar pantallas dentro del mapa

---

## Buenas prácticas

- Cada capa tiene una sola responsabilidad
- El mapa debe ser declarativo
- Los datos llegan desde servicios o estado global
- El mapa solo representa información

---

## Ciclo de vida del mapa

- El mapa se monta **una sola vez** al entrar al flujo `/main`
- No se desmonta al cambiar de pantalla
- Permanece activo mientras el usuario esté autenticado
- Se destruye únicamente al salir del flujo principal

Esto permite:
- Mantener estado del mapa (zoom, posición)
- Evitar recargas innecesarias
- Mejor rendimiento

---

## Relación con el sistema de navegación

- El mapa vive en `app/main/_layout.tsx`
- Las pantallas se renderizan usando `<Slot />`
- El mapa siempre queda **por debajo** de las pantallas

Jerarquía visual:

```txt
Mapa (fondo)
└─ Pantallas (encima)
```

---

## Flujo de datos

El mapa es un componente **pasivo**.

✔ Recibe datos desde:
- Estado global (store)
- Props
- Servicios externos ya procesados

❌ No debe:
- Llamar APIs
- Manejar lógica de negocio
- Modificar estado global

---

## Consideraciones de rendimiento

- El mapa es un componente pesado
- Debe evitarse cualquier re-render innecesario
- Las capas deben ser componentes aislados
- Las actualizaciones en tiempo real deben ser controladas

Recomendaciones:
- Usar memoización cuando sea necesario
- Separar capas dinámicas y estáticas

---

## Extensión futura del mapa

El diseño permite agregar fácilmente:
- Zonas geográficas
- Alertas
- Paradas
- Capas temporales
- Modo nocturno
- Heatmaps

Cada nueva funcionalidad:
- Vive en su propio archivo
- Se monta dentro del MapViewBase

---

## Errores comunes

- Pantalla negra → falta de estilo o token inválido
- Mapa no responde → MapView renderizado múltiples veces
- Lags → demasiadas capas en un solo componente
- Problemas Android → permisos de ubicación mal configurados

---

## Flujo de datos del mapa
(Despues va a ser un diagrama visual)

1. **Fuente de datos**
   - Actualmente: `__mock__/mapEntities.mock.ts` devuelve una lista de `MapEntityDTO` mezclados (POI, STOP, VEHICLE, etc.).
   - Futuro: llamadas reales a API.

2. **Tipos genéricos (`types/`)**
   - `mapEntity.dto.ts` y `mapEntity.base.dto.ts` definen cómo llegan las entidades desde backend/mocks.

3. **Adaptadores genéricos (`data/`)**
   - `map.mapper.ts` separa las entidades por tipo (POIs, Stops, Rutas, Vehículos).
   - `map.adapter.ts` transforma estas entidades genéricas en estructuras que cada dominio entiende.

4. **Dominios específicos (`pois/`, `stops/`, `routes/`, `vehicle/`)**
   - Cada dominio mapea sus DTO a tipos propios (POI, Stop, Route, Vehicle) y expone datos listos para el mapa.

5. **Hook principal (`useMapData.ts`)**
   - Orquesta toda la cadena:
     - Llama al mock o repositorios.
     - Usa los mappers de `data/` y de cada dominio.
     - Devuelve colecciones ya listas para las capas (`POIsLayer`, `StopsLayer`, etc.).

6. **Capas (`layers/`)**
   - Cada layer recibe solo los datos de su dominio en forma final (POI[], Stop[], etc.) y los pinta en el mapa.

---

- **[Volver al README principal](../../README.md)**
