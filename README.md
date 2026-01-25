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

## Pasos para arrancar el proyecto

1. **Clonar el repo:**

```bash
git clone <URL_DEL_REPO>
cd UrbanGO-ONIX
```

**Ubicación del proyecto**

> Para evitar errores al compilar la app en Android (especialmente problemas con Gradle y Java), **el proyecto no debe estar dentro de OneDrive** ni carpetas sincronizadas en la nube.

Se recomienda mover el proyecto a una carpeta local, por ejemplo:

```txt
C:\Projects\UrbanGO-ONIX
```

> Esto asegura que los paths sean más cortos y que Gradle pueda acceder correctamente a todos los archivos temporales necesarios para la compilación.

2. **Instalar dependencias**

```bash
npm install
```

> Esto instala todas las librerías de Node necesarias para el proyecto.

3. **Configurar Java y Android (si no lo tienen):**

```powershell
# JDK 17
$Env:JAVA_HOME="C:\Program Files\Adoptium\jdk-17.0.17"
$Env:Path="$Env:JAVA_HOME\bin;" + $Env:Path

# Android SDK (ejemplo)
$Env:ANDROID_HOME="C:\Users\<usuario>\AppData\Local\Android\Sdk"
$Env:Path="$Env:ANDROID_HOME\emulator;$Env:ANDROID_HOME\tools;$Env:ANDROID_HOME\tools\bin;$Env:ANDROID_HOME\platform-tools;" + $Env:Path
```
> ⚠️ Estas variables aseguran que Gradle detecte correctamente Java y Android SDK.

> ⚠️ Estos pasos son necesarios solo la primera vez en cada máquina.


4. **Ejecutar la app en Android:**

Abre un emulador o conecta un dispositivo.
El dispositivo tiene que estar en modo desarrollador y con la opcion de depuracion USB activada.
```bash
npx expo run:android
```
> La primera compilación puede tardar varios minutos.
> Si algo falla, revisa que tu JDK sea 17 y que JAVA_HOME y ANDROID_HOME estén correctamente configurados.
