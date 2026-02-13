# Project Roadmap - UrbanGO-ONIX

> **Última actualización:** 2026-02-12  
> **Estado del proyecto:** Fase de Arquitectura → MVP  
> **Equipo:** 4 desarrolladores 

---

## Estado Actual

### Completado
- [x] Documentación de arquitectura del mapa
- [x] Sistema de capas (POIs, Routes, Stops, Vehicle)
- [x] Estructura de carpetas y convenciones
- [x] Configuración de Mapbox
- [x] Diseño UI/UX completo (~40 pantallas)

### En Progreso
- [ ] Infraestructura base (constants, utils, store, components UI)
- [ ] Sistema de testing
- [ ] Contratos de API y mocks

### Pendiente
- [ ] Implementación de pantallas del MVP
- [ ] Integración con backend
- [ ] Testing end-to-end
- [ ] Deployment a producción

---

## Fases del Proyecto

### **FASE 1: Infraestructura Base** (Semanas 1-3)
**Objetivo:** Sentar las bases técnicas para desarrollo paralelo eficiente

#### Sprint 1.1: Configuración Inicial (Semana 1)
- **Testing & CI/CD**
  - [ ] Configurar Jest + React Native Testing Library
  - [ ] Crear estructura de tests (`tests/components`, `tests/hooks`, `tests/services`)
  - [ ] Escribir tests de ejemplo para mappers
  - [ ] Configurar GitHub Actions (lint + tests en PRs)
  - [ ] Documentar guía de testing (`docs/testing/TESTING_GUIDE.md`)

- **Estado Global**
  - [ ] Configurar Zustand (recomendado: ligero y simple)
  - [ ] Crear stores base:
    - `userStore` (ubicación, preferencias)
    - `routeStore` (rutas seleccionadas, destinos)
    - `mapStore` (estado del mapa, modo de visualización)
  - [ ] Documentar uso de stores

- **Constants & Utils**
  - [ ] Crear `src/constants/colors.ts` (tema de colores del diseño)
  - [ ] Crear `src/constants/config.ts` (configuración tipada del .env)
  - [ ] Crear `src/utils/formatters.ts` (fechas, distancias, horarios)
  - [ ] Crear `src/utils/validators.ts` (validación de búsquedas, coordenadas)

#### Sprint 1.2: Componentes UI Base (Semana 2)
- **Biblioteca de Componentes**
  - [ ] `Button` (primario, secundario, outline, disabled)
  - [ ] `Input` (texto, búsqueda con icono)
  - [ ] `Card` (para rutas, horarios)
  - [ ] `BottomSheet` (modal desde abajo)
  - [ ] `RouteCard` (tarjeta de ruta con horario)
  - [ ] `Chip` (etiquetas de filtros)
  - [ ] `LoadingSpinner`
  - [ ] `ErrorBoundary`

- **Tests de Componentes**
  - [ ] Tests básicos para cada componente UI
  - [ ] Snapshot tests

#### Sprint 1.3: API & Mocks (Semana 3)
- **Contratos de API**
  - [ ] Documentar en `docs/api/API.md`:
    - Endpoints esperados del backend
    - Formato de requests/responses
    - Códigos de error
  - [ ] Crear `src/types/api.types.ts` (tipos globales de API)

- **Sistema de Mocks Robusto**
  - [ ] `src/services/api/apiClient.ts` (cliente HTTP con interceptors)
  - [ ] `src/services/api/mockService.ts` (servicio de mocks centralizado)
  - [ ] Flag de entorno para activar/desactivar mocks
  - [ ] Mocks para:
    - Búsqueda de destinos (geocoding)
    - Cálculo de rutas optimizadas
    - Horarios de rutas
    - Tracking de vehículos en tiempo real

- **Servicios Base**
  - [ ] `src/services/geocoding.service.ts`
  - [ ] `src/services/routing.service.ts`
  - [ ] `src/services/schedule.service.ts`
  - [ ] `src/services/tracking.service.ts`

---

### **FASE 2: MVP - Funcionalidades Críticas** (Semanas 4-8)

#### Sprint 2.1: Búsqueda y Destino (Semana 4)
**Pantallas del diseño:** 1-5 (búsqueda de destino)

- [ ] Pantalla inicial con mapa y botón "Marcar tu destino"
- [ ] Modal de búsqueda con autocompletado
- [ ] Manejo de permisos de ubicación
- [ ] Marcador en el mapa del destino seleccionado
- [ ] Botón "Ver rutas disponibles"
- [ ] Tests: búsqueda, permisos, selección de destino

**Componentes a crear:**
- `SearchModal.tsx`
- `DestinationMarker.tsx`
- `LocationPermissionHandler.tsx`

**Store:**
- `searchStore` (query, resultados, destino seleccionado)

#### Sprint 2.2: Cálculo y Visualización de Rutas (Semana 5)
**Pantallas del diseño:** 6-15 (rutas disponibles, comparación)

- [ ] Pantalla de rutas disponibles (lista de opciones)
- [ ] Visualización de múltiples rutas en el mapa
- [ ] Comparación de rutas (tiempo, distancia, costo)
- [ ] Selección de ruta preferida
- [ ] Mostrar ruta completa en el medio de la pantalla
- [ ] Tests: cálculo de rutas, comparación, selección

**Componentes a crear:**
- `RoutesList.tsx`
- `RouteComparison.tsx`
- `RouteDetailSheet.tsx`

**Integración:**
- Conectar `routing.service.ts` con store
- Adaptar respuesta del mock/API a formato interno

#### Sprint 2.3: Información Detallada de Rutas (Semana 6)
**Pantallas del diseño:** 16-30 (detalle de ruta, horarios, paradas)

- [ ] Pantalla de detalle de ruta (nombre, horarios)
- [ ] Lista de paradas con distancias
- [ ] Información de horarios (primer/último camión)
- [ ] Sistema de filtros (color, horario)
- [ ] Favoritos (opcional para MVP)
- [ ] Tests: detalle de ruta, filtros, horarios

**Componentes a crear:**
- `RouteDetailScreen.tsx`
- `StopsList.tsx`
- `ScheduleInfo.tsx`
- `FilterSheet.tsx`

**Store:**
- Extender `routeStore` con detalle y filtros

#### Sprint 2.4: Tracking en Tiempo Real (Semana 7)
**Pantallas del diseño:** Tracking de vehículo en mapa

- [ ] Visualización del camión en tiempo real
- [ ] Actualización de posición (polling o WebSocket)
- [ ] Estimación de tiempo de llegada
- [ ] Notificaciones de proximidad
- [ ] Tests: tracking, actualizaciones, ETA

**Componentes a crear:**
- `VehicleTracker.tsx`
- `ETABanner.tsx`
- `ProximityNotification.tsx`

**Integración:**
- Conectar `tracking.service.ts`
- Implementar polling/WebSocket según backend

#### Sprint 2.5: Pulido y Testing Integral (Semana 8)
- [ ] Testing end-to-end del flujo completo
- [ ] Corrección de bugs identificados
- [ ] Optimización de performance (memoización, lazy loading)
- [ ] Accessibility básico (labels, contraste)
- [ ] Documentación de componentes creados
- [ ] Preparar demo para stakeholders

---

### **FASE 3: Integración Backend** (Semanas 9-11)

#### Sprint 3.1: Migración de Mocks a API Real (Semana 9-10)
- [ ] Validar contratos de API con equipo backend
- [ ] Reemplazar mocks por llamadas reales:
  - Geocoding
  - Routing
  - Schedule
  - Tracking
- [ ] Manejo de errores de red
- [ ] Loading states y retry logic
- [ ] Tests de integración con backend

#### Sprint 3.2: Sincronización y Estados (Semana 11)
- [ ] Sincronización de estado con backend
- [ ] Caché de rutas frecuentes
- [ ] Manejo de offline mode (opcional)
- [ ] Validación de datos del backend
- [ ] Logging y monitoreo de errores

---

### **FASE 4: Características Adicionales** (Semanas 12-15)

#### Sprint 4.1: Autenticación (si es requerida)
- [ ] Login/Registro
- [ ] Guardar rutas favoritas
- [ ] Historial de búsquedas
- [ ] Preferencias de usuario

#### Sprint 4.2: Features Secundarios
- [ ] Sistema de notificaciones push
- [ ] Compartir rutas
- [ ] Reporte de incidencias
- [ ] Modo nocturno

#### Sprint 4.3: Optimización y Performance
- [ ] Performance audit
- [ ] Reducción de bundle size
- [ ] Optimización de renders
- [ ] Profiling de memoria

---

### **FASE 5: Preparación para Producción** (Semanas 16-18)

#### Sprint 5.1: Testing y QA
- [ ] Tests E2E completos
- [ ] Testing en dispositivos reales
- [ ] Testing de performance
- [ ] Security audit
- [ ] Corrección de bugs críticos

#### Sprint 5.2: Deployment
- [ ] Configurar variables de entorno de producción
- [ ] Generar APK/AAB firmado
- [ ] Testing en ambiente de staging
- [ ] Documentar proceso de deployment
- [ ] Crear CHANGELOG v1.0.0

#### Sprint 5.3: Lanzamiento
- [ ] Publicar en Google Play Store (interno/beta)
- [ ] Monitoreo de errores (Sentry/Firebase Crashlytics)
- [ ] Recopilar feedback de usuarios beta
- [ ] Planear iteraciones post-MVP

---

## Definición de MVP (Minimum Viable Product)

### Funcionalidades Incluidas
 Búsqueda de destino (autocompletado)  
 Cálculo de rutas optimizadas  
 Visualización de múltiples rutas en mapa  
 Comparación de rutas (tiempo, distancia)  
 Información detallada de rutas (horarios, paradas)  
 Tracking en tiempo real del camión  
 Estimación de tiempo de llegada  

### Funcionalidades Excluidas del MVP (v2.0+)
 Autenticación de usuarios  
 Rutas favoritas  
 Historial de búsquedas  
 Notificaciones push  
 Compartir rutas  
 Modo nocturno  
 Modo offline  

---

## Recursos y Referencias

- [Documentación de arquitectura](../architecture/)
- [Guía de contribución](../CONTRIBUTING.md)
- [Estándares de código](../guides/CODING_STANDARDS.md)
- [Setup de desarrollo](../setup/DEVELOPMENT_SETUP.md)
- [Contratos de API](../api/API.md)

---

**Notas:**
- Este roadmap es flexible y se ajustará según feedback y cambios de prioridad
- Las semanas son estimadas basadas en 1 dev full-time equivalente
- Priorizar calidad sobre velocidad (según timeline definido)
- Comunicación constante entre frontend y backend para alinear contratos
