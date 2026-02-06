/**
 * MapStyles
 * ----------
 * Centraliza los estilos visuales del mapa.
 *
 * 🔹 Permite modificar colores y estilos sin tocar lógica.
 * 🔹 Facilita el uso de temas (claro / oscuro).
 *
 * Responsabilidades:
 * - Definir estilos para:
 *   - Rutas
 *   - Camiones
 *   - Capas del mapa
 * - Centralizar colores y tamaños
 *
 * Ejemplos:
 * - Color de las rutas
 * - Grosor de líneas
 * - Estilo de íconos
 *
 * Nota:
 * - No contiene componentes
 * - Solo exporta configuraciones visuales
 */

export const POI_COLORS = {
  restaurant: "#D64545",
  hospital: "#1C6ED5",
  school: "#2E8B57",
  shop: "#F2A900",
  stop: "#6B7280",
} as const;
