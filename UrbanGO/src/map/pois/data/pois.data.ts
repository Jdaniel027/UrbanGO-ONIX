/**
 * POIs Data
 * --------------------------------
 * Fuente de datos de los Points Of Interest (POIs).
 *
 * 🔹 Contiene ÚNICAMENTE información (data).
 * 🔹 No debe tener lógica de Mapbox ni estilos.
 * 🔹 Actualmente funciona como mock local.
 *
 * En el futuro:
 * - Puede ser reemplazado por datos de una API
 * - Puede combinarse con datos remotos + cache local
 *
 * Para agregar un nuevo POI:
 * 1. Copia uno existente
 * 2. Cambia id, name, category y coordinates
 * 3. Asegúrate que coordinates sea [lng, lat]
 */

import { POI } from "../types/poi.types";

export const POIS: POI[] = [
  {
    id: "poi-test-1", // Identificador único del POI
    name: "POI de prueba", // Nombre visible o descriptivo
    category: "test", // Se usa para decidir el icono en el mapa
    coordinates: [-108.489001, 25.566315], // [longitud, latitud]
  },
];
