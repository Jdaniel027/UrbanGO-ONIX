# Expo Dev Build - Problemas de Conexión de Red

## Contexto

- Proyecto: UrbanGO
- Framework: Expo (Development Build)
- Plataforma: Android
- Sistema Operativo: Windows
- Entorno: Red doméstica / Red escolar

Este documento describe un problema de conexión entre el dispositivo móvil y el servidor Metro durante el desarrollo con Expo Dev Client.

---

## Problema Presentado

Al iniciar el proyecto con:

```bash
npx expo start --dev-client
```

Y escanear el código QR, aparecía el siguiente error:

> failed to connect to 192.168.x.x:8081

Al intentar usar túnel:

```bash
npx expo start --dev-client --tunnel
```

También aparecía:

> CommandError: ngrok tunnel took too long to connect.

![Tunnel Error](../assets/Errores%20QR/Errorr_Tunnel.png)