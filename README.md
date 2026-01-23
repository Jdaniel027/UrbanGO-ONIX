# UrbanGO-ØNIX
UrbanGO es una aplicación móvil que ayuda a los usuarios a elegir la mejor ruta para llegar a un destino utilizando transporte público.  
El sistema analiza las distintas rutas disponibles y selecciona la opción más conveniente considerando:

- La ubicación actual del usuario.
- El punto de partida del camión.
- El destino final.

El objetivo principal es optimizar el tiempo y la experiencia de traslado dentro de la ciudad.

## Tecnologías
- React Native
- Expo
- Expo Router
- TypeScript
- Node.js

## Convenciones del equipo
Para mantener el proyecto ordenado, escalable y evitar conflictos, todos deben seguir las siguientes reglas.

## Estructura del proyecto
El proyecto utiliza **Expo Router** y una separación clara entre navegación y lógica de negocio.

```txt
UrbanGO/
├── app/                  # Rutas y pantallas (Expo Router)
├── src/                  # Lógica de la aplicación
│   ├── components/ui     # Componentes reutilizables
│   ├── constants/        # Constantes globales (tema, colores, config)
│   ├── hooks/            # Custom hooks
│   ├── services/         # Servicios (API, lógica externa)
│   ├── store/            # Estado global
│   ├── types/            # Tipos e interfaces TypeScript
│   └── utils/            # Funciones auxiliares
├── assets/               # Imágenes y recursos
└── tsconfig.json
```

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

## Convención de commits (recomendado)
Para mantener un historial de cambios claro y entendible, se debe usar el siguiente formato:

### Tipos de commit permitidos
- **feat**: nueva funcionalidad
- **fix**: corrección de errores
- **refactor**: cambios internos sin afectar la funcionalidad
- **chore**: tareas de mantenimiento
- **docs**: cambios en documentación

### Ejemplo
```bash
git commit -m "feat: agregar pantalla de login"
```

### Uso obligatorio de alias en imports
No usar imports relativos largos:
``` ts
import Button from '../../../components/ui/Button';
```
Usar alias definidos en tsconfig.json:
```ts
import { Button } from '@/src/components';
```

## Componentes reutilizables
- Todos los componentes deben estar en src/components
- Los componentes UI (Button, Input, Card, etc.) van en components/ui
- Los componentes de layout (Header, Container, etc.) van en components/layout
- Se debe usar index.ts para exportaciones

## Convención de nombres
| Elemento     | Convención     | Ejemplo              |
|-------------|----------------|----------------------|
| Componentes | PascalCase     | `LoginForm.tsx`      |
| Hooks       | useSomething   | `useAuth.ts`         |
| Servicios   | xxx.service.ts | `auth.service.ts`    |
| Store       | xxx.store.ts   | `auth.store.ts`      |
| Tipos       | PascalCase     | `User.ts`            |
| Utilidades  | camelCase      | `formatDate.ts`      |

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

## Dependencias del proyecto
Este proyecto documenta de forma explícita todas las librerías utilizadas, su propósito y las reglas para agregar nuevas dependencias.

- Toda dependencia instalada debe documentarse en `DEPENDENCIES.md`
- No se permite instalar librerías sin justificar su uso
- `package.json` y `DEPENDENCIES.md` deben mantenerse sincronizados
  
**Listado completo y reglas de uso:**  
[Ver DEPENDENCIES.md](./DEPENDENCIES.md)

> Ninguna dependencia puede agregarse al proyecto sin ser documentada.

---

# GitHub Flow – Guía de Trabajo del Proyecto

Este repositorio utiliza **GitHub Flow** como flujo de trabajo para el desarrollo de UrbanGO.

## Objetivo del flujo

- Reducir errores
- Evitar conflictos de código
- Mantener siempre una versión estable de la app
- Facilitar el trabajo en equipo

## Estructura de ramas
Existe **una rama principal** y varias ramas temporales para el desarrollo:

| Rama | Descripción |
|-----|-------------|
| `main` | Rama principal y estable |
| `feature/*` | Nuevas funcionalidades |
| `fix/*` | Corrección de errores |
| `chore/*` | Configuración, dependencias o mantenimiento |

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
