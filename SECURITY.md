# Security Policy - UrbanGO-ONIX

## Reporting Security Vulnerabilities

La seguridad de UrbanGO-ONIX es una prioridad. Si descubres una vulnerabilidad de seguridad, por favor repórtala de manera responsable.

### Cómo Reportar

**NO** abras un issue público de GitHub para vulnerabilidades de seguridad.

En su lugar, envía un email a:
- **Email:** security.urbango@gmail.com
- **Asunto:** `[SECURITY] Descripción breve de la vulnerabilidad`

> **Nota para el equipo:** Actualizar con el email oficial cuando esté disponible.

### Información a Incluir

Por favor incluye la siguiente información en tu reporte:

1. **Descripción** de la vulnerabilidad
2. **Steps to reproduce** (pasos para reproducir)
3. **Impacto potencial** (qué puede ser explotado)
4. **Versión afectada** de la app
5. **Sugerencias de mitigación** (si las tienes)
6. **Tu información de contacto** (para seguimiento)

### Qué Esperar

1. **Confirmación:** Responderemos dentro de 48 horas
2. **Evaluación:** Evaluaremos la severidad y el impacto
3. **Fix:** Trabajaremos en un fix (timeline depende de la severidad)
4. **Disclosure:** Coordinaremos contigo el momento de disclosure público
5. **Crédito:** Te daremos crédito en el CHANGELOG (si lo deseas)

---

## Prácticas de Seguridad

### Para Desarrolladores

#### 1. Variables de Entorno y Secrets

** HACER:**
- Usar `.env` para secrets locales (gitignored)
- Usar variables de entorno de CI/CD para producción
- Prefijo `EXPO_PUBLIC_` solo para valores públicos seguros

** NO HACER:**
- Hardcodear API keys en el código
- Commitear archivos `.env`
- Exponer tokens de autenticación en logs

**Ejemplo:**
```typescript
// ✅ Correcto
const API_KEY = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

// ❌ Incorrecto
const API_KEY = 'pk.eyJ1IjoibXl1c2VybmFtZSI...'; // NUNCA
```

#### 2. Manejo de Tokens de Autenticación

** HACER:**
- Almacenar tokens en SecureStore (encriptado)
- Implementar refresh token rotation
- Expiración de tokens
- Logout al detectar token inválido

** NO HACER:**
- Guardar tokens en AsyncStorage sin encriptar
- Tokens sin expiración
- Guardar contraseñas

**Ejemplo:**
```typescript
import * as SecureStore from 'expo-secure-store';

// ✅ Correcto
await SecureStore.setItemAsync('authToken', token);

// ❌ Incorrecto
await AsyncStorage.setItem('authToken', token);
```

#### 3. Validación de Inputs

** HACER:**
- Validar todos los inputs del usuario
- Sanitizar datos antes de enviar al backend
- Validar coordenadas (rango válido)
- Límites de longitud para búsquedas

**Ejemplo:**
```typescript
//  Validación de coordenadas
const isValidCoordinate = (lat: number, lng: number): boolean => {
  return (
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180
  );
};

// Validación antes de enviar
if (!isValidCoordinate(origin.latitude, origin.longitude)) {
  throw new Error('Coordenadas inválidas');
}
```

#### 4. Comunicación con el Backend

** HACER:**
- Usar HTTPS en producción (nunca HTTP)
- Implementar certificate pinning (opcional, alto security)
- Timeout en requests (evitar requests colgados)
- Retry logic con backoff exponencial

** NO HACER:**
- Enviar datos sensibles en query params (usar body)
- Desactivar validación de certificados SSL
- Requests sin timeout

**Ejemplo:**
```typescript
// ✅ Correcto
const response = await fetch('https://api.urbango.com/routes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(data),
  timeout: 10000, // 10 segundos
});

// ❌ Incorrecto
const response = await fetch('http://api.urbango.com/routes?token=' + token);
```

#### 5. Logging y Debugging

** HACER:**
- Logs solo en desarrollo
- Remover `console.log` en producción
- Usar herramientas de logging seguras (Sentry)
- Logs genéricos para errores de autenticación

** NO HACER:**
- Loggear tokens, contraseñas o PII
- `console.log(error)` con stack traces completos en producción
- Mensajes de error detallados al usuario (info leak)

**Ejemplo:**
```typescript
// ✅ Correcto
if (__DEV__) {
  console.log('Route calculation params:', { origin, destination });
}

// Logging en producción con Sentry (sin datos sensibles)
Sentry.captureException(error, {
  tags: { component: 'RouteCalculation' }
});

// ❌ Incorrecto
console.log('Auth token:', token); // NUNCA
console.log('User data:', JSON.stringify(user)); // Puede contener PII
```

#### 6. Permisos de la App

** HACER:**
- Solicitar permisos solo cuando se necesitan
- Explicar por qué se necesita el permiso
- Manejar el caso de permiso denegado gracefully
- Minimal permissions (solo lo necesario)

**Ejemplo:**
```typescript
// ✅ Correcto - Explicar antes de solicitar
const requestLocationPermission = async () => {
  // Mostrar mensaje explicativo primero
  const { status } = await Location.requestForegroundPermissionsAsync();
  
  if (status !== 'granted') {
    // Manejar denegación
    Alert.alert(
      'Permiso necesario',
      'La app necesita acceso a tu ubicación para calcular rutas'
    );
    return false;
  }
  
  return true;
};
```

---

## Auditoría de Dependencias

### Mantener Dependencias Actualizadas

```bash
# Verificar vulnerabilidades conocidas
npm audit

# Ver reporte detallado
npm audit --json

# Auto-fix de vulnerabilidades (revisar cambios)
npm audit fix

# Actualizar dependencias
npm update
```

### Política de Actualizaciones

1. **Críticas:** Actualizar inmediatamente (< 24h)
2. **Altas:** Actualizar en la semana
3. **Medias:** Planear para siguiente sprint
4. **Bajas:** Evaluar caso por caso

### Antes de Agregar una Dependencia

- [ ] Verificar popularidad (stars, downloads)
- [ ] Verificar mantenimiento (última actualización)
- [ ] Verificar vulnerabilidades conocidas
- [ ] Revisar dependencias transitivas
- [ ] Documentar en `DEPENDENCIES.md`

---

## Vulnerabilidades Comunes a Evitar

### 1. Injection Attacks
- **Prevención:** Siempre validar y sanitizar inputs
- **Ejemplo:** SQL injection, NoSQL injection

### 2. Insecure Data Storage
- **Prevención:** Usar SecureStore para datos sensibles
- **Ejemplo:** Tokens en AsyncStorage sin encriptar

### 3. Insecure Communication
- **Prevención:** HTTPS siempre, certificate pinning opcional
- **Ejemplo:** HTTP en producción

### 4. Insufficient Authentication
- **Prevención:** Tokens con expiración, refresh tokens
- **Ejemplo:** Tokens que no expiran

### 5. Code Tampering
- **Prevención:** Code signing, obfuscación en producción
- **Ejemplo:** APK modificado

### 6. Reverse Engineering
- **Prevención:** Obfuscación de código, ProGuard
- **Ejemplo:** API keys extraídas del APK

---

## Security Checklist (Pre-Release)

### Autenticación y Autorización
- [ ] Tokens almacenados en SecureStore
- [ ] Tokens con expiración
- [ ] Refresh token implementado
- [ ] Logout limpia todos los datos sensibles

### Comunicación
- [ ] Solo HTTPS en producción
- [ ] Timeouts configurados
- [ ] Retry logic con límites
- [ ] Headers de seguridad configurados

### Almacenamiento de Datos
- [ ] Datos sensibles en SecureStore
- [ ] No hay hardcoded secrets
- [ ] .env en .gitignore

### Código
- [ ] No hay `console.log` con datos sensibles
- [ ] Inputs validados
- [ ] Error messages genéricos para el usuario
- [ ] Code obfuscation habilitado (producción)

### Dependencias
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] Dependencias actualizadas
- [ ] Solo dependencias necesarias

### Permisos
- [ ] Solo permisos necesarios en AndroidManifest.xml
- [ ] Permisos solicitados just-in-time
- [ ] Manejo de permisos denegados

### Build de Producción
- [ ] ProGuard habilitado (Android)
- [ ] Code signing configurado
- [ ] Source maps no incluidos en build

---

## Recursos

- [OWASP Mobile Security Project](https://owasp.org/www-project-mobile-security/)
- [React Native Security Best Practices](https://reactnative.dev/docs/security)
- [Expo Security](https://docs.expo.dev/guides/security/)
- [Android Security Tips](https://developer.android.com/training/articles/security-tips)

---

## Historial de Vulnerabilidades

*(Actualizar cuando se reporten y resuelvan vulnerabilidades)*

### 2026
- **Ninguna reportada** 

---

**Última actualización:** 2026-02-12  
**Mantenedor:** Frontend Lead
