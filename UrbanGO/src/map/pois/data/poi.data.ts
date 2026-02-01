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
    id: "poi-restaurant-1", // Identificador único del POI
    name: "Taqueria el chapo", // Nombre visible o descriptivo
    category: "restaurant", // Se usa para decidir el icono en el mapa
    coordinates: [-108.48573, 25.566519], // [longitud, latitud]
    importance: "high",
  },
  {
    id: "poi-hospital-1",
    name: "Clinica dental unident",
    category: "hospital",
    coordinates: [-108.484319, 25.56655],
    importance: "high",
  },
  {
    id: "poi-school-1",
    name: "Uadeo",
    category: "school",
    coordinates: [-108.486474, 25.568081],
    importance: "high",
  },
  {
    id: "poi-shop-1",
    name: "Papeleria de occidente",
    category: "shop",
    coordinates: [-108.486299, 25.566688],
    importance: "high",
  },
];
