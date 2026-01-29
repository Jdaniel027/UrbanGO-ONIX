# POIs (Points of Interest)

Esta carpeta contiene **toda la arquitectura relacionada con los Puntos de Interés (POIs)** que se muestran en el mapa.

El objetivo principal de este módulo es:
- Mantener una **arquitectura escalable**
- Separar **datos, lógica y renderizado**
- Facilitar la integración con **API backend**
- Evitar que el mapa se rompa cuando crezcan los datos

---

## Concepto clave

> **El mapa es solo una vista.  
> Los POIs son datos.  
> Nunca se mezclan.**

Los POIs:
- NO se crean en el mapa directamente
- NO se renderizan manualmente uno por uno
- NO dependen del estilo del mapa

Todo pasa por capas bien definidas.

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
 ├─ hooks/
 │  └─ usePOIs.ts
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