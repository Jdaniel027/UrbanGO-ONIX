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

```bash
failed to connect to 192.168.x.x:8081
```

Al intentar usar túnel:

```bash
npx expo start --dev-client --tunnel
```

También aparecía:

```bash
CommandError: ngrok tunnel took too long to connect.
```

![Tunnel Error](../assets/Errores%20QR/Errorr_Tunnel.png)

---

## Análisis Técnico

Expo Dev Client intenta conectarse al servidor Metro mediante:

```txt 
http://192.168.x.x:8081
```

Para que esto funcione, se requiere:

- Dispositivo y PC en la misma red
- Puerto 8081 accesible
- Firewall sin bloquear Node.js
- Sin aislamiento de clientes en el router

En este caso, el problema fue:

> Windows Firewall bloqueando Node.js y el puerto 8081

---

## Solución Aplicada

1. Permitir Node.js en el Firewall de Windows
2. Ir a Panel de Control
3. Entrar en Firewall de Windows Defender
4. Seleccionar Permitir una aplicación o característica

![Paso 4](../assets/Errores%20QR/Paso_4.png)

5. Buscar Node.js

![Paso 5](../assets/Errores%20QR/Paso_5.png)

6. Activar:
- ☑ Red Privada
- ☑ Red Pública

![Paso 6](../assets/Errores%20QR/Paso_6.png)

---

Ejecutar Expo en modo túnel

```bash 
npx expo start --dev-client --tunnel --clear
```

Una vez realizado esto, la conexión funcionó correctamente.

---


