# Plan de Implementación - Próximos Pasos

> **Creado:** 2026-02-12  
> **Para:** Equipo UrbanGO-ONIX (4 desarrolladores)  
> **Objetivo:** Guía para iniciar implementación del MVP

---

## Resumen Ejecutivo

Se ha completado la fase de **planificación y organización profesional** del proyecto. El equipo ahora cuenta con:

✅ Roadmap completo con 5 fases (18 semanas hasta producción)  
✅ Documentación de API con contratos definidos  
✅ Flujo de trabajo del equipo establecido  
✅ Guía completa de testing  
✅ Políticas de seguridad  
✅ Sistema de versionamiento (CHANGELOG)

---

## Acción Inmediata - Sprint 1 (Esta Semana)

### Frontend Lead - Prioridad Alta

#### 1. Configuración de Testing 2-3 horas
```bash
cd UrbanGO
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native @testing-library/react-hooks @types/jest
```

**Archivos a crear:**
- `UrbanGO/jest.config.js` (copiar de `docs/testing/TESTING_GUIDE.md`)
- `UrbanGO/tests/setup.ts` (configuración de mocks)
- Agregar scripts de test a `package.json`

**Verificar:**
```bash
npm test
# Debe ejecutar sin errores (aunque no haya tests todavía)
```

---

#### 2. Estado Global con Zustand 1-2 horas
```bash
npm install zustand
```

**Crear stores base:**
```
UrbanGO/src/store/
├── index.ts                    # Exporta todos los stores
├── userStore.ts                # Ubicación, preferencias
├── routeStore.ts               # Rutas seleccionadas, destinos
└── mapStore.ts                 # Estado del mapa, modo de visualización
```

**Ejemplo: `userStore.ts`**
```typescript
import { create } from 'zustand';

interface UserState {
  location: { latitude: number; longitude: number } | null;
  destination: { latitude: number; longitude: number; name: string } | null;
  setLocation: (location: { latitude: number; longitude: number }) => void;
  setDestination: (destination: { latitude: number; longitude: number; name: string } | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  location: null,
  destination: null,
  setLocation: (location) => set({ location }),
  setDestination: (destination) => set({ destination }),
}));
```

---

#### 3. Constants y Utils 2 horas

**Crear:**
```
UrbanGO/src/constants/
├── index.ts
├── colors.ts              # Tema de colores del diseño
└── config.ts              # Configuración tipada del .env

UrbanGO/src/utils/
├── index.ts
├── formatters.ts          # Formateo de distancias, duraciones, horarios
└── validators.ts          # Validación de coordenadas, búsquedas
```

**Ejemplo: `colors.ts`** (extraer del diseño)
```typescript
export const Colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  
  text: {
    primary: '#000000',
    secondary: '#8E8E93',
    tertiary: '#C7C7CC',
  },
  
  background: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
  },
  
  routes: {
    route1: '#FF6B35',
    route2: '#4ECDC4',
    route3: '#FFD93D',
    // ... colores de rutas del diseño
  }
};
```

---

#### 4. API Client y Mock Service 3-4 horas

**Crear:**
```
UrbanGO/src/services/
├── index.ts
├── api/
│   ├── apiClient.ts           # Cliente HTTP base
│   └── mockService.ts         # Servicio de mocks centralizado
├── geocoding.service.ts       # Servicio de búsqueda de destinos
├── routing.service.ts         # Servicio de cálculo de rutas
├── schedule.service.ts        # Servicio de horarios
└── tracking.service.ts        # Servicio de tracking en tiempo real
```

**Ejemplo: `apiClient.ts`**
```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
const USE_MOCKS = process.env.EXPO_PUBLIC_USE_MOCKS === 'true';

export const apiClient = {
  async request(endpoint: string, options?: RequestInit) {
    if (USE_MOCKS) {
      // Retornar mock
      const { mockService } = await import('./mockService');
      return mockService.handle(endpoint, options);
    }
    
    // Request real
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }
};
```

---

#### 5. Componentes UI Base 4-6 horas

**Crear:**
```
UrbanGO/src/components/ui/
├── index.ts
├── Button.tsx               # Botón reutilizable (primario, secundario, outline)
├── Input.tsx                # Input de texto y búsqueda
├── Card.tsx                 # Card base
└── LoadingSpinner.tsx       # Spinner de carga
```

**Incluir tests básicos para cada uno:**
```
UrbanGO/tests/components/ui/
├── Button.test.tsx
├── Input.test.tsx
└── Card.test.tsx
```

---

### Backend Lead - Coordinación con Frontend

#### 1. Revisar Contratos de API 1 hora
- Leer `docs/api/API.md` completo
- Validar que los contratos son implementables
- Proponer ajustes si es necesario (crear issue en GitHub)

#### 2. Definir Prioridad de Endpoints 30 min
**MVP Priority:**
1. `POST /routes/calculate` (crítico)
2. `GET /geocoding/search` (crítico)
3. `GET /routes/:routeId` (importante)
4. `GET /tracking/vehicle/:vehicleId` (importante)

#### 3. Setup del Backend Repo Según su stack
- Inicializar proyecto backend (Express/NestJS/etc.)
- Configurar base de datos
- Copiar `docs/api/API.md` al repo backend
- Crear branch `feature/api-contracts`

---

### Dev Frontend & Full-Stack - Apoyo

#### 1. Familiarización con el Proyecto 2-3 horas
- Leer toda la documentación:
  - `docs/project/PROJECT_ROADMAP.md`
  - `docs/team/TEAM_WORKFLOW.md`
  - `docs/api/API.md`
  - `docs/testing/TESTING_GUIDE.md`
  - `docs/guides/CODING_STANDARDS.md`

#### 2. Setup Local 1 hora
- Seguir `docs/setup/DEVELOPMENT_SETUP.md`
- Instalar APK en dispositivo de prueba
- Verificar que `npx expo start` funciona

#### 3. Crear Ejemplos de Tests 2-3 horas
Después de que Frontend Lead configure Jest:
- Escribir test de ejemplo para un mapper existente
- Escribir test de ejemplo para un formatter (cuando exista)
- Familiarizarse con React Native Testing Library

---

## Timeline - Próximos 7 Días

### Día 1-2 (Hoy y Mañana)
- [ ] Frontend Lead: Configurar testing + Zustand
- [ ] Backend Lead: Revisar contratos de API
- [ ] Todos: Leer documentación completa

### Día 3-4
- [ ] Frontend Lead: Constants, Utils, API Client base
- [ ] Backend Lead: Setup de backend repo
- [ ] Dev Frontend: Ejemplos de tests

### Día 5-7
- [ ] Frontend Lead: Componentes UI base + tests
- [ ] Backend Lead: Primer endpoint (`/routes/calculate`)
- [ ] Full-Stack Dev: Integración de mocks en frontend

---

## Objetivos de la Semana 1

**Must Have (Crítico):**
- ✅ Testing configurado y funcionando
- ✅ Zustand instalado y stores base creados
- ✅ Constants y Utils implementados
- ✅ API Client con sistema de mocks

**Should Have (Importante):**
- ⚠️ Componentes UI base (al menos Button e Input)
- ⚠️ Tests básicos para utils
- ⚠️ Backend repo inicializado

**Nice to Have (Opcional):**
- 📝 Componentes adicionales (Card, Spinner)
- 📝 Más coverage de tests
- 📝 GitHub Actions básico (lint en PRs)

---

## Comunicación Durante Esta Semana

### Daily Async (9:00 AM)
Cada uno postea en el canal del equipo (WhatsApp/Discord):
```
Daily Update - [Fecha]

Ayer: [Lo que completaste]
Hoy: [En qué trabajarás]
Bloqueadores: [Si tienes alguno]
```

### Mid-Week Sync (Miércoles 3:00 PM)
**Videollamada corta (15 min):**
- Revisar progreso vs plan
- Resolver bloqueadores
- Ajustar prioridades si es necesario

### Sprint Review (Viernes 4:00 PM)
**Videollamada (30 min):**
- Demo de lo completado
- Feedback del equipo
- Planear próxima semana

---

## Bloqueadores Potenciales

### 1. Backend no tiene endpoints listos
**Solución:** Frontend usa mocks (ya planeado)

### 2. Tests no configuran correctamente
**Solución:** Seguir guía paso a paso en `TESTING_GUIDE.md`  
**Backup:** Posponer tests a Semana 2 (NO IDEAL pero viable)

### 3. Dudas sobre contratos de API
**Solución:** Crear issue en GitHub con tag `[API]`  
**Responsables:** Ambos leads revisan juntos

### 4. Conflictos de merge
**Solución:** Branches pequeños y frecuentes, PRs rápidos

---

## Checklist de Validación (Fin de Semana 1)

### Frontend
- [ ] `npm test` ejecuta sin errores
- [ ] Al menos 1 test escrito y pasando
- [ ] Zustand instalado, 3 stores creados
- [ ] `src/constants/` poblado (colors, config)
- [ ] `src/utils/` con al menos formatters y validators
- [ ] `src/services/api/apiClient.ts` implementado
- [ ] `src/services/api/mockService.ts` con estructura base
- [ ] Al menos Button e Input implementados
- [ ] App corre sin errores (`npx expo start`)

### Backend
- [ ] Repo inicializado y pusheado
- [ ] `docs/api/API.md` copiado y revisado
- [ ] Al menos 1 endpoint implementado (o en progreso >50%)
- [ ] Base de datos configurada

### Equipo
- [ ] Todos leyeron la documentación
- [ ] 3 daily updates enviados
- [ ] Mid-week sync realizado
- [ ] Sprint review realizado

---

## Recursos Rápidos

### Para Copiar/Pegar

**Instalar dependencias:**
```bash
# Testing
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native @testing-library/react-hooks @types/jest

# Estado global
npm install zustand

# Fechas (si se necesita)
npm install date-fns
```

**Estructura de carpetas a crear:**
```bash
cd UrbanGO

# Tests
mkdir -p tests/components/ui tests/hooks tests/services tests/utils tests/integration

# Store
mkdir -p src/store

# Constants & Utils
mkdir -p src/constants src/utils

# Services
mkdir -p src/services/api

# Components UI
mkdir -p src/components/ui
```

---

## Tips para la Semana

1. **Pequeños PRs frecuentes** > 1 PR gigante  
   Ejemplo: PR separado para cada componente UI

2. **Pedir ayuda temprano**  
   Si estás bloqueado >30min, pregunta en el canal

3. **Documentar decisiones**  
   Si algo no está claro en la doc, crea issue o actualiza

4. **Celebrar wins pequeños**  
   Primer test pasando? 🎉 Comparte en el canal

5. **No optimizar prematuramente**  
   Funcionalidad primero, optimización después

---

## Contacto y Soporte

- **Issues/Bugs:** GitHub Issues
- **Preguntas rápidas:** [Canal del equipo]
- **Revisión de código:** GitHub PRs con mention a @frontend-lead
- **Emergencias:** [Contacto del lead]

---

## Meta de Febrero

**Al final del mes (4 semanas desde ahora):**
- ✅ Búsqueda de destinos funcionando
- ✅ Visualización de rutas en el mapa
- ✅ Al menos 1 integración real con backend
- ✅ Tests básicos cubriendo 40%+ del código crítico

---

**¡Éxito en el primer sprint!**

---

**Última actualización:** 2026-02-12  
**Autor:** Frontend Lead  
**Feedback:** Crear issue con tag `[plan]` para sugerencias
