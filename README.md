# UrbanGO-ØNIX

UrbanGO es una aplicación móvil que ayuda a los usuarios a elegir la mejor ruta para llegar a un destino utilizando transporte público.  
El sistema analiza las distintas rutas disponibles y selecciona la opción más conveniente considerando:

- La ubicación actual del usuario.
- El punto de partida del camión.
- El destino final.

El objetivo principal es optimizar el tiempo y la experiencia de traslado dentro de la ciudad.

---

## Tecnologías

- **React Native** – Desarrollo de aplicaciones móviles.
- **Expo** – Herramientas y entorno de ejecución.
- **Expo Router** – Navegación basada en archivos.
- **TypeScript** – Tipado estático y mantenibilidad.
- **Node.js** – Backend y servicios.

---

## Documentación

Este proyecto sigue un flujo de trabajo y reglas claras para facilitar el trabajo en equipo y mantener la calidad del código.

### Getting Started
- **[Setup para desarrolladores](./docs/setup/DEVELOPMENT_SETUP.md)** - Instalación y configuración inicial
- **[Setup para líder (APK y nativo)](./docs/setup/LEADER_SETUP.md)** - Generación de APK nativo
- **[Guía de Contribución](./docs/CONTRIBUTING.md)** - Cómo contribuir al proyecto

### Gestión del Proyecto
- **[Roadmap del Proyecto](./docs/project/PROJECT_ROADMAP.md)** - Plan completo de desarrollo y fases
- **[Flujo de Trabajo del Equipo](./docs/team/TEAM_WORKFLOW.md)** - Coordinación y colaboración
- **[Documentación de API](./docs/api/API.md)** - Contratos entre frontend y backend
- **[Dependencias del proyecto](./docs/DEPENDENCIES.md)** - Gestión de librerías

### Arquitectura
- **[Documentación del Mapa](./docs/map/Map.md)** - Sistema completo de mapas
- **[POIs (Puntos de Interés)](./docs/pois/POIS.md)** - Módulo de ubicaciones
- **[Stops (Paradas)](./docs/stops/STOPS.md)** - Sistema de paradas
- **[Routes (Rutas)](./docs/routes/ROUTES.md)** - Sistema de rutas de camiones

### Calidad y Testing
- **[Guía de Testing](./docs/testing/TESTING_GUIDE.md)** - Testing completo con Jest
- **[Obstáculos Técnicos](./docs/decisions/TECHNICAL_OBSTACLES.md)** - Problemas conocidos y soluciones

### Seguridad
- **[Política de Seguridad](./SECURITY.md)** - Reporte de vulnerabilidades y mejores prácticas

### Historial
- **[Changelog](./CHANGELOG.md)** - Historial de versiones y cambios

> **= Documentos nuevos agregados**

---

## Dispositivos Soportados

UrbanGO-ØNIX está optimizada para ejecutarse en dispositivos Android de gama media en adelante, garantizando un rendimiento fluido en renderizado de mapas, animaciones y procesamiento de rutas.

---

## Requisitos Mínimos Recomendados (Android)

### Sistema Operativo
- **Android 8.0 (Oreo)** o superior  
- API Level 26+

> Recomendado: Android 10 o superior para mejor rendimiento y manejo de permisos.

---

### Procesador (CPU)
- Procesador Octa-core
- Arquitectura ARM64
- Velocidad mínima: 1.8 GHz

Ejemplo de referencia:
- Snapdragon serie 600 o superior
- MediaTek Helio G80 o superior

---

### Memoria RAM
- **Mínimo:** 3 GB  
- **Recomendado:** 4 GB o más

El renderizado de mapas y carga de GeoJSON puede consumir memoria adicional dependiendo de la cantidad de POIs y rutas activas.

---

### Almacenamiento
- Espacio mínimo libre: **500 MB**
- Tamaño estimado de la aplicación:
  - APK base: 50–80 MB
  - Datos cacheados (mapas, rutas, POIs): variable

---

### GPU
- Compatible con OpenGL ES 3.0 o superior
- Soporte para renderizado acelerado por hardware

Necesario para:
- Renderizado fluido de mapas
- Animaciones de cámara
- Transiciones y efectos visuales

---

### Conectividad
- Conexión a Internet (4G, 5G o WiFi)
- GPS habilitado

La aplicación requiere:
- Acceso a ubicación en tiempo real
- Consulta de rutas y datos desde backend

---

### Sensores
- GPS
- Acelerómetro (opcional para futuras mejoras de navegación dinámica)

---

# Requisitos Recomendados (Experiencia Óptima)

Para garantizar una experiencia completamente fluida:

- Android 11+
- 6 GB RAM
- Procesador Snapdragon serie 700 o superior
- Conectividad estable
- Modo de alto rendimiento activado

---

# Perfil de Dispositivo Objetivo (Gama Media 2023–2025)

UrbanGO-ØNIX está optimizada para funcionar correctamente en dispositivos Android gama media modernos con:

- 4 GB RAM o más
- Buen rendimiento gráfico
- SoC optimizado para renderizado acelerado

---

# Dispositivos No Recomendados

- Android menor a 8.0
- 2 GB RAM o menos
- Procesadores de gama baja antiguos
- Dispositivos sin aceleración gráfica adecuada

En estos dispositivos pueden presentarse:

- Lag en el mapa
- Animaciones entrecortadas
- Cierre inesperado por falta de memoria
- Carga lenta de rutas

---

# Justificación Técnica

UrbanGO-ØNIX utiliza:

- Renderizado nativo de mapas
- Transformación dinámica de GeoJSON
- Animaciones de cámara
- Manejo de múltiples capas (POIs, Stops, Routes)

Estas características requieren:

- Buen rendimiento gráfico
- Memoria suficiente
- Procesamiento fluido de datos geoespaciales

---

# Permisos Requeridos

- Ubicación precisa
- Acceso a red
- Acceso a almacenamiento (cache)
