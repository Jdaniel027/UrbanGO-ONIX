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

## Estructura del proyecto
El proyecto utiliza **Expo Router** y una separación clara entre navegación y lógica de negocio.

```txt
UrbanGO/
├── app/                # Rutas y pantallas (Expo Router)
├── src/                # Lógica de la aplicación
│   ├── components/     # Componentes reutilizables
│   ├── constants/      # Constantes globales (tema, colores, config)
│   ├── hooks/          # Custom hooks
│   ├── services/       # Servicios (API, lógica externa)
│   ├── store/          # Estado global
│   ├── types/          # Tipos e interfaces TypeScript
│   └── utils/          # Funciones auxiliares
├── assets/             # Imágenes y recursos
└── tsconfig.
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
  - Consumir servicios directamente
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


## Convenciones del equipo
Para mantener el proyecto ordenado, escalable y evitar conflictos, todas deben seguir las siguientes reglas.

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

## Dependencias

- Toda nueva librería debe ser documentada
- Indicar para qué se usa y por qué se eligió
- No instalar librerías sin justificación

Las dependencias deben documentarse en `DEPENDENCIES.md`.
