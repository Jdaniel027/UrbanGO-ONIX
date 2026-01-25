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

## Configuración rápida (solo líder del proyecto)

> ⚠️ Esta sección aplica **únicamente** para quien genera el APK de Expo Dev Build.

### Requisitos del sistema

- **Node.js 20.x LTS**
- **JDK 17 (Adoptium Temurin 17 LTS)**
- **Android Studio**, con:
  - Android SDK Platform 33+
  - Android Emulator
- **Expo CLI**
```bash
npm install -g expo-cli
```
> ⚠️ Asegúrate de que Node y Java coincidan en versión para evitar errores con Gradle.

---

## Guía para Desarrolladores – Uso de Expo Dev Build (APK)

Esta sección explica cómo trabajar en UrbanGO usando un APK de Expo Dev Build ya generado.

> Si ya se te compartieron el APK, NO necesitas configurar Android Studio, SDK, Java ni Gradle.
> Todo lo nativo ya viene incluido en el APK.

---

###Flujo general del proyecto

El líder del proyecto:
- Configura Java, Android SDK y dependencias nativas
- Genera el APK de Expo Dev Build

Los desarrolladores:
- Trabajan solo con JavaScript / TypeScript
- Usan el APK para ver cambios en tiempo real

---

### Requisitos para desarrolladores

Solo necesitas:
- Node.js (LTS recomendado)
- npm
- Git
- Dispositivo Android físico o emulador
- APK de Expo Dev Build

PVerifica Node y npm:
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

---

### Importante: ubicación del proyecto

> ⚠️ El proyecto NO debe estar dentro de OneDrive

OneDrive puede causar:
- Errores de Gradle
- Builds lentos
- Bloqueos de archivos
Ubicación recomendada:
```txt
C:\Users\<usuario>\UrbanGO-ONIX
```
