# Guía de Pull Requests

Todo cambio al proyecto debe realizarse mediante un Pull Request.

---


## Reglas obligatorias

- Un PR debe resolver **una sola tarea**
- El PR debe apuntar a `main`
- No se permite hacer push directo a `main`
- Al menos 1 revisor debe aprobar el PR

> Todo Pull Request debe confirmar el cumplimiento de estas reglas usando el PR Template.

## Checklist obligatorio

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

[Volver a CONTRIBUTING](../CONTRIBUTING.md)
