# Dependencias del proyecto

Este archivo documenta **todas las librerías instaladas en el proyecto**, su propósito y reglas para instalar nuevas dependencias.

> Este archivo es obligatorio.  
> Ninguna dependencia puede agregarse al proyecto sin documentarse aquí.

Para una visión general del proyecto, ver el [README.md](./README.md)
> Para detalles de arquitectura y responsabilidades del mapa, ver:
> [Documentación del Mapa](./Map.md)

## Relación con package.json

- `package.json` fuente técnica (qué está instalado)
- `DEPENDENCIES.md` fuente humana (por qué está instalado)

Si una librería existe en `package.json` pero no aquí, **debe documentarse**.

---

## Dependencias Core / Framework

| Librería     | Categoría | Propósito                | Usada en | Agregada por | Fecha      |
| ------------ | --------- | ------------------------ | -------- | ------------ | ---------- |
| react        | Core      | Librería principal de UI | Global   | Equipo       | 23-01-2026 |
| react-native | Core      | Framework base           | Global   | Equipo       | 23-01-2026 |

---

## Dependencias Expo

| Librería           | Categoría  | Propósito                | Usada en | Agregada por | Fecha      |
| ------------------ | ---------- | ------------------------ | -------- | ------------ | ---------- |
| expo               | Expo       | Plataforma base Expo     | Global   | Equipo       | 23-01-2026 |
| expo-router        | Navegación | Ruteo basado en archivos | App      | Equipo       | 23-01-2026 |
| expo-splash-screen | UI         | Manejo del splash        | App      | Equipo       | 23-01-2026 |

---

## Navegación

| Librería                      | Categoría  | Propósito            | Usada en | Agregada por | Fecha      |
| ----------------------------- | ---------- | -------------------- | -------- | ------------ | ---------- |
| @react-navigation/native      | Navegación | Navegación principal | App      | Equipo       | 23-01-2026 |
| @react-navigation/bottom-tabs | Navegación | Tabs inferiores      | App      | Equipo       | 23-01-2026 |

---

## UI / Iconos

| Librería           | Categoría | Propósito          | Usada en | Agregada por | Fecha      |
| ------------------ | --------- | ------------------ | -------- | ------------ | ---------- |
| @expo/vector-icons | UI        | Iconos del sistema | Screens  | Equipo       | 23-01-2026 |

---

## Mapas / Geolocalización

| Librería          | Categoría | Propósito                                     | Usada en                 | Agregada por | Fecha      |
| ----------------- | --------- | --------------------------------------------- | -------------------------| ------------ | ---------- |
| @rnmapbox/maps    | Mapas     | Renderizado de mapas Mapbox nativo            | src/map                  | Daniel       | 26-01-2026 |
| expo-location     | Mapas     | Permisos y ubicación GPS del usuario          | src/map/location         | Daniel       | 19-02-2026 |
| expo-dev-client   | Tooling   | Soporte para Dev Build con código nativo      | Global                   | Daniel       | 26-01-2026 |


---

## Dependencias de desarrollo

| Librería   | Propósito        |
| ---------- | ---------------- |
| typescript | Tipado estático  |
| eslint     | Reglas de código |

## ¿Cómo agregar una nueva dependencia?

### Paso 1: Evaluación

- Verificar que no exista ya una solución en el proyecto
- Revisar mantenimiento, popularidad y compatibilidad con Expo
- Confirmar que no esté listada en Dependencias descartadas

### Paso 2: Instalación

```bash
npm install nombre-libreria
```

### Paso 3: Documentación (obligatorio)

Agregar la dependencia a la sección correspondiente de este archivo
Indicar propósito y área de uso

## Dependencias descartadas

Esta sección documenta librerías que fueron evaluadas pero no utilizadas, junto con el motivo de su descarte.
Su objetivo es evitar reinstalar dependencias que ya se determinó que no aportan valor al proyecto.

| Librería                | Motivo de descarte                             | Alternativa         |
| ----------------------- | ---------------------------------------------- | ------------------- |
| react-native-navigation | Incompatible con Expo Router                   | expo-router         |
| native-base             | Peso elevado y estilos poco flexibles          | Componentes propios |

> Una dependencia descartada no debe reinstalarse sin volver a justificarla y documentarla.
