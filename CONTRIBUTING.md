# Contributing Guia – UrbanGO

Este documento define las reglas, convenciones y flujo de trabajo que deben seguir
todos los desarrolladores que contribuyan al proyecto UrbanGO.

> Antes de contribuir, asegúrate de leer el README del proyecto:
> [README.md](./README.md)

---

## Índice

- [Estructura del proyecto](#estructura-del-proyecto)
- [Convenciones de código](#convenciones-de-código)
- [Dependencias](#dependencias-del-proyecto)
- [Calidad y testing](#Calidad-y-Testing)
- [Flujo de trabajo con Git](#github-flow--guía-de-trabajo-del-proyecto)
- [Pull Requests](#pull-requests)
- [Definición de terminado (DoD)](#definición-de-terminado)
- [Seguridad y variables de entorno](#variables-de-entorno)
- [Comunicacion del equipo](#comunicación-del-equipo)

---

## Estructura del proyecto

El proyecto utiliza **Expo Router** y mantiene una separación estricta entre
**navegación**, **presentación** y **lógica de negocio**.

```txt
UrbanGO/
├── app/                    # Rutas y pantallas (Expo Router)
│   ├── _layout.tsx         # Layout principal de navegación
│   ├── index.tsx           # Pantalla inicial
│   └── (tabs)/             # Navegación por tabs (si aplica)
│
├── src/                    # Lógica de la aplicación
│   ├── components/         # Componentes reutilizables
│   │   └── ui/             # Componentes de UI (botones, inputs, cards)
│   │
│   ├── constants/          # Constantes globales
│   │   ├── colors.ts       # Paleta de colores
│   │   ├── theme.ts        # Configuración de tema
│   │   └── env.ts          # Variables de entorno tipadas
│   │
│   ├── hooks/              # Custom hooks
│   │
│   ├── services/           # Servicios externos
│   │   ├── api.ts          # Configuración base de API
│   │   └── auth.service.ts # Ejemplo: lógica de autenticación
│   │
│   ├── store/              # Estado global (Zustand, Redux, etc.)
│   │
│   ├── types/              # Tipos e interfaces TypeScript
│   │
│   └── utils/              # Funciones auxiliares
│ 
│── tests/                   # Tests automatizados
│   ├── components/          # Tests de componentes
│   ├── hooks/               # Tests de hooks
│   ├── services/            # Tests de servicios / API
│   ├── utils/               # Tests de funciones auxiliares
│   └── setup.ts             # Configuración global de tests
│ 
├── assets/                 # Imágenes, fuentes y recursos
│   ├── images/
│   └── fonts/
│
├── .env                    # Variables de entorno locales (NO se sube)
├── .env.example            # Ejemplo de variables requeridas
│
├── .gitignore              # Archivos ignorados por Git
├── app.json                # Configuración de Expo
├── babel.config.js         # Configuración de Babel
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Documentación del proyecto
```
> Nota: Los archivos `.env` no se versionan.  
> Cada desarrollador debe crear su propio `.env` basado en `.env.example`.

---

## Convenciones de código
Estas reglas son obligatorias para mantener el proyecto limpio, escalable y fácil de mantener.

## Responsabilidad de carpetas

### app/

- Contiene únicamente pantallas y navegación (Expo Router)
- Puede usar hooks y componentes
- No contiene lógica de negocio
- No realiza llamadas directas a servicios o APIs

### src/

- Contiene toda la lógica de negocio
- Incluye componentes reutilizables, hooks, servicios y estado global

## Reglas para pantallas (screens)

- Cada pantalla debe enfocarse solo en la presentación y flujo
- Las pantallas NO deben:
  - Manejar lógica compleja
  - Contener lógica de negocio directa
  - Contener más de una responsabilidad

- La lógica debe extraerse a:
  - hooks
  - services
  - store

## Reglas para componentes

- Un componente debe tener una sola responsabilidad
- Evitar componentes con más de 200 líneas
- Componentes reutilizables van en `src/components/ui`

## Reglas para hooks

- Todos los hooks personalizados deben iniciar con `use`
- Un hook debe manejar una sola lógica
- No duplicar lógica entre hooks
- Los hooks NO deben contener JSX

## Reglas para servicios
- Los servicios NO renderizan UI
- Los servicios solo:
  - obtienen datos
  - procesan información
  - manejan comunicación externa
- Todas las llamadas a APIs deben pasar por `src/services`

### Ejemplo

```bash
git commit -m "feat: agregar pantalla de login"
```

### Uso obligatorio de alias en imports

No usar imports relativos largos:

```ts
import Button from "../../../components/ui/Button";
```

Usar alias definidos en tsconfig.json:

```ts
import { Button } from "@/src/components";
```

## Componentes reutilizables
- Todos los componentes deben estar en src/components
- Los componentes UI (Button, Input, Card, etc.) van en components/ui
- Los componentes de layout (Header, Container, etc.) van en components/layout
- Se debe usar index.ts para exportaciones

## Convención de nombres

| Elemento    | Convención     | Ejemplo           |
| ----------- | -------------- | ----------------- |
| Componentes | PascalCase     | `LoginForm.tsx`   |
| Hooks       | useSomething   | `useAuth.ts`      |
| Servicios   | xxx.service.ts | `auth.service.ts` |
| Store       | xxx.store.ts   | `auth.store.ts`   |
| Tipos       | PascalCase     | `User.ts`         |
| Utilidades  | camelCase      | `formatDate.ts`   |

### Documentación del código
- Todo código nuevo relevante debe estar documentado
- Todo archivo, función o componente nuevo debe explicar:
  - **Qué hace**
  - **Cómo funciona**
  - **Por qué existe**
- La documentación debe realizarse mediante:
  - Comentarios claros en el código
  - Tipado correcto con TypeScript
  - Nombres descriptivos de variables y funciones

El código debe poder entenderse sin necesidad de explicación verbal.

## Formato y estilo de código
- El código debe mantener un formato consistente
- Se recomienda usar el formateador configurado en el proyecto
- No se aceptan PRs con formato inconsistente o difícil de leer

## Dependencias del proyecto

Este proyecto documenta de forma explícita todas las librerías utilizadas, su propósito y las reglas para agregar nuevas dependencias.

- Toda dependencia instalada debe documentarse en `DEPENDENCIES.md`
- No se permite instalar librerías sin justificar su uso
- `package.json` y `DEPENDENCIES.md` deben mantenerse sincronizados

**Listado completo y reglas de uso:**  
[Ver DEPENDENCIES.md](./DEPENDENCIES.md)

> Ninguna dependencia puede agregarse al proyecto sin ser documentada.

---

## Calidad y Testing

La calidad del código es responsabilidad de todo el equipo.

### Reglas generales
- Todo código nuevo debe:
  - Compilar sin errores
  - Pasar el tipado de TypeScript
  - No romper funcionalidades existentes
- No se permite hacer merge con errores de TypeScript

### Pruebas manuales obligatorias
Antes de subir un PR, el desarrollador debe:
- Ejecutar la app con Expo
- Probar manualmente el flujo afectado
- Verificar navegación, estados y errores comunes

```bash
npx expo start
````

## Errores y logs
- No se permiten console.log en producción
- Se permiten logs temporales solo durante desarrollo
- Todo log debe eliminarse antes del merge

## Limpieza de código
- No dejar:
  - Código comentado sin uso
  - Archivos sin referencia
  - Imports no utilizados
- Si un archivo ya no se usa, debe eliminarse
- No duplicar lógica: reutilizar hooks, utils o servicios existentes

## Complejidad y tamaño de archivos
- Un archivo no debe exceder:
  - 200 líneas para componentes
  - 150 líneas para hooks
- Si un archivo crece demasiado:
  - Debe dividirse
  - O refactorizarse en funciones auxiliares
 
## Nuevas funcionalidades
Antes de empezar una nueva feature:
- Confirmar que no exista ya algo similar
- Definir claramente:
  - Qué problema resuelve
  - Qué archivos tocará
- Dividir la funcionalidad en tareas pequeñas

---

## GitHub Flow – Guía de Trabajo del Proyecto

Este repositorio utiliza **GitHub Flow** como flujo de trabajo para el desarrollo de UrbanGO.

## Convención de commits (recomendado)

Para mantener un historial de cambios claro y entendible, se debe usar el siguiente formato:

### Tipos de commit permitidos

- **feat**: nueva funcionalidad
- **fix**: corrección de errores
- **refactor**: cambios internos sin afectar la funcionalidad
- **chore**: tareas de mantenimiento
- **docs**: cambios en documentación

## Objetivo del flujo

- Reducir errores
- Evitar conflictos de código
- Mantener siempre una versión estable de la app
- Facilitar el trabajo en equipo

## Estructura de ramas

Existe **una rama principal** y varias ramas temporales para el desarrollo:

| Rama        | Descripción                                 |
| ----------- | ------------------------------------------- |
| `main`      | Rama principal y estable                    |
| `feature/*` | Nuevas funcionalidades                      |
| `fix/*`     | Corrección de errores                       |
| `chore/*`   | Configuración, dependencias o mantenimiento |

### Ejemplos

```bash
feature/login-screen
feature/profile-api
fix/navigation-bug
chore/update-expo
```

## Rama main

La rama main siempre debe estar estable:

- El proyecto debe compilar correctamente en Expo
- No debe contener código experimental
- Está protegida (no se permite push directo)

> Nadie debe hacer push directo a main
> Todos los cambios entran mediante Pull Requests

## Flujo de trabajo diario

1. Actualizar main
   Antes de empezar cualquier tarea:

```bash
git checkout main
git pull origin main
```

2. Crear una rama para la tarea
   Cada tarea debe tener su propia rama:

```bash
git checkout -b feature/nombre-de-la-tarea
```

3. Trabajar y hacer commits
   Hacer commits pequeños y descriptivos.
   **Convención de commits**

```bash
feat: nueva funcionalidad
fix: corrección de bug
chore: configuración o mantenimiento
refactor: refactor sin cambiar funcionalidad
```

Ejemplo

```bash
feat: agregar pantalla de login
```

4. Subir la rama a GitHub

```bash
git push origin feature/nombre-de-la-tarea
```

5. Crear Pull Request (PR)
   Desde GitHub:

- Crear Pull Request hacia main
- Asignar al menos 1 revisor
  > Checklist antes del merge
- npx expo start corre sin errores
- No hay console.log innecesarios
- TypeScript sin errores
- No se subieron archivos sensibles (.env)
- El PR hace una sola cosa

6. Merge a main
   Una vez aprobado el PR:

- Se hace merge a main
- Se elimina la rama
  Esto mantiene el repositorio limpio y ordenado.

---

## Pull Requests

Todo cambio al proyecto debe realizarse mediante un Pull Request.

### Reglas obligatorias

- Un PR debe resolver **una sola tarea**
- El PR debe apuntar a `main`
- No se permite hacer push directo a `main`
- Al menos 1 revisor debe aprobar el PR

> Todo Pull Request debe confirmar el cumplimiento de estas reglas usando el PR Template.

### Checklist obligatorio

Antes de marcar un PR como listo:

- [ ] `npx expo start` corre sin errores
- [ ] No hay `console.log` innecesarios
- [ ] TypeScript sin errores
- [ ] No se subieron archivos sensibles (.env)
- [ ] El cambio está documentado si aplica

## Definición de Terminado
Una tarea se considera terminada cuando:
- El código cumple las convenciones del proyecto
- Está integrado mediante Pull Request
- Fue revisado y aprobado
- No rompe funcionalidades existentes
- No introduce deuda técnica innecesaria

---

## Variables de entorno
- Las variables sensibles deben definirse únicamente en archivos `.env`
- El archivo `.env` **NUNCA** debe subirse al repositorio
- El proyecto debe incluir un `.env.example` con las variables requeridas
- Cada desarrollador es responsable de configurar su entorno local

## Seguridad
- No subir:
  - Tokens
  - API keys
  - Credenciales
- No hardcodear URLs sensibles
- Toda configuración sensible va en `.env`

---

## Comunicación del equipo
- Avisar cuando se trabaje en archivos críticos
- No modificar archivos ajenos sin avisar
- Resolver conflictos de merge con cuidado
- Preguntar antes de hacer cambios grandes

---

## Estilos y arquitectura de componentes
Este proyecto organiza los componentes por **dominio funcional** y define reglas claras sobre **dónde deben vivir los estilos**, según el tipo de componente.

---

## Estructura de componentes

```txt
src/
└── components/
    ├── auth/
    │   ├── LoginForm.tsx
    │   ├── RegisterForm.tsx
    │   └── styles.ts (opcional)
    │
    ├── layout/
    │   ├── AppLayout.tsx
    │   ├── Header.tsx
    │   └── Footer.tsx
    │
    ├── main/
    │   ├── flujoprincipal/
    │   │   ├── RouteCard.tsx
    │   │   └── RouteList.tsx
    │   │
    │   └── rutasdecamiones/
    │       ├── BusRouteMap.tsx
    │       └── BusStopItem.tsx
    │
    ├── ui/
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   ├── Input.tsx
    │   └── styles.ts
    │
    └── index.ts
```
Explicación de la arquitectura de componentes

**auth/**

Contiene componentes relacionados con autenticación:

- Formularios de login y registro
- Validaciones visuales
- Componentes que solo se usan durante el proceso de autenticación
> No contiene lógica de navegación ni estilos globales.

**layout/** 

Incluye componentes estructurales reutilizables:

- Layout general de la app
- Headers, footers, contenedores
- Wrappers visuales comunes
> Estos componentes no dependen del negocio, solo de la estructura visual.

**main/**

Agrupa los componentes del flujo principal de la aplicación.
Se divide en subcarpetas por feature o funcionalidad, por ejemplo:
- flujoprincipal/
- rutasdecamiones/
- Los componentes dentro de main:
  - No necesitan carpeta propia si son pequeños
  - Pueden tener estilos en el mismo archivo o en un styles.ts por feature

**ui/**

Componentes UI reutilizables y genéricos:

- Botones
- Cards
- Inputs
- Modales, tabs, etc.
> Son independientes del contexto (auth, main, etc.)
> Aquí sí es válido tener un styles.ts compartido

---

## Convención para componentes UI

- Los componentes UI simples (Button, Card, Input) pueden vivir en un solo archivo.
- Cuando un componente:
  - tenga múltiples variantes
  - tenga lógica compleja
  - requiera tests o tipados propios
  se le debe crear una carpeta propia.

Ejemplo:

```txt
ui/
├── Button.tsx           # componente simple
├── Card.tsx

ui/
├── Button/
│   ├── Button.tsx
│   ├── Button.styles.ts
│   └── index.ts         # componente complejo
```

> Componentes simples → estilos en el mismo archivo
> Componentes complejos → estilos en archivo separado

### Convención de estilos para pantallas

- Cada pantalla debe tener su archivo de estilos separado.
- El archivo de estilos debe estar al mismo nivel que la pantalla.
- El nombre del archivo debe seguir el formato:
  pantalla.styles.ts

Ejemplo:
home.tsx
home.styles.ts

```txt
app/
├── (auth)/
│   ├── login.tsx
│   ├── login.styles.ts
│
├── (main)/
│   ├── home.tsx
│   ├── home.styles.ts
```
> Pantalla y estilos juntos, pero separados en archivos distintos.
