# API Documentation - UrbanGO-ONIX

> **Estado:** En Definición  
> **Backend:** En desarrollo (usar mocks temporalmente)  
> **Última actualización:** 2026-02-12

---

## Propósito

Este documento define los **contratos de API** entre el frontend y el backend de UrbanGO-ONIX. Mientras el backend está en desarrollo, el frontend usará **mocks** que respetan estos contratos.

---

## Configuración Base

### Base URL
```typescript
// Desarrollo
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Producción
const API_BASE_URL = 'https://api.urbango.com/v1';
```

### Headers Comunes
```typescript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-App-Version': '1.0.0',
  'X-Platform': 'android' | 'ios'
}
```

### Autenticación (Futuro)
```typescript
{
  'Authorization': 'Bearer {token}'
}
```

---

## 📍 Endpoints del MVP

### 1. Geocoding - Búsqueda de Destinos

#### `GET /geocoding/search`
Busca lugares y direcciones en Guasave.

**Query Parameters:**
```typescript
{
  query: string;        // Texto de búsqueda (ej: "Plaza Sendero")
  limit?: number;       // Límite de resultados (default: 10)
  lat?: number;         // Latitud para búsqueda cercana
  lng?: number;         // Longitud para búsqueda cercana
}
```

**Response 200:**
```typescript
{
  success: true,
  data: {
    results: Array<{
      id: string;
      name: string;                    // "Plaza Sendero Guasave"
      address: string;                 // "Av. Insurgentes 123, Guasave, Sin."
      coordinates: {
        latitude: number;              // 25.5678
        longitude: number;             // -108.4678
      };
      type: 'place' | 'address' | 'poi';
      distance?: number;               // Distancia en metros si se provee lat/lng
    }>;
    total: number;
  };
}
```

**Response 400:**
```typescript
{
  success: false,
  error: {
    code: 'INVALID_QUERY',
    message: 'El texto de búsqueda debe tener al menos 3 caracteres',
  };
}
```

---

### 2. Routing - Cálculo de Rutas

#### `POST /routes/calculate`
Calcula las mejores rutas desde la ubicación del usuario hasta el destino.

**Request Body:**
```typescript
{
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  preferences?: {
    maxWalkingDistance?: number;     // Metros (default: 500)
    maxTransfers?: number;           // Número de transbordos (default: 2)
    departureTime?: string;          // ISO 8601 (default: ahora)
    arriveBy?: string;               // ISO 8601 (alternativa a departureTime)
    wheelchair?: boolean;            // Rutas accesibles (default: false)
  };
}
```

**Response 200:**
```typescript
{
  success: true,
  data: {
    routes: Array<{
      id: string;                         // "route_abc123"
      name: string;                       // "Ruta Lomas - Centro"
      routeNumber: string;                // "15"
      color: string;                      // "#FF6B35" (color de la línea)
      
      duration: number;                   // Duración total en segundos
      distance: number;                   // Distancia total en metros
      walkingDistance: number;            // Distancia caminando en metros
      
      cost: number;                       // Costo en pesos
      transfers: number;                  // Número de transbordos
      
      departureTimes: Array<string>;      // ["07:30", "08:00", "08:30"]
      
      legs: Array<{
        type: 'walk' | 'bus';
        duration: number;                 // Segundos
        distance: number;                 // Metros
        
        // Para legs de tipo 'walk'
        instructions?: string;            // "Camina hacia el norte"
        
        // Para legs de tipo 'bus'
        routeName?: string;               // "Lomas - Centro"
        routeNumber?: string;             // "15"
        color?: string;                   // "#FF6B35"
        
        from: {
          name: string;                   // "Parada Sendero"
          coordinates: {
            latitude: number;
            longitude: number;
          };
        };
        
        to: {
          name: string;                   // "Parada Central"
          coordinates: {
            latitude: number;
            longitude: number;
          };
        };
        
        geometry: {                       // Línea del recorrido (GeoJSON)
          type: 'LineString';
          coordinates: Array<[number, number]>; // [[lng, lat], ...]
        };
      }>;
      
      geometry: {                         // Geometría completa de la ruta
        type: 'LineString';
        coordinates: Array<[number, number]>;
      };
    }>;
    
    calculatedAt: string;                 // ISO 8601 timestamp
  };
}
```

**Response 400:**
```typescript
{
  success: false,
  error: {
    code: 'NO_ROUTES_FOUND' | 'INVALID_COORDINATES',
    message: string;
  };
}
```

---

### 3. Routes - Información Detallada de Ruta

#### `GET /routes/:routeId`
Obtiene información completa de una ruta específica.

**Path Parameters:**
```typescript
{
  routeId: string;    // "route_abc123"
}
```

**Response 200:**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
    routeNumber: string;
    color: string;
    
    description: string;              // "Ruta que conecta Lomas con el Centro"
    
    schedule: {
      weekdays: {
        firstBus: string;             // "06:00"
        lastBus: string;              // "22:00"
        frequency: number;            // Minutos entre camiones (15)
      };
      saturday: {
        firstBus: string;
        lastBus: string;
        frequency: number;
      };
      sunday: {
        firstBus: string;
        lastBus: string;
        frequency: number;
      };
    };
    
    stops: Array<{
      id: string;
      name: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
      order: number;                  // Orden en la ruta (0, 1, 2...)
      distanceFromPrevious?: number;  // Metros desde parada anterior
    }>;
    
    geometry: {
      type: 'LineString';
      coordinates: Array<[number, number]>;
    };
    
    cost: number;
    estimatedDuration: number;        // Duración total en segundos
    totalDistance: number;            // Distancia total en metros
  };
}
```

---

### 4. Tracking - Ubicación en Tiempo Real

#### `GET /tracking/vehicle/:vehicleId`
Obtiene la ubicación actual de un vehículo.

**Path Parameters:**
```typescript
{
  vehicleId: string;    // "vehicle_xyz789"
}
```

**Response 200:**
```typescript
{
  success: true,
  data: {
    vehicleId: string;
    routeId: string;
    routeNumber: string;              // "15"
    
    location: {
      latitude: number;
      longitude: number;
      heading: number;                // Dirección en grados (0-360)
      speed: number;                  // km/h
    };
    
    timestamp: string;                // ISO 8601
    
    nextStop: {
      id: string;
      name: string;
      estimatedArrival: string;       // ISO 8601
      distanceInMeters: number;
    };
    
    occupancy: 'low' | 'medium' | 'high' | 'full';  // Nivel de ocupación
    
    status: 'active' | 'stopped' | 'delayed';
    delay?: number;                   // Retraso en segundos (si aplica)
  };
}
```

#### `GET /tracking/route/:routeId/vehicles`
Obtiene todos los vehículos activos de una ruta.

**Response 200:**
```typescript
{
  success: true,
  data: {
    routeId: string;
    routeNumber: string;
    vehicles: Array<{
      vehicleId: string;
      location: {
        latitude: number;
        longitude: number;
        heading: number;
        speed: number;
      };
      timestamp: string;
      nextStop: {
        id: string;
        name: string;
        estimatedArrival: string;
      };
      occupancy: string;
      status: string;
    }>;
    lastUpdated: string;
  };
}
```

---

### 5. Stops - Información de Paradas

#### `GET /stops/:stopId`
Obtiene información de una parada específica.

**Response 200:**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    
    routes: Array<{
      routeId: string;
      routeNumber: string;
      routeName: string;
      color: string;
    }>;
    
    amenities: {
      bench: boolean;
      shelter: boolean;
      lighting: boolean;
      wheelchair: boolean;
    };
  };
}
```

---

## Códigos de Error

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request (validación fallida)
- `401` - Unauthorized (autenticación requerida)
- `403` - Forbidden (sin permisos)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error
- `503` - Service Unavailable

### Error Response Format
```typescript
{
  success: false,
  error: {
    code: string;           // Código interno del error
    message: string;        // Mensaje legible para el usuario
    details?: any;          // Detalles adicionales (solo en dev)
  };
}
```

### Códigos de Error Comunes
| Código | Descripción |
|--------|-------------|
| `INVALID_COORDINATES` | Coordenadas fuera de rango o inválidas |
| `NO_ROUTES_FOUND` | No se encontraron rutas para los parámetros dados |
| `INVALID_QUERY` | Query de búsqueda inválido |
| `ROUTE_NOT_FOUND` | Ruta no encontrada |
| `VEHICLE_NOT_FOUND` | Vehículo no encontrado o inactivo |
| `STOP_NOT_FOUND` | Parada no encontrada |
| `SERVICE_UNAVAILABLE` | Servicio temporalmente no disponible |
| `RATE_LIMIT_EXCEEDED` | Límite de peticiones excedido |

---

## Polling y WebSocket (Tracking)

### Opción 1: Polling (MVP Simple)
```typescript
// Actualizar cada 5-10 segundos
const intervalId = setInterval(() => {
  fetchVehicleLocation(vehicleId);
}, 5000);
```

### Opción 2: WebSocket (Ideal)
```typescript
// Conectar a WebSocket para updates en tiempo real
const ws = new WebSocket('wss://api.urbango.com/v1/tracking/stream');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // { type: 'vehicle_update', vehicleId: '...', location: {...} }
};
```

---

## Testing con Mocks

### Activar/Desactivar Mocks
```typescript
// .env
EXPO_PUBLIC_USE_MOCKS=true  // Usar mocks
EXPO_PUBLIC_USE_MOCKS=false // Usar API real
```

### Implementación
```typescript
// src/services/api/apiClient.ts
import { mockService } from './mockService';

export const apiClient = {
  async request(endpoint: string, options: RequestInit) {
    if (process.env.EXPO_PUBLIC_USE_MOCKS === 'true') {
      return mockService.handle(endpoint, options);
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return response.json();
  }
};
```

---

## Notas para el Equipo Backend

1. **Priorizar endpoints del MVP:**
   - `/geocoding/search`
   - `/routes/calculate`
   - `/routes/:routeId`
   - `/tracking/vehicle/:vehicleId`

2. **Validaciones importantes:**
   - Coordenadas dentro del área de Guasave
   - Fechas en formato ISO 8601
   - Límite de búsqueda (max 50 resultados)

3. **Performance:**
   - Cálculo de rutas < 3 segundos
   - Cache de rutas frecuentes
   - Rate limiting: 100 requests/min por IP

4. **Seguridad:**
   - CORS configurado para app móvil
   - Rate limiting
   - Validación de inputs
   - No exponer datos sensibles de vehículos

---

## Referencias

- [Documentación de OpenTripPlanner](https://docs.opentripplanner.org/)
- [GeoJSON Specification](https://geojson.org/)
- [ISO 8601 Date Format](https://en.wikipedia.org/wiki/ISO_8601)

---

**Próximos pasos:**
- [ ] Validar contratos con equipo backend
- [ ] Implementar mocks en `src/services/api/mockService.ts`
- [ ] Crear tipos TypeScript en `src/types/api.types.ts`
- [ ] Testing de integración
