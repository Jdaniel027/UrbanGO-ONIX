# 👥 Team Workflow - UrbanGO-ONIX

> **Equipo:** 4 desarrolladores  
> **Modelo:** Colaboración Frontend-Backend paralela  
> **Última actualización:** 2026-02-12

---

## Estructura del Equipo

### Roles y Responsabilidades

| Rol | Persona | Responsabilidades Principales |
|-----|---------|-------------------------------|
| **Frontend Lead** | Dev 1 | - Arquitectura del frontend<br>- Sistema de mapas<br>- Revisión de PRs frontend<br>- Coordinación con backend |
| **Backend Lead** | Dev 2 | - Arquitectura del backend<br>- Diseño de API<br>- Base de datos<br>- Revisión de PRs backend |
| **Frontend Dev** | Dev 3 | - Implementación de pantallas<br>- Componentes UI<br>- Testing de componentes |
| **Full-Stack Dev** | Dev 4 | - Integración frontend-backend<br>- Mocks y servicios<br>- Testing de integración |

---

## Flujo de Trabajo Diario

### 1. Comunicación Asíncrona (Recomendada)

#### Daily Stand-up (Formato Escrito)
**Hora sugerida:** 9:00 AM  
**Plataforma:** Discord/Slack/WhatsApp

**Formato:**
```
📅 Daily Update - [Fecha]

[Tu nombre]
Ayer: Completé sistema de búsqueda de destinos
Hoy: Trabajaré en visualización de rutas
Bloqueadores: Necesito confirmar formato de respuesta del endpoint /routes/calculate

[Backend Lead]
Ayer: ...
Hoy: ...
Bloqueadores: ...
```

#### Canales de Comunicación Sugeridos
- **#general** - Anuncios y coordinación general
- **#frontend** - Discusiones de frontend
- **#backend** - Discusiones de backend
- **#api-contracts** - Coordinación de contratos de API
- **#bugs** - Reporte de bugs
- **#random** - Off-topic

---

### 2. Sincronización Frontend-Backend

#### Reuniones Semanales (Recomendadas)

**Sprint Planning** - Lunes 10:00 AM (30 min)
- Revisar roadmap
- Asignar tareas de la semana
- Identificar dependencias entre frontend y backend
- Definir contratos de API si es necesario

**Mid-week Sync** - Miércoles 3:00 PM (15 min)
- Check-in rápido
- Resolver bloqueadores
- Ajustar prioridades si es necesario

**Sprint Review** - Viernes 4:00 PM (30 min)
- Demo de lo completado
- Actualizar roadmap
- Celebrar wins 🎉

---

## 🔗 Integración Frontend-Backend

### Proceso para Nuevas Features

#### 1. Definición de Contrato de API
**Responsable:** Frontend Lead + Backend Lead

**Pasos:**
1. Frontend identifica necesidad de nuevo endpoint
2. Crear issue en GitHub: `[API] Nombre del endpoint`
3. Documentar en `docs/api/API.md`:
   - Endpoint path
   - Request format
   - Response format
   - Códigos de error
4. Ambos equipos aprueban el contrato (👍 en el issue)

**Ejemplo de Issue:**
```markdown
## [API] Endpoint para búsqueda de destinos

**Path:** `GET /geocoding/search`

**Query Params:**
- query: string (required)
- limit: number (optional, default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [...]
  }
}
```

**Prioridad:** Alta (MVP)
**Fecha estimada:** 2026-02-20

@backend-lead - ¿Puedes revisar?
```

#### 2. Desarrollo Paralelo
- **Frontend:** Implementa con mocks basados en el contrato
- **Backend:** Implementa endpoint real

#### 3. Integración
**Responsable:** Full-Stack Dev

**Pasos:**
1. Backend publica endpoint en entorno de desarrollo
2. Frontend cambia flag `EXPO_PUBLIC_USE_MOCKS=false`
3. Testing de integración
4. Resolver diferencias entre contrato y implementación
5. Actualizar documentación si hay cambios

---

## 📂 Organización de Repositorios

### Repositorio Frontend (este)
```
UrbanGO-ONIX/
├── UrbanGO/               # Código de la app
├── docs/                  # Documentación compartida
│   ├── api/              # Contratos de API (compartido con backend)
│   └── ...
```

### Repositorio Backend (separado)
```
UrbanGO-Backend/
├── src/
├── docs/
│   └── api/              # Misma documentación que frontend
```

**Importante:** Mantener `docs/api/API.md` sincronizado entre ambos repos.

---

## 🔀 Git Workflow (Recap)

### Ramas

```
main (protegida)
  ├── feature/map-search-ui
  ├── feature/route-calculation
  ├── feature/tracking-realtime
  └── fix/map-performance
```

### Convención de Nombres de Ramas
- `feature/nombre-corto` - Nuevas funcionalidades
- `fix/nombre-del-bug` - Corrección de errores
- `refactor/area` - Refactorización
- `chore/tarea` - Configuración, dependencias

### Convención de Commits
```
tipo: descripción breve

feat: agregar búsqueda de destinos con autocompletado
fix: corregir crash al seleccionar ruta
refactor: optimizar renderizado del mapa
chore: actualizar dependencias de Mapbox
docs: agregar documentación de API
test: agregar tests para RouteCard
```

---

## ✅ Pull Request Workflow

### 1. Antes de Crear el PR

**Checklist del Desarrollador:**
- [ ] Código sigue los estándares (`CODING_STANDARDS.md`)
- [ ] No hay `console.log` innecesarios
- [ ] TypeScript compila sin errores (`npx tsc --noEmit`)
- [ ] Linter pasa (`npm run lint`)
- [ ] Tests escritos y pasando (si aplica)
- [ ] App corre sin errores (`npx expo start`)
- [ ] Archivos sensibles no incluidos (`.env`)

### 2. Crear el PR

**Template:**
```markdown
## 🎯 Descripción
[Descripción clara de qué hace este PR]

## 📸 Screenshots/Videos
[Si es UI, agregar capturas o video]

## 🔗 Issue Relacionado
Closes #123

## 🧪 Cómo Probar
1. Ir a pantalla de búsqueda
2. Escribir "Plaza Sendero"
3. Verificar que aparecen resultados

## ✅ Checklist
- [x] Código sigue estándares
- [x] Sin console.log
- [x] TypeScript sin errores
- [x] Linter pasa
- [x] App funciona correctamente
- [x] Tests agregados (si aplica)

## 📝 Notas Adicionales
[Cualquier contexto adicional]
```

### 3. Revisión de Código

**Revisores Asignados:**
- Frontend PRs: Frontend Lead (tú)
- Backend PRs: Backend Lead
- PRs de integración: Ambos leads

**Criterios de Aprobación:**
- ✅ Al menos 1 aprobación (👍)
- ✅ Checklist completo
- ✅ CI/CD pasa (cuando se implemente)
- ✅ No hay comentarios sin resolver

**Tiempo de revisión objetivo:** 24 horas

### 4. Merge

**Quién hace merge:**
- El autor del PR (después de aprobación)
- O el revisor (si el autor no está disponible)

**Después del merge:**
- Eliminar la rama
- Mover ticket a "Done" (cuando se implemente sistema de tickets)
- Actualizar roadmap si es un hito importante

---

## 🐛 Reporte de Bugs

### Formato de Issue de Bug

```markdown
## 🐛 Bug: [Título descriptivo]

**Severidad:** Crítico / Alto / Medio / Bajo

**Descripción:**
[Descripción clara del problema]

**Steps to Reproduce:**
1. Abrir app
2. Ir a búsqueda
3. Escribir "test"
4. App crashea

**Expected Behavior:**
[Qué debería pasar]

**Actual Behavior:**
[Qué está pasando]

**Screenshots/Videos:**
[Si aplica]

**Environment:**
- OS: Android 11
- Device: Samsung Galaxy A32
- App Version: 1.0.0-beta

**Additional Context:**
[Stack trace, logs, etc.]
```

### Priorización de Bugs

| Severidad | Descripción | Ejemplo | SLA |
|-----------|-------------|---------|-----|
| 🔴 Crítico | App no funciona | Crash al abrir | 24h |
| 🟠 Alto | Feature principal roto | Búsqueda no funciona | 3 días |
| 🟡 Medio | Feature secundario | Filtro no guarda | 1 semana |
| 🟢 Bajo | Cosmético, menor | Texto mal alineado | 2 semanas |

---

## 📊 Gestión de Tareas (Sugerencias)

### Opción 1: GitHub Projects (Recomendada)
**Ventajas:** Integrado con issues y PRs, gratis

**Columnas sugeridas:**
- 📋 Backlog
- 📝 To Do (Sprint actual)
- 🚧 In Progress
- 👀 In Review
- ✅ Done

**Cómo usar:**
1. Crear proyecto en GitHub: "UrbanGO Sprint"
2. Convertir tareas del roadmap en issues
3. Asignar issues a miembros del equipo
4. Mover cards según progreso

### Opción 2: Trello (Alternativa Simple)
**Ventajas:** Visual, fácil de usar

**Boards sugeridos:**
- Board principal: "UrbanGO Development"
- Listas: Backlog, To Do, Doing, Review, Done

### Opción 3: Notion (Alternativa Robusta)
**Ventajas:** Documentación + tasks en un lugar

---

## 🎯 Definición de "Done"

Una tarea está completa cuando:
- ✅ Código implementado y funcionando
- ✅ Code review aprobado
- ✅ Tests escritos y pasando (si aplica)
- ✅ Documentación actualizada (si afecta contratos o arquitectura)
- ✅ PR merged a `main`
- ✅ Sin bugs conocidos críticos o altos
- ✅ Feature probada en dispositivo real (si es UI)

---

## 📅 Calendario de Ceremonias

### Semanal
| Día | Hora | Ceremonia | Duración | Asistentes |
|-----|------|-----------|----------|------------|
| Lunes | 9:00 AM | Daily (async) | - | Todos |
| Lunes | 10:00 AM | Sprint Planning | 30 min | Todos |
| Miércoles | 9:00 AM | Daily (async) | - | Todos |
| Miércoles | 3:00 PM | Mid-week Sync | 15 min | Leads |
| Viernes | 9:00 AM | Daily (async) | - | Todos |
| Viernes | 4:00 PM | Sprint Review | 30 min | Todos |

### Mensual
- **Retrospectiva:** Último viernes del mes (45 min)
- **Roadmap Review:** Primer lunes del mes (30 min)

---

## 🚀 Tips para Trabajo Remoto Eficiente

1. **Comunicación Asíncrona First**
   - No esperes respuestas inmediatas
   - Documenta decisiones en GitHub/Docs
   - Usa hilos en mensajes para organizar conversaciones

2. **Over-communicate**
   - Si tienes dudas, pregunta
   - Comparte progreso proactivamente
   - Avisa si estarás no disponible

3. **Respeta los Tiempos**
   - Llega a tiempo a las reuniones (o avisa si no puedes)
   - Respeta el horario de trabajo de otros
   - Define horario de disponibilidad

4. **Documenta Todo**
   - Decisiones importantes → GitHub issues o docs
   - Cambios en contratos → `docs/api/API.md`
   - Problemas conocidos → `TECHNICAL_OBSTACLES.md`

5. **Sé Proactivo**
   - No esperes a estar bloqueado para pedir ayuda
   - Revisa PRs de otros proactivamente
   - Comparte conocimiento

---

## 🎉 Celebra los Wins

- ✨ Primer feature completado
- 🚀 MVP desplegado
- 🐛 Bug crítico resuelto
- 📈 Milestone alcanzado

**Cómo celebrar:**
- Mensaje en #general con GIF 🎊
- Mention en la retrospectiva
- Screenshot para portfolio

---

## 📚 Recursos del Equipo

- **Documentación:** `docs/`
- **Diseño UI:** [Link a Figma cuando lo subas]
- **API Contracts:** `docs/api/API.md`
- **Roadmap:** `docs/project/PROJECT_ROADMAP.md`
- **Estándares:** `docs/guides/CODING_STANDARDS.md`

---

**Recordatorio:** Este workflow es flexible. Si algo no funciona, ¡propón mejoras en la retrospectiva!
