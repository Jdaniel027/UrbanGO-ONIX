# 🎨 Análisis del Diseño UI - UrbanGO-ONIX

> **Basado en:** Frame 1.png (diseño completo de la app)  
> **Fecha de análisis:** 2026-02-12  
> **Total de pantallas:** ~40 estados/variaciones

---

## 📱 Resumen del Diseño

El diseño muestra un **flujo completo** de la aplicación móvil UrbanGO, desde la búsqueda de destino hasta la selección de ruta con información detallada.

### Características Generales del Diseño

- **Plataforma:** Mobile (formato portrait)
- **Estilo:** Moderno, limpio, minimalista
- **Colores principales:** 
  - Azul primario (botones CTA)
  - Rutas con colores distintivos (azul, rosa, amarillo, naranja, marrón)
  - Fondo blanco/gris claro
  - Texto negro/gris oscuro
- **Componentes:** Bottom sheets, cards, listas, mapas, teclado móvil

---

## 🔍 Análisis por Secciones del Flujo

### 1. Búsqueda de Destino (Pantallas 1-5)

#### Pantalla Inicial
**Elementos:**
- Mapa de fondo (Mapbox)
- Marcador de ubicación actual (azul)
- Botón flotante "Marcar tu destino" (azul, bottom)

**Componentes a crear:**
- `MapViewBase` (ya existe)
- `FloatingButton` (CTA principal)
- `UserLocationMarker` (ya existe en UserLocation.tsx)

---

#### Modal de Búsqueda (con teclado)
**Elementos:**
- Bottom sheet modal
- Input de búsqueda "¿A dónde vas?"
- Placeholder: "Ej: Plaza Sendero, Casa, Trabajo"
- Teclado móvil visible
- Lista de sugerencias debajo del input

**Componentes a crear:**
- `SearchModal` (bottom sheet)
- `SearchInput` (con icono de búsqueda)
- `SearchSuggestionsList`
- `SearchSuggestionItem`

**Interacciones:**
- Auto-completado mientras escribe
- Sugerencias en tiempo real
- Selección de sugerencia cierra el teclado

---

#### Resultados de Búsqueda
**Elementos:**
- Bottom sheet expandido
- Lista de resultados con:
  - Icono de ubicación
  - Nombre del lugar (bold)
  - Dirección completa (gris)
  - Distancia desde ubicación actual

**Componentes a crear:**
- `SearchResultsList`
- `SearchResultItem` con:
  - `LocationIcon`
  - `PlaceName` (Typography)
  - `PlaceAddress` (Typography secondary)
  - `Distance` (badge)

---

#### Destino Marcado en Mapa
**Elementos:**
- Mapa con 2 marcadores:
  - Ubicación actual (azul)
  - Destino seleccionado (naranja)
- Línea punteada conectando ambos puntos
- Bottom sheet minimizado con:
  - Nombre del destino
  - Botón "Ver rutas disponibles" (azul, full width)

**Componentes a crear:**
- `DestinationMarker` (marcador naranja)
- `RoutePreviewLine` (línea punteada)
- `DestinationSheet` (bottom sheet compacto)
- `CTAButton` (botón de acción principal)

---

### 2. Selección de Ruta (Pantallas 6-15)

#### Lista de Rutas Disponibles
**Elementos:**
- Bottom sheet con lista de rutas
- Cada card de ruta muestra:
  - Nombre de la ruta (ej: "Lomas", "Cambio")
  - Horario (ej: "15 min")
  - Indicador visual de la ruta (línea de color)
  - Precio (opcional)

**Componentes a crear:**
- `RoutesList` (lista scrolleable)
- `RouteCard` con:
  - `RouteName`
  - `RouteSchedule`
  - `RouteIndicator` (línea de color)
  - `RoutePrice` (badge)

**Estados:**
- Route card normal
- Route card seleccionada (resaltada)
- Route card con múltiples opciones

---

#### Comparación de Rutas en Mapa
**Elementos:**
- Mapa mostrando múltiples rutas simultáneamente
- Cada ruta con color distintivo:
  - Azul
  - Rosa
  - Amarillo
  - Naranja
  - Marrón
- Marcadores de paradas en cada ruta
- Bottom sheet con resumen de rutas

**Componentes a crear:**
- `MultipleRoutesLayer` (mostrar varias rutas)
- `RouteStopsMarkers` (marcadores de paradas)
- `RouteComparison` (bottom sheet de comparación)

**Observaciones del diseño:**
- Las rutas se superponen en el mapa
- Cada ruta tiene transparencia para ver todas
- Los marcadores de paradas son pequeños círculos del color de la ruta

---

#### Pantalla "Muestra en el medio de la pantalla la ruta completa"
**Elementos:**
- Pantalla naranja (overlay/toast)
- Mensaje centrado
- Parece ser una instrucción o estado de carga

**Componentes a crear:**
- `InstructionOverlay` (mensaje centrado)
- `RouteLoadingState`

---

### 3. Detalle de Ruta (Pantallas 16-30)

#### Información de la Ruta - Header
**Elementos:**
- Card superior con:
  - Nombre de la ruta (ej: "Lomas")
  - Horarios:
    - Primer camión (ej: "Primer: 6:10 AM")
    - Último camión (ej: "Último: 9:11 PM")
  - Indicador de frecuencia (ej: "Cada 15 minutos")

**Componentes a crear:**
- `RouteDetailHeader` con:
  - `RouteName` (grande, bold)
  - `RouteSchedule` (horarios)
  - `RouteFrequency` (badge)

---

#### Lista de Paradas
**Elementos:**
- Lista scrolleable de paradas con:
  - Icono de parada (círculo con borde)
  - Nombre de la parada
  - Distancia o tiempo desde parada anterior
  - Línea vertical conectando paradas (color de la ruta)

**Estados diferentes observados en el diseño:**
- Lista simple con nombres
- Lista con distancias entre paradas
- Lista con información adicional (dirección)

**Componentes a crear:**
- `StopsList` (lista vertical)
- `StopItem` con:
  - `StopIcon` (círculo)
  - `StopName`
  - `StopDistance` (opcional)
  - `StopConnector` (línea vertical)

---

#### Variaciones de Color por Ruta
El diseño muestra **6 variaciones de la misma pantalla** con diferentes colores:
1. Azul claro (fondo y línea)
2. Amarillo claro
3. Naranja claro
4. Marrón claro
5. Verde claro
6. Colores múltiples (modo comparación)

**Implicaciones técnicas:**
- El `RouteDetailScreen` debe recibir un `color` prop
- Los componentes deben ser temáticos (theme-aware)
- Background, líneas y badges se adaptan al color de la ruta

**Ejemplo de implementación:**
```typescript
interface RouteDetailScreenProps {
  routeId: string;
  routeColor: string; // "#FF6B35"
}

// Uso:
<RouteDetailScreen routeId="lomas" routeColor="#FF6B35" />
```

---

#### Sistema de Filtros (lado derecho)
**Elementos:**
- Botón de filtro (icono de funnel/ajustes)
- Menú lateral (slide-in) con:
  - Chips de colores (selección múltiple)
  - Opciones de filtrado por:
    - Color de ruta
    - Horario
    - Frecuencia
    - Distancia

**Componentes a crear:**
- `FilterButton` (FAB con icono)
- `FilterDrawer` (side sheet)
- `ColorChip` (chip seleccionable con color)
- `FilterOptions` (lista de opciones)

**Observación:**
El diseño muestra **chips de colores circulares** (rojo, verde, azul, amarillo) con checkmarks cuando están seleccionados.

---

### 4. Comparación de Horarios (Pantallas 31-35)

#### Cards de Horarios Comparativos
**Elementos:**
- Layout de 2 columnas
- Cada card muestra:
  - Nombre de la ruta
  - Horario inicial
  - Horario final
  - Frecuencia
  - Color distintivo

**Estados observados:**
- Card de ruta "Lomas"
- Card de ruta "Estadio A1"
- Card de ruta "Estadio A2"

**Componentes a crear:**
- `RouteComparisonGrid` (2 columnas)
- `RouteScheduleCard` con:
  - `RouteName`
  - `FirstBus` (horario)
  - `LastBus` (horario)
  - `Frequency` (badge)
  - `RouteColorIndicator` (barra lateral de color)

---

### 5. Pantallas de Configuración/Extras (Pantallas 36-40)

#### Onboarding/Intro (parece)
**Elementos:**
- Pantalla con logo "UrbanGO ØNIX"
- Mensaje de bienvenida
- Botones de navegación

**Observaciones:**
- Posible splash screen
- Pantalla de introducción/tutorial

**Componentes a crear:**
- `SplashScreen`
- `OnboardingScreen`
- `Logo` component

---

#### Pantallas de Reseñas (bottom section)
**Elementos:**
- Lista de reseñas con:
  - Avatar/icono de usuario
  - Nombre (ej: "Lomas", "Estadio A1")
  - Información adicional
  - Timestamp o metadata

**Uso potencial:**
- Historial de rutas buscadas
- Favoritos
- Rutas guardadas

**Componentes a crear:**
- `RouteHistoryList`
- `RouteHistoryItem` con:
  - `RouteIcon`
  - `RouteName`
  - `RouteMetadata` (horario, fecha)

---

## 🎨 Paleta de Colores Extraída

### Colores Principales
```typescript
export const Colors = {
  // Primarios
  primary: '#007AFF',           // Azul botones CTA
  secondary: '#8E8E93',         // Gris texto secundario
  
  // Backgrounds
  background: '#FFFFFF',        // Fondo principal
  backgroundSecondary: '#F2F2F7', // Fondo secundario
  
  // Text
  textPrimary: '#000000',       // Texto principal
  textSecondary: '#8E8E93',     // Texto secundario
  textTertiary: '#C7C7CC',      // Texto terciario
  
  // Rutas (extraídos del diseño)
  routes: {
    blue: '#4A90E2',            // Azul claro
    pink: '#FF6B9D',            // Rosa
    yellow: '#FFD93D',          // Amarillo
    orange: '#FF6B35',          // Naranja
    brown: '#8B4513',           // Marrón
    green: '#4ECDC4',           // Verde
  },
  
  // Marcadores
  userLocation: '#007AFF',      // Ubicación usuario (azul)
  destination: '#FF6B35',       // Destino (naranja)
  
  // Estados
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
};
```

---

## 📐 Componentes UI a Crear (Prioridad)

### 🔴 Alta Prioridad (MVP - Semana 1-2)

1. **Button** (ya mencionado antes)
   - Variantes: primary, secondary, outline
   - Estados: normal, disabled, loading

2. **Input** (ya mencionado antes)
   - Con icono de búsqueda
   - Placeholder
   - Auto-focus

3. **Card**
   - Base card component
   - Con shadow y border radius

4. **BottomSheet**
   - Modal desde abajo
   - Expandible/minimizable
   - Con drag handle

---

### 🟡 Media Prioridad (MVP - Semana 3-4)

5. **SearchModal** (compuesto)
   - BottomSheet + SearchInput + ResultsList

6. **RouteCard**
   - Card de ruta con nombre, horario, color
   - Seleccionable

7. **RouteDetailHeader**
   - Header con nombre, horarios, frecuencia

8. **StopsList**
   - Lista de paradas con línea conectora

9. **Chip**
   - Chip seleccionable (para filtros)
   - Con color personalizable

10. **FloatingButton** (FAB)
    - Botón flotante para filtros

---

### 🟢 Baja Prioridad (Post-MVP)

11. **FilterDrawer**
    - Side drawer con filtros

12. **RouteComparisonGrid**
    - Grid de 2 columnas para comparar

13. **OnboardingScreen**
    - Intro/tutorial

14. **RouteHistoryList**
    - Historial de búsquedas

---

## 📱 Flujo de Navegación

```
[Splash/Onboarding]
        ↓
[Pantalla Principal - Mapa]
        ↓
[Abrir SearchModal]
        ↓
[Escribir búsqueda]
        ↓
[Seleccionar destino]
        ↓
[Mapa con destino marcado]
        ↓
[Botón "Ver rutas disponibles"]
        ↓
[Lista de rutas]
        ↓
[Seleccionar ruta]
        ↓
[Mapa con ruta resaltada]
        ↓
[Ver detalle de ruta]
        ↓
[Pantalla de detalle con:]
  - Header (horarios)
  - Lista de paradas
  - Filtros (opcional)
  - Comparar con otras rutas (opcional)
```

---

## 🎯 Recomendaciones de Implementación

### 1. Comenzar por lo Simple
**Orden sugerido:**
1. Button, Input, Card (básicos)
2. SearchModal (flujo de búsqueda)
3. RouteCard (lista de rutas)
4. RouteDetailScreen (detalle completo)

### 2. Sistema de Theming
Implementar un sistema de theming para manejar los colores por ruta:

```typescript
// src/theme/RouteTheme.ts
export const getRouteTheme = (routeColor: string) => ({
  primary: routeColor,
  background: `${routeColor}1A`, // 10% opacity
  text: routeColor,
  border: routeColor,
});

// Uso:
const theme = getRouteTheme('#FF6B35');
```

### 3. Componentes Reutilizables
Priorizar componentes que se usan en múltiples pantallas:
- `RouteCard` (aparece en lista y comparación)
- `StopItem` (aparece en detalle y mapa)
- `BottomSheet` (usado en todo el flujo)

### 4. Animaciones
El diseño sugiere varias animaciones:
- Bottom sheet slide up/down
- Mapa zoom/pan al seleccionar destino
- Transición entre rutas
- Filtros slide in

**Librerías sugeridas:**
- React Native Reanimated (ya instalado)
- @gorhom/bottom-sheet

---

## 📊 Análisis de Complejidad

### Pantallas por Complejidad

**Simples (1-2 días):**
- Splash/Onboarding
- Pantalla principal con mapa
- Lista de rutas

**Medias (3-5 días):**
- SearchModal con autocompletado
- RouteDetailScreen básico

**Complejas (5-7 días):**
- Mapa con múltiples rutas simultáneas
- Sistema de filtros completo
- Comparación de rutas

---

## ✅ Checklist de Implementación

### Fase 1: Búsqueda de Destino
- [ ] Pantalla principal con mapa
- [ ] Botón "Marcar tu destino"
- [ ] SearchModal con input
- [ ] Lista de resultados
- [ ] Marcador de destino en mapa
- [ ] Botón "Ver rutas disponibles"

### Fase 2: Lista de Rutas
- [ ] Bottom sheet con lista de rutas
- [ ] RouteCard component
- [ ] Selección de ruta
- [ ] Mapa con ruta resaltada

### Fase 3: Detalle de Ruta
- [ ] RouteDetailHeader
- [ ] Lista de paradas con conectores
- [ ] Sistema de colores por ruta
- [ ] Información de horarios

### Fase 4: Features Adicionales
- [ ] Sistema de filtros
- [ ] Comparación de rutas
- [ ] Historial de búsquedas
- [ ] Animaciones y transiciones

---

## 🎨 Recursos de Diseño Faltantes

Para implementar fielmente el diseño, necesitarías:

1. **Iconos:**
   - Icono de búsqueda
   - Icono de ubicación
   - Icono de parada
   - Icono de filtro
   - Iconos de navegación

2. **Tipografía:**
   - Fuente principal (parece ser SF Pro/system default)
   - Tamaños definidos (heading, body, caption)

3. **Espaciados:**
   - Padding estándar (parece ser 16px)
   - Margins entre elementos (8px, 16px, 24px)

4. **Animaciones:**
   - Timing de transiciones
   - Easing functions

**Recomendación:** Si tienes acceso al archivo de Figma, exporta:
- Iconos en SVG
- Especificaciones de tipografía
- Design tokens (colores, espaciados, radios)

---

## 📝 Notas Finales

### Lo que está muy bien en el diseño:
✅ Flujo claro y lógico  
✅ Jerarquía visual bien definida  
✅ Uso consistente de colores  
✅ Componentes reutilizables identificables  
✅ Mobile-first approach  

### Áreas de oportunidad:
⚠️ Falta definición de estados de error  
⚠️ No se ve pantalla de carga  
⚠️ Falta manejo de permisos de ubicación  
⚠️ No se ve estado vacío (sin rutas disponibles)  

### Sugerencias:
💡 Agregar skeleton loaders para carga de datos  
💡 Definir mensajes de error amigables  
💡 Diseñar estado de permisos de ubicación denegados  
💡 Agregar tooltips/onboarding para primera vez  

---

**Análisis completado:** 2026-02-12  
**Por:** Frontend Lead  
**Próximo paso:** Extraer design tokens a código (colors.ts, spacing.ts, typography.ts)
