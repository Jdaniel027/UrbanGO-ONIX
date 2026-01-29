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
├─ Cámara
├─ Ubicación del usuario
├─ Capas (Rutas, Camiones)
├─ Eventos
├─ Estilos
└─ Hooks
```

##Estructura de archivos

```txt
src/map/
├─ core/
│  └─ MapViewBase.tsx        → Contenedor principal del mapa
│
├─ camera/
│  └─ camera.config.ts       → Configuración inicial de cámara
│
├─ location/
│  ├─ UserLocation.tsx       → Render de la ubicación del usuario
│  └─ useUserLocation.ts     → Lógica de permisos y GPS
│
├─ layers/
│  ├─ buses/
│  │  ├─ BusLayer.tsx        → Render de camiones
│  │  └─ useBusData.ts       → Datos de camiones
│  │
│  └─ routes/
│     ├─ RoutesLayer.tsx     → Render de rutas
│     └─ routes.types.ts     → Tipos de rutas
│
├─ events/
│  └─ mapEvents.ts           → Eventos del mapa
│
├─ styles/
│  └─ mapStyles.ts           → Estilos visuales del mapa
│
├─ hooks/
│  └─ useMapReady.ts         → Hooks generales del mapa
│
└─ index.ts                  → Punto de exportación del módulo
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

## Camera

Archivo: camera/camera.tsx
Define la vista inicial del mapa:
- Zoom
- Coordenadas iniciales
- Inclinación (pitch)
- Animación inicial

> Las coordenadas usan el formato:
> [longitud, latitud]

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

## Capas del mapa

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

## Hooks generales

Hooks generales:
- Estado de carga del mapa
- Sincronización de capas
- Eventos globales

> No contiene lógica específica de capas

## Qué NO debe hacerse

- ❌ No agregar lógica de negocio al mapa
- ❌ No manejar autenticación
- ❌ No consumir APIs directamente desde capas visuales
- ❌ No renderizar pantallas dentro del mapa

## Buenas prácticas

- Cada capa tiene una sola responsabilidad
- El mapa debe ser declarativo
- Los datos llegan desde servicios o estado global
- El mapa solo representa información

## ## Ciclo de vida del mapa

- El mapa se monta **una sola vez** al entrar al flujo `/main`
- No se desmonta al cambiar de pantalla
- Permanece activo mientras el usuario esté autenticado
- Se destruye únicamente al salir del flujo principal

Esto permite:
- Mantener estado del mapa (zoom, posición)
- Evitar recargas innecesarias
- Mejor rendimiento

## Relación con el sistema de navegación

- El mapa vive en `app/main/_layout.tsx`
- Las pantallas se renderizan usando `<Slot />`
- El mapa siempre queda **por debajo** de las pantallas

Jerarquía visual:

```txt
Mapa (fondo)
└─ Pantallas (encima)
```

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

## Consideraciones de rendimiento

- El mapa es un componente pesado
- Debe evitarse cualquier re-render innecesario
- Las capas deben ser componentes aislados
- Las actualizaciones en tiempo real deben ser controladas

Recomendaciones:
- Usar memoización cuando sea necesario
- Separar capas dinámicas y estáticas

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

## Errores comunes

- Pantalla negra → falta de estilo o token inválido
- Mapa no responde → MapView renderizado múltiples veces
- Lags → demasiadas capas en un solo componente
- Problemas Android → permisos de ubicación mal configurados
