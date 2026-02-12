# Obstáculos Técnicos – UrbanGO

Esta lista documenta problemas técnicos conocidos, sus causas, impacto y posibles soluciones futuras.

## Formato

- **Título corto del problema**
- Contexto
- Impacto
- Workaround actual
- Próximos pasos / decisión pendiente

---

## Ejemplo

### Builds nativos lentos con Expo Dev Client

- **Contexto:** Al generar el APK de Expo Dev Build, el proceso de build puede tardar varios minutos en algunas máquinas (sobre todo con discos lentos o OneDrive activo).

- **Impacto:**
  - Retrasa la entrega de nuevos APK al equipo.
  - Hace más costoso probar cambios en dependencias nativas (Mapbox, permisos, etc.).

- **Workaround actual:**
  - Evitar tener el proyecto dentro de OneDrive u otras carpetas sincronizadas.
  - Cerrar Android Studio cuando no sea necesario.
  - Reutilizar el mismo APK mientras solo cambie código JS/TS.

- **Próximos pasos:**
  - Medir tiempos de build en diferentes máquinas y documentar configuración recomendada.
  - Evaluar uso de CI (Github Actions) para generar APKs y sacarlos de las laptops de los devs.

---

- **[Volver a CONTRIBUTING](../CONTRIBUTING.md)**
