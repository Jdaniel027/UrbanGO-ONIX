# GitHub Flow – Guía de Trabajo

Este repositorio utiliza **GitHub Flow** como flujo de trabajo para el desarrollo de UrbanGO.

---


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

---

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

