/**
 * POIs Styles
 * --------------------------------
 * Configuración visual de los POIs en el mapa.
 *
 * 🔹 NO contiene lógica
 * 🔹 NO contiene datos
 * 🔹 Solo valores visuales reutilizables
 *
 * Ideal para:
 * - Modo claro / modo oscuro
 * - Ajustes rápidos de diseño
 * - Escalado por zoom (en el futuro)
 */

export const POIS_STYLE = {
  /** Zoom mínimo para mostrar POIs */
  minZoom: 14,
  /**
   * Tamaño base del icono.
   * 1 = tamaño original del asset. */
  iconSize: 0.8,
  /**
   * Permite que los iconos se superpongan.
   * Útil cuando hay muchos POIs juntos. */
  iconAllowOverlap: true,
};
