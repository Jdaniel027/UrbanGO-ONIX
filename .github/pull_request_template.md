# Descripción del Pull Request

## ¿Qué hace este PR?

Describe de forma clara y concisa el cambio realizado.

Ejemplos:

- Agrega pantalla de login
- Corrige bug en navegación
- Refactoriza servicio de autenticación

---

## Tipo de cambio

Marca con una `x` lo que aplique:

- [ ] Nueva funcionalidad (feature)
- [ ] Corrección de error (fix)
- [ ] Refactorización (sin cambio de funcionalidad)
- [ ] Mantenimiento / configuración (chore)
- [ ] Documentación

---

## ¿Cómo se probó?

Indica cómo verificaste que el cambio funciona correctamente:

- [ ] Se ejecutó la app con Expo
- [ ] Se probó manualmente el flujo afectado
- [ ] No rompe funcionalidades existentes

### Detalles de pruebas (si aplica)

Describe brevemente las pruebas realizadas:

---

## Checklist obligatorio antes del merge

Marca TODO antes de solicitar revisión:

- [ ] `npx expo start` corre sin errores
- [ ] No hay `console.log` innecesarios
- [ ] TypeScript sin errores
- [ ] No se subieron archivos sensibles (`.env`)
- [ ] El PR hace **una sola cosa**
- [ ] El código sigue las convenciones del proyecto
- [ ] El cambio está documentado si aplica

---

## Áreas afectadas

Marca lo que aplique:

- [ ] Pantallas (`app/`)
- [ ] Componentes UI
- [ ] Hooks
- [ ] Servicios / API
- [ ] Store / Estado global
- [ ] Configuración
- [ ] Documentación

---

## Cumplimiento de reglas del proyecto

Confirma que este PR cumple con las reglas establecidas en el proyecto:

- [ ] Leí y seguí las reglas definidas en el `README.md`
- [ ] Cumplí las convenciones descritas en `CONTRIBUTING.md`
- [ ] El código es claro, limpio y legible
- [ ] El código está comentado solo donde es necesario
- [ ] No hay código muerto o innecesario
- [ ] No se rompió la arquitectura definida

---

## Notas para el revisor

¿Hay algo que el revisor deba tomar en cuenta?

- Decisiones técnicas importantes
- Posibles riesgos
- Pendientes futuros

---

## Contexto adicional

Agrega capturas de pantalla (antes/después), enlaces o cualquier contexto adicional relevante.
