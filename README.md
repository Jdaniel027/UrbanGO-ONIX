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
Antes de realizar cualquier cambio, por favor revisa:

- **[CONTRIBUTING.md](./CONTRIBUTING.md)**
- [Dependencias del proyecto](./DEPENDENCIES.md)

---

## Configuración rápida para UrbanGO-ONIX

## RRequisitos del sistema
- **Node.js 20.x LTS**
- **JDK 17** (Adoptium Temurin 17 LTS)
- **Android Studio** con:
  - SDK Platform 33
  - Android Emulator
- **Expo CLI:** `npm install -g expo-cli`

> ⚠️ Asegúrate de que las versiones de Node y Java coincidan para evitar errores con Gradle.

---

## Guía para Desarrolladores – Uso de Expo Dev Build (APK)

Esta guía explica **todo lo que debes hacer** si eres desarrollador del proyecto y **ya se te compartió el APK de Expo Dev Build**.

> Importante: **NO necesitas Android Studio, SDK de Android ni configuraciones nativas**.  
> Todo eso ya viene incluido en el APK.

---

### Requisitos previos

Solo necesitas lo siguiente instalado en tu equipo:

- **Node.js (LTS recomendado)**
- **npm**
- **Git**
- Un **emulador Android** o **celular físico Android**

Para verificar Node.js:
```bash
node -v
npm -v
```

**Paso 1: Instalar el APK de Expo Dev Build**

- Copia el APK al celular
- Ábrelo e instálalo
- Acepta permisos si el sistema lo solicita

> Este APK ya contiene Mapbox, módulos nativos y configuraciones especiales.

**Paso 2: Clonar el repositorio del proyecto**

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

**Paso 3: Instalar dependencias del proyecto**

```bash
npm install
```

**Paso 4: Iniciar el proyecto con Expo Dev Client**

> ⚠️ NO uses expo go

Ejecuta:
```bash
npx expo start --dev-client
```

**Paso 5: Abrir la app en el dispositivo**

- Abre la app instalada desde el APK
- Si no se conecta automáticamente:
  - Asegúrate de estar en la misma red Wi-Fi
  - O usa conexión por USB
Cuando el bundler esté activo, los cambios se reflejarán automáticamente.

### Flujo de trabajo diario
1. Abre el proyecto
2. Ejecuta:
```bash
npx expo start --dev-client
```
3. Modifica archivos .js, .ts, .tsx
4. Guarda cambios
5. Ve los cambios reflejados en tiempo real

### Cuándo SÍ se necesita un nuevo APK?

Solo si se hacen cambios como:
- Se agrega una nueva dependencia nativa
- Se modifica configuración de Mapbox
- Se cambian permisos (GPS, cámara, sensores, etc.)
- Se agrega código Java/Kotlin o Swift

> En ese caso, el líder del proyecto generará un nuevo APK y lo compartirá.

**Resumen rápido**
| Acción              | ¿Requiere nuevo APK? |
| ------------------- | -------------------- |
| Cambios de UI       | ❌ No                 |
| Lógica JS/TS        | ❌ No                 |
| Hooks / APIs        | ❌ No                 |
| Navegación          | ❌ No                 |
| Nueva lib nativa    | ✅ Sí                 |
| Cambios Android/iOS | ✅ Sí                 |
