# Estructura del proyecto – UrbanGO

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

---

- **[Volver a CONTRIBUTING](../CONTRIBUTING.md)**
- **[Arquitectura de Componentes y Estilos](./COMPONENTS_ARCHITECTURE.md)**
