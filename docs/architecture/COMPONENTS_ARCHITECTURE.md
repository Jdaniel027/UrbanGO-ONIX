# Arquitectura de Componentes y Estilos

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

---

- **[Volver al README principal](../../README.md)**
- **[Convenciones de Código](./CODING_STANDARDS.md)**
- **[Estructura del proyecto](./FOLDER_STRUCTURE.md)**