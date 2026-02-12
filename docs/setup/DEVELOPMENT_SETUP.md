# Setup para Desarrolladores – UrbanGO

> Guía rápida para levantar el proyecto y trabajar usando el APK de Expo Dev Build.

---

## Guía para Desarrolladores – Uso de Expo Dev Build (APK)

Esta sección explica cómo trabajar en UrbanGO usando un APK de Expo Dev Build ya generado.

> Si ya se te compartieron el APK, NO necesitas configurar Android Studio, SDK, Java ni Gradle.
> Todo lo nativo ya viene incluido en el APK.

---

### Requisitos para desarrolladores

Solo necesitas:
- Node.js (LTS recomendado)
- npm
- Git
- Dispositivo Android físico o emulador
- APK de Expo Dev Build

Verifica Node y npm:
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
npx expo start
o
npx expo start --dev-client

# Si el apk no abre
expo start -c
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

---

### Versión del APK y compatibilidad

El APK de Expo Dev Build **debe ser compatible con el código actual** del repositorio.

Si el código cambia pero el APK no:
- La app puede no abrir
- Pueden faltar permisos
- Pueden aparecer errores nativos

Si después de un `git pull` la app deja de funcionar:
1. Revisa si se anunció un APK nuevo
2. Si hay uno nuevo, instálalo
3. Vuelve a ejecutar:
```bash
npx expo start --dev-client
```

---

- **[Volver al README principal](../../README.md)**
- **[Setup para líder (APK y nativo)](./LEADER_SETUP.md)**
