# Guía de Testing - UrbanGO-ONIX

## 📋 Tabla de Contenidos

1. [Filosofía de Testing](#filosofía-de-testing)
2. [Setup del Entorno](#setup-del-entorno)
3. [Estructura de Tests](#estructura-de-tests)
4. [Tipos de Tests y Ejemplos](#tipos-de-tests-y-ejemplos)
5. [Coverage Goals](#coverage-goals)
6. [Qué Testear y Qué No](#qué-testear-y-qué-no)
7. [Fixtures y Mocks Helpers](#fixtures-y-mocks-helpers)
8. [Debugging Tips](#debugging-tips)
9. [Checklist de PR](#checklist-de-pr)

---

## Filosofía de Testing

### La Pirámide de Testing

En UrbanGO-ONIX seguimos la pirámide de testing, priorizando velocidad, mantenibilidad y confianza:

```
        /\
       /  \      E2E Tests (5-10%)
      /----\     - Flujos críticos end-to-end
     /      \    - Smoke tests
    /--------\   Integration Tests (20-30%)
   /          \  - Integración entre componentes
  /------------\ - Hooks con estado compartido
 /--------------\ Unit Tests (60-75%)
/                \ - Funciones puras
------------------  - Componentes individuales
                    - Utilidades y helpers
```

### Principios Fundamentales

1. **Tests como documentación**: Los tests deben ser legibles y explicar el comportamiento esperado
2. **AAA Pattern**: Arrange (preparar), Act (actuar), Assert (verificar)
3. **Test behavior, not implementation**: Probar qué hace el código, no cómo lo hace
4. **Fast feedback**: Los tests unitarios deben ser rápidos (<1s cada uno)
5. **Isolation**: Cada test debe ser independiente y no afectar a otros
6. **Realistic**: Usar datos y escenarios realistas, evitar mocks innecesarios

---

## Setup del Entorno

### Dependencias Instaladas

```json
{
  "@testing-library/react-native": "^12.0.0",
  "@testing-library/jest-native": "^5.4.0",
  "jest": "^29.0.0",
  "react-test-renderer": "18.2.0",
  "@types/jest": "^29.0.0"
}
```

### Configuración de Jest

**jest.config.js**

```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@rnmapbox/maps)/)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,ts}',
    '!src/types/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  testMatch: [
    '**/__tests__/**/*.(test|spec).[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/'
  ]
};
```

**jest.setup.js**

```javascript
import 'react-native-gesture-handler/jestSetup';

// Mock de React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock de @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'Icon',
  FontAwesome: 'Icon',
  Ionicons: 'Icon',
  AntDesign: 'Icon',
  Feather: 'Icon',
}));

// Mock de Geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;

// Mock de react-native-maps
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    Marker: View,
    Polyline: View,
    PROVIDER_GOOGLE: 'google',
  };
});

// Suprimir warnings específicos en tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Global test timeout
jest.setTimeout(10000);
```

### Scripts de NPM

Agregar en **package.json**:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:update": "jest --updateSnapshot",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand"
  }
}
```

---

## Estructura de Tests

### Organización de Archivos

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx          # Test del componente
│   │   └── index.ts
│   └── MapView/
│       ├── MapView.tsx
│       ├── MapView.test.tsx
│       └── __tests__/
│           └── MapView.integration.test.tsx  # Test de integración
├── hooks/
│   ├── useLocation.ts
│   └── useLocation.test.ts
├── utils/
│   ├── validation.ts
│   └── validation.test.ts
├── services/
│   ├── api/
│   │   ├── routes.ts
│   │   └── routes.test.ts
│   └── __tests__/
│       └── api.integration.test.ts
└── __tests__/
    ├── fixtures/                     # Datos de prueba compartidos
    │   ├── routes.ts
    │   ├── users.ts
    │   └── vehicles.ts
    └── helpers/                      # Utilidades de testing
        ├── render.tsx                # Custom render con providers
        ├── mocks.ts                  # Mocks compartidos
        └── test-utils.ts
```

### Convenciones de Nombres

- **Unit tests**: `ComponentName.test.tsx` o `functionName.test.ts`
- **Integration tests**: `Feature.integration.test.tsx`
- **E2E tests**: `UserFlow.e2e.test.tsx`
- **Mocks**: `__mocks__/moduleName.ts`
- **Fixtures**: `__tests__/fixtures/dataType.ts`

### Anatomía de un Test

```typescript
// MALO ❌
test('works', () => {
  const result = doSomething();
  expect(result).toBe(true);
});

// BUENO ✅
describe('calculateFare', () => {
  it('should calculate base fare for trips under 5km', () => {
    // Arrange
    const distance = 3.5; // km
    const duration = 15; // minutes
    const vehicleType = 'standard';

    // Act
    const fare = calculateFare({ distance, duration, vehicleType });

    // Assert
    expect(fare).toEqual({
      base: 50,
      distance: 35,
      time: 15,
      total: 100,
      currency: 'MXN'
    });
  });

  it('should apply surge pricing during peak hours', () => {
    // Arrange
    const mockDate = new Date('2024-01-15T08:30:00'); // Hora pico
    jest.useFakeTimers().setSystemTime(mockDate);
    
    const tripData = {
      distance: 5,
      duration: 20,
      vehicleType: 'standard'
    };

    // Act
    const fare = calculateFare(tripData);

    // Assert
    expect(fare.surgMultiplier).toBe(1.5);
    expect(fare.total).toBeGreaterThan(150);
    
    // Cleanup
    jest.useRealTimers();
  });
});
```

---

## Tipos de Tests y Ejemplos

### 1. Unit Tests - Funciones Puras

**src/utils/validation.ts**

```typescript
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  // Formato mexicano: +52 1234567890 o 1234567890
  const phoneRegex = /^(\+52)?[1-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
```

**src/utils/validation.test.ts**

```typescript
import { validateEmail, validatePhoneNumber, sanitizeInput } from './validation';

describe('validation utils', () => {
  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.user@domain.co.mx',
        'admin+tag@company.org'
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should return false for invalid email addresses', () => {
      const invalidEmails = [
        '',
        'not-an-email',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example'
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('validatePhoneNumber', () => {
    it('should validate Mexican phone numbers with country code', () => {
      expect(validatePhoneNumber('+525512345678')).toBe(true);
    });

    it('should validate Mexican phone numbers without country code', () => {
      expect(validatePhoneNumber('5512345678')).toBe(true);
    });

    it('should handle phone numbers with spaces', () => {
      expect(validatePhoneNumber('+52 55 1234 5678')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhoneNumber('123')).toBe(false);
      expect(validatePhoneNumber('0512345678')).toBe(false); // No puede empezar con 0
      expect(validatePhoneNumber('abcd1234567')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('should remove potentially dangerous HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        'scriptalert("xss")/script'
      );
    });

    it('should preserve safe characters', () => {
      expect(sanitizeInput('Hello, World! 123')).toBe('Hello, World! 123');
    });
  });
});
```

### 2. Component Tests - UI Components

**src/components/Button/Button.tsx**

```typescript
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  testID = 'button'
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        isDisabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" testID={`${testID}-loader`} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#6C757D',
  },
  danger: {
    backgroundColor: '#DC3545',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**src/components/Button/Button.test.tsx**

```typescript
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('should render with title', () => {
    render(<Button title="Click me" onPress={jest.fn()} />);
    
    expect(screen.getByText('Click me')).toBeOnTheScreen();
  });

  it('should call onPress when pressed', () => {
    const handlePress = jest.fn();
    render(<Button title="Press" onPress={handlePress} />);

    fireEvent.press(screen.getByTestId('button'));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const handlePress = jest.fn();
    render(<Button title="Disabled" onPress={handlePress} disabled />);

    fireEvent.press(screen.getByTestId('button'));

    expect(handlePress).not.toHaveBeenCalled();
  });

  it('should show loading indicator when loading', () => {
    render(<Button title="Submit" onPress={jest.fn()} loading />);

    expect(screen.getByTestId('button-loader')).toBeOnTheScreen();
    expect(screen.queryByText('Submit')).not.toBeOnTheScreen();
  });

  it('should apply correct styles for different variants', () => {
    const { rerender } = render(
      <Button title="Primary" onPress={jest.fn()} variant="primary" />
    );
    
    let button = screen.getByTestId('button');
    expect(button).toHaveStyle({ backgroundColor: '#007AFF' });

    rerender(<Button title="Danger" onPress={jest.fn()} variant="danger" />);
    button = screen.getByTestId('button');
    expect(button).toHaveStyle({ backgroundColor: '#DC3545' });
  });

  it('should have proper accessibility attributes', () => {
    render(<Button title="Accessible Button" onPress={jest.fn()} />);

    const button = screen.getByTestId('button');
    expect(button).toHaveAccessibilityRole('button');
    expect(button).toHaveAccessibilityLabel('Accessible Button');
  });

  it('should indicate disabled state in accessibility', () => {
    render(<Button title="Disabled" onPress={jest.fn()} disabled />);

    const button = screen.getByTestId('button');
    expect(button).toHaveAccessibilityState({ disabled: true });
  });
});
```

### 3. Hook Tests - Custom Hooks

**src/hooks/useLocation.ts**

```typescript
import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

interface Location {
  latitude: number;
  longitude: number;
}

interface UseLocationResult {
  location: Location | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = () => {
    setLoading(true);
    setError(null);

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, error, loading, refetch: fetchLocation };
}
```

**src/hooks/useLocation.test.ts**

```typescript
import { renderHook, waitFor } from '@testing-library/react-native';
import Geolocation from '@react-native-community/geolocation';
import { useLocation } from './useLocation';

jest.mock('@react-native-community/geolocation');

describe('useLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch location on mount', async () => {
    const mockPosition = {
      coords: {
        latitude: 19.4326,
        longitude: -99.1332,
      },
    };

    (Geolocation.getCurrentPosition as jest.Mock).mockImplementation(
      (success) => success(mockPosition)
    );

    const { result } = renderHook(() => useLocation());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.location).toEqual({
      latitude: 19.4326,
      longitude: -99.1332,
    });
    expect(result.current.error).toBeNull();
  });

  it('should handle geolocation errors', async () => {
    const mockError = { message: 'Location permission denied' };

    (Geolocation.getCurrentPosition as jest.Mock).mockImplementation(
      (_, error) => error(mockError)
    );

    const { result } = renderHook(() => useLocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBe('Location permission denied');
  });

  it('should refetch location when refetch is called', async () => {
    const mockPosition1 = {
      coords: { latitude: 19.4326, longitude: -99.1332 },
    };
    const mockPosition2 = {
      coords: { latitude: 19.5000, longitude: -99.2000 },
    };

    (Geolocation.getCurrentPosition as jest.Mock)
      .mockImplementationOnce((success) => success(mockPosition1))
      .mockImplementationOnce((success) => success(mockPosition2));

    const { result } = renderHook(() => useLocation());

    await waitFor(() => {
      expect(result.current.location).toEqual({
        latitude: 19.4326,
        longitude: -99.1332,
      });
    });

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.location).toEqual({
        latitude: 19.5000,
        longitude: -99.2000,
      });
    });

    expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(2);
  });

  it('should pass correct options to Geolocation', () => {
    (Geolocation.getCurrentPosition as jest.Mock).mockImplementation(
      (success) => success({ coords: { latitude: 0, longitude: 0 } })
    );

    renderHook(() => useLocation());

    expect(Geolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
});
```

### 4. Integration Tests - Feature Flow

**src/screens/__tests__/TripBooking.integration.test.tsx**

```typescript
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { TripBookingScreen } from '../TripBookingScreen';
import { createTestProviders } from '@/__tests__/helpers/render';
import * as api from '@/services/api/routes';

jest.mock('@/services/api/routes');

describe('TripBookingScreen - Integration', () => {
  const mockApiRoutes = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should complete full trip booking flow', async () => {
    // Mock API responses
    mockApiRoutes.searchVehicles.mockResolvedValue([
      { id: 'v1', type: 'standard', driver: 'Juan Pérez', eta: 5 },
      { id: 'v2', type: 'premium', driver: 'María López', eta: 8 },
    ]);

    mockApiRoutes.calculateFare.mockResolvedValue({
      base: 50,
      distance: 75,
      time: 30,
      total: 155,
      currency: 'MXN',
    });

    mockApiRoutes.bookTrip.mockResolvedValue({
      id: 'trip-123',
      status: 'confirmed',
      driver: { name: 'Juan Pérez', phone: '+525512345678' },
      vehicle: { plate: 'ABC-123', model: 'Toyota Corolla' },
    });

    const TestProviders = createTestProviders({
      initialState: {
        user: { id: 'user-1', name: 'Test User' },
        location: { latitude: 19.4326, longitude: -99.1332 },
      },
    });

    render(
      <TestProviders>
        <TripBookingScreen />
      </TestProviders>
    );

    // Step 1: Enter pickup location
    const pickupInput = screen.getByTestId('pickup-input');
    fireEvent.changeText(pickupInput, 'Reforma 222, CDMX');

    // Step 2: Enter destination
    const destinationInput = screen.getByTestId('destination-input');
    fireEvent.changeText(destinationInput, 'Aeropuerto CDMX');

    // Step 3: Search for vehicles
    const searchButton = screen.getByText('Buscar vehículo');
    fireEvent.press(searchButton);

    // Wait for vehicles to load
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeOnTheScreen();
    });

    expect(mockApiRoutes.searchVehicles).toHaveBeenCalledWith({
      pickup: 'Reforma 222, CDMX',
      destination: 'Aeropuerto CDMX',
    });

    // Step 4: Select vehicle
    const standardVehicle = screen.getByTestId('vehicle-v1');
    fireEvent.press(standardVehicle);

    // Step 5: Confirm booking
    await waitFor(() => {
      expect(screen.getByText('$155 MXN')).toBeOnTheScreen();
    });

    const confirmButton = screen.getByText('Confirmar viaje');
    fireEvent.press(confirmButton);

    // Step 6: Verify booking confirmation
    await waitFor(() => {
      expect(screen.getByText('¡Viaje confirmado!')).toBeOnTheScreen();
      expect(screen.getByText('Juan Pérez')).toBeOnTheScreen();
      expect(screen.getByText('ABC-123')).toBeOnTheScreen();
    });

    expect(mockApiRoutes.bookTrip).toHaveBeenCalledWith({
      vehicleId: 'v1',
      pickup: 'Reforma 222, CDMX',
      destination: 'Aeropuerto CDMX',
      userId: 'user-1',
    });
  });

  it('should handle booking errors gracefully', async () => {
    mockApiRoutes.searchVehicles.mockRejectedValue(
      new Error('No vehicles available in your area')
    );

    const TestProviders = createTestProviders();

    render(
      <TestProviders>
        <TripBookingScreen />
      </TestProviders>
    );

    fireEvent.changeText(screen.getByTestId('pickup-input'), 'Location A');
    fireEvent.changeText(screen.getByTestId('destination-input'), 'Location B');
    fireEvent.press(screen.getByText('Buscar vehículo'));

    await waitFor(() => {
      expect(
        screen.getByText('No vehicles available in your area')
      ).toBeOnTheScreen();
    });
  });
});
```

### 5. Service/API Tests

**src/services/api/routes.test.ts**

```typescript
import { calculateRoute, searchNearbyDrivers } from './routes';
import { apiClient } from './client';

jest.mock('./client');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('routes service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateRoute', () => {
    it('should calculate route with distance and duration', async () => {
      const mockResponse = {
        data: {
          distance: 5.2,
          duration: 18,
          polyline: 'encoded_polyline_string',
          steps: [
            { instruction: 'Turn left on Main St', distance: 0.5 },
            { instruction: 'Continue straight', distance: 4.7 },
          ],
        },
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const origin = { latitude: 19.4326, longitude: -99.1332 };
      const destination = { latitude: 19.4520, longitude: -99.1500 };

      const result = await calculateRoute(origin, destination);

      expect(mockApiClient.post).toHaveBeenCalledWith('/routes/calculate', {
        origin,
        destination,
        mode: 'driving',
      });

      expect(result).toEqual({
        distance: 5.2,
        duration: 18,
        polyline: 'encoded_polyline_string',
        steps: expect.any(Array),
      });
    });

    it('should handle API errors', async () => {
      mockApiClient.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: 'Invalid coordinates' },
        },
      });

      const origin = { latitude: 200, longitude: -99.1332 }; // Invalid
      const destination = { latitude: 19.4520, longitude: -99.1500 };

      await expect(calculateRoute(origin, destination)).rejects.toThrow(
        'Invalid coordinates'
      );
    });

    it('should retry on network failure', async () => {
      mockApiClient.post
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          data: { distance: 5.2, duration: 18, polyline: 'test' },
        });

      const origin = { latitude: 19.4326, longitude: -99.1332 };
      const destination = { latitude: 19.4520, longitude: -99.1500 };

      const result = await calculateRoute(origin, destination, {
        retries: 3,
      });

      expect(mockApiClient.post).toHaveBeenCalledTimes(3);
      expect(result.distance).toBe(5.2);
    });
  });

  describe('searchNearbyDrivers', () => {
    it('should return available drivers within radius', async () => {
      const mockDrivers = [
        {
          id: 'd1',
          name: 'Carlos Méndez',
          location: { latitude: 19.433, longitude: -99.134 },
          rating: 4.8,
          vehicleType: 'standard',
        },
        {
          id: 'd2',
          name: 'Ana Torres',
          location: { latitude: 19.431, longitude: -99.132 },
          rating: 4.9,
          vehicleType: 'premium',
        },
      ];

      mockApiClient.get.mockResolvedValue({ data: mockDrivers });

      const userLocation = { latitude: 19.4326, longitude: -99.1332 };
      const drivers = await searchNearbyDrivers(userLocation, 2000); // 2km

      expect(mockApiClient.get).toHaveBeenCalledWith('/drivers/nearby', {
        params: {
          latitude: 19.4326,
          longitude: -99.1332,
          radius: 2000,
        },
      });

      expect(drivers).toHaveLength(2);
      expect(drivers[0].name).toBe('Carlos Méndez');
    });

    it('should filter drivers by vehicle type', async () => {
      mockApiClient.get.mockResolvedValue({
        data: [
          { id: 'd1', vehicleType: 'premium' },
          { id: 'd2', vehicleType: 'premium' },
        ],
      });

      const userLocation = { latitude: 19.4326, longitude: -99.1332 };
      const drivers = await searchNearbyDrivers(userLocation, 2000, {
        vehicleType: 'premium',
      });

      expect(mockApiClient.get).toHaveBeenCalledWith('/drivers/nearby', {
        params: {
          latitude: 19.4326,
          longitude: -99.1332,
          radius: 2000,
          vehicleType: 'premium',
        },
      });

      expect(drivers.every((d) => d.vehicleType === 'premium')).toBe(true);
    });
  });
});
```

---

## Coverage Goals

### Umbrales de Coverage

```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 70,      // Mínimo 70% de ramas cubiertas
    functions: 75,     // Mínimo 75% de funciones cubiertas
    lines: 80,         // Mínimo 80% de líneas cubiertas
    statements: 80     // Mínimo 80% de statements cubiertos
  },
  // Requisitos específicos para módulos críticos
  './src/services/payment/**/*.ts': {
    branches: 90,
    functions: 95,
    lines: 95,
    statements: 95
  },
  './src/utils/security/**/*.ts': {
    branches: 95,
    functions: 100,
    lines: 95,
    statements: 95
  }
}
```

### Interpretar el Reporte de Coverage

```bash
npm run test:coverage
```

**Ejemplo de output:**

```
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   82.45 |    78.32 |   85.12 |   82.67 |                   
 components         |   88.24 |    82.14 |   90.00 |   88.50 |                   
  Button.tsx        |   100   |    100   |   100   |   100   |                   
  MapView.tsx       |   75.50 |    65.00 |   80.00 |   76.00 | 45-52,78          
 services/api       |   70.15 |    65.80 |   72.50 |   71.00 |                   
  routes.ts         |   68.00 |    60.00 |   70.00 |   68.50 | 23,45-48,67       
 utils              |   95.00 |    90.00 |   100   |   95.50 |                   
  validation.ts     |   100   |    100   |   100   |   100   |                   
--------------------|---------|----------|---------|---------|-------------------
```

**Qué observar:**

- **% Stmts (Statements)**: Porcentaje de declaraciones ejecutadas
- **% Branch**: Porcentaje de ramas condicionales (if/else) cubiertas
- **% Funcs**: Porcentaje de funciones llamadas
- **% Lines**: Porcentaje de líneas ejecutadas
- **Uncovered Line #s**: Líneas no cubiertas (requieren atención)

### Estrategia de Coverage

1. **Priorizar cobertura por criticidad**:
   - 🔴 Crítico (95%+): Pagos, seguridad, autenticación
   - 🟡 Alto (85%+): Lógica de negocio, cálculos de tarifas
   - 🟢 Medio (75%+): UI components, utils
   - ⚪ Bajo (60%+): Configuración, constantes

2. **No obsesionarse con 100%**:
   - Algunos casos edge pueden no valer la pena
   - Código de error handling extremo puede omitirse
   - Mocks complejos pueden ser más frágiles que útiles

3. **Revisar coverage regularmente**:
   ```bash
   npm run test:coverage -- --watch
   ```

---

## Qué Testear y Qué No

### ✅ QUÉ TESTEAR

#### 1. Lógica de Negocio Crítica

```typescript
// ✅ SIEMPRE testear
describe('calculateFare', () => {
  it('should apply correct base fare');
  it('should add surge pricing during peak hours');
  it('should apply discount codes correctly');
  it('should handle edge cases (0 distance, negative values)');
});
```

#### 2. Validaciones y Transformaciones

```typescript
// ✅ SIEMPRE testear
describe('validatePaymentCard', () => {
  it('should validate card number with Luhn algorithm');
  it('should check expiration date');
  it('should reject expired cards');
});
```

#### 3. Flujos de Usuario Críticos

```typescript
// ✅ Integration test
describe('User Trip Flow', () => {
  it('should complete booking from search to confirmation');
  it('should handle cancellation correctly');
  it('should process payment successfully');
});
```

#### 4. Manejo de Errores

```typescript
// ✅ Testear escenarios de error
describe('API error handling', () => {
  it('should retry on network failure');
  it('should show user-friendly error messages');
  it('should fallback to cached data when offline');
});
```

#### 5. Estados de Componentes

```typescript
// ✅ Testear estados visuales importantes
describe('TripCard', () => {
  it('should show loading state while fetching trip');
  it('should show trip details when loaded');
  it('should show error state on failure');
  it('should show empty state when no trips');
});
```

#### 6. Accessibility

```typescript
// ✅ Testear accesibilidad
describe('Button accessibility', () => {
  it('should have proper accessibility role');
  it('should have accessibility label');
  it('should indicate disabled state');
});
```

### ❌ QUÉ NO TESTEAR

#### 1. Detalles de Implementación

```typescript
// ❌ NO testear
it('should call useState hook', () => {
  // Los hooks son detalles de implementación
});

it('should use useEffect to fetch data', () => {
  // Testear el comportamiento, no cómo se implementa
});
```

#### 2. Librerías de Terceros

```typescript
// ❌ NO testear librerías externas
it('should validate that react-navigation navigates correctly', () => {
  // Confía en que react-navigation funciona
  // Testea que TU código lo llama correctamente
});
```

#### 3. Estilos Estáticos

```typescript
// ❌ NO testear estilos CSS/StyleSheet literales
it('should have fontSize of 16', () => {
  expect(component).toHaveStyle({ fontSize: 16 });
  // Frágil y poco valor
});

// ✅ SÍ testear estilos dinámicos
it('should apply error style when input is invalid', () => {
  expect(input).toHaveStyle({ borderColor: 'red' });
});
```

#### 4. Código Trivial

```typescript
// ❌ NO testear getters/setters simples
export const getUser = () => user;
export const setUser = (u) => { user = u; };

// No añade valor testear esto
```

#### 5. Configuración y Constantes

```typescript
// ❌ NO testear archivos de configuración
export const API_BASE_URL = 'https://api.urbango.com';
export const TIMEOUT = 5000;

// No testear constantes literales
```

#### 6. Mocks y Test Utilities

```typescript
// ❌ NO testear tus propios mocks
describe('mock data', () => {
  it('should return mock user', () => {
    expect(mockUser.name).toBe('Test User');
    // Esto no testea nada útil
  });
});
```

### Reglas de Oro

1. **Testea comportamiento, no implementación**
2. **Si cambias código interno sin cambiar comportamiento, los tests no deberían fallar**
3. **Cada test debe fallar si y solo si el comportamiento esperado se rompe**
4. **Pregúntate: "¿Este test me daría confianza para hacer refactoring?"**

---

## Fixtures y Mocks Helpers

### Estructura de Fixtures

**src/__tests__/fixtures/users.ts**

```typescript
import { User, Driver } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Juan Pérez',
  phone: '+525512345678',
  createdAt: '2024-01-01T00:00:00Z',
  verified: true,
};

export const mockDriver: Driver = {
  id: 'driver-1',
  name: 'Carlos Méndez',
  phone: '+525587654321',
  rating: 4.8,
  totalTrips: 250,
  vehicle: {
    plate: 'ABC-123',
    model: 'Toyota Corolla 2022',
    color: 'Blanco',
    type: 'standard',
  },
  location: {
    latitude: 19.4326,
    longitude: -99.1332,
  },
};

export const createMockUser = (overrides?: Partial<User>): User => ({
  ...mockUser,
  ...overrides,
});

export const createMockDriver = (overrides?: Partial<Driver>): Driver => ({
  ...mockDriver,
  ...overrides,
});
```

**src/__tests__/fixtures/trips.ts**

```typescript
import { Trip, TripStatus } from '@/types';

export const mockTrip: Trip = {
  id: 'trip-1',
  userId: 'user-1',
  driverId: 'driver-1',
  status: 'in_progress' as TripStatus,
  pickup: {
    address: 'Reforma 222, CDMX',
    location: { latitude: 19.4326, longitude: -99.1332 },
  },
  destination: {
    address: 'Aeropuerto CDMX',
    location: { latitude: 19.4363, longitude: -99.0721 },
  },
  fare: {
    base: 50,
    distance: 75,
    time: 30,
    total: 155,
    currency: 'MXN',
  },
  startTime: '2024-01-15T08:00:00Z',
  estimatedEndTime: '2024-01-15T08:30:00Z',
  polyline: 'encoded_polyline_data',
};

export const createMockTrip = (
  status: TripStatus,
  overrides?: Partial<Trip>
): Trip => ({
  ...mockTrip,
  status,
  ...overrides,
});

// Factory para diferentes estados
export const mockTripRequested = createMockTrip('requested');
export const mockTripConfirmed = createMockTrip('confirmed');
export const mockTripInProgress = createMockTrip('in_progress');
export const mockTripCompleted = createMockTrip('completed', {
  endTime: '2024-01-15T08:25:00Z',
});
```

### Custom Render Helper

**src/__tests__/helpers/render.tsx**

```typescript
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: any;
  store?: any;
  navigationProps?: any;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    initialState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
    navigationProps = {},
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <NavigationContainer {...navigationProps}>
          {children}
        </NavigationContainer>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Helper para crear providers sin renderizar
export function createTestProviders(options: CustomRenderOptions = {}) {
  const { initialState = {}, navigationProps = {} } = options;
  
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return function TestProviders({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <NavigationContainer {...navigationProps}>
          {children}
        </NavigationContainer>
      </Provider>
    );
  };
}

// Re-export everything
export * from '@testing-library/react-native';
```

**Uso:**

```typescript
import { renderWithProviders } from '@/__tests__/helpers/render';

test('renders user profile with data from store', () => {
  renderWithProviders(<ProfileScreen />, {
    initialState: {
      user: { name: 'Test User', email: 'test@example.com' },
    },
  });

  expect(screen.getByText('Test User')).toBeOnTheScreen();
});
```

### Mocks Compartidos

**src/__tests__/helpers/mocks.ts**

```typescript
import { jest } from '@jest/globals';

// Mock de navegación
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(() => jest.fn()), // Cleanup function
};

// Mock de route
export const mockRoute = {
  key: 'test-route',
  name: 'TestScreen' as const,
  params: {},
};

// Mock de Geolocation
export const mockGeolocation = {
  getCurrentPosition: jest.fn((success) =>
    success({
      coords: {
        latitude: 19.4326,
        longitude: -99.1332,
        accuracy: 10,
      },
      timestamp: Date.now(),
    })
  ),
  watchPosition: jest.fn(() => 1),
  clearWatch: jest.fn(),
};

// Mock de AsyncStorage
export const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
};

// Mock de API response helpers
export const createMockApiResponse = <T>(data: T, status = 200) => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {},
});

export const createMockApiError = (
  message: string,
  status = 400,
  code?: string
) => ({
  response: {
    data: { error: message, code },
    status,
    statusText: 'Error',
    headers: {},
    config: {},
  },
  message,
  isAxiosError: true,
});

// Helper para simular delays
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper para waitFor personalizado con timeout
export const waitForWithTimeout = async (
  callback: () => void,
  timeout = 5000
) => {
  const { waitFor } = await import('@testing-library/react-native');
  return waitFor(callback, { timeout });
};
```

### Mock de Módulos Externos

**src/__mocks__/react-native-maps.tsx**

```typescript
import React from 'react';
import { View } from 'react-native';

const MapView = (props: any) => <View {...props} testID="mock-map-view" />;
MapView.Marker = (props: any) => <View {...props} testID="mock-marker" />;
MapView.Polyline = (props: any) => <View {...props} testID="mock-polyline" />;
MapView.PROVIDER_GOOGLE = 'google';

export default MapView;
export const Marker = MapView.Marker;
export const Polyline = MapView.Polyline;
export const PROVIDER_GOOGLE = MapView.PROVIDER_GOOGLE;
```

---

## Debugging Tips

### 1. Debug Tests en VS Code

**Configuración .vscode/launch.json:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasename}",
        "--config",
        "jest.config.js",
        "--runInBand",
        "--no-cache"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: All Tests",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest"
      }
    }
  ]
}
```

### 2. Técnicas de Debugging

#### console.log estratégico

```typescript
import { screen, debug } from '@testing-library/react-native';

test('debugging example', () => {
  render(<MyComponent />);

  // Ver el árbol completo de componentes
  screen.debug();

  // Ver un elemento específico
  const button = screen.getByRole('button');
  screen.debug(button);

  // Log de queries disponibles
  screen.logTestingPlaygroundURL();
});
```

#### screen.logTestingPlaygroundURL()

```typescript
test('find the right query', () => {
  render(<ComplexComponent />);
  
  // Esto imprime una URL que puedes abrir en el browser
  // para ver qué queries usar
  screen.logTestingPlaygroundURL();
});
```

#### Inspect renders con React DevTools

```typescript
// Agregar en jest.setup.js
if (process.env.DEBUG_TESTS) {
  const { setLogLevel } = require('@testing-library/react-native');
  setLogLevel('debug');
}
```

```bash
# Correr tests con debug
DEBUG_TESTS=1 npm test
```

### 3. Queries Debugging

```typescript
import { screen, within } from '@testing-library/react-native';

test('debugging queries', () => {
  render(<TripList trips={mockTrips} />);

  // ❌ Si esto falla, usa:
  // screen.getByText('Trip #123');

  // ✅ Ver todas las opciones disponibles
  screen.getByText(/trip/i); // Case-insensitive
  screen.getByText((content, element) => content.startsWith('Trip'));

  // Buscar dentro de un contenedor específico
  const tripCard = screen.getByTestId('trip-card-1');
  const price = within(tripCard).getByText('$155');

  // Ver todos los elementos que coinciden
  const allButtons = screen.getAllByRole('button');
  console.log('Buttons found:', allButtons.length);
});
```

### 4. Async Debugging

```typescript
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react-native';

test('debugging async operations', async () => {
  render(<AsyncComponent />);

  // Esperar hasta que aparezca
  await waitFor(
    () => {
      expect(screen.getByText('Loaded')).toBeOnTheScreen();
    },
    {
      timeout: 5000,
      interval: 100,
      onTimeout: (error) => {
        // Log adicional cuando timeout
        screen.debug();
        console.log('Current queries:', screen.queryByText('Loaded'));
        return error;
      },
    }
  );

  // Esperar hasta que desaparezca
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
});
```

### 5. Mock Debugging

```typescript
test('debugging mocks', () => {
  const mockFn = jest.fn();
  
  myFunction(mockFn);

  // Ver todas las llamadas
  console.log('Mock calls:', mockFn.mock.calls);
  console.log('Call count:', mockFn.mock.calls.length);
  console.log('First call args:', mockFn.mock.calls[0]);

  // Ver qué se retornó
  console.log('Return values:', mockFn.mock.results);

  // Ver el contexto (this)
  console.log('Contexts:', mockFn.mock.contexts);

  // Assertions útiles
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  expect(mockFn).toHaveBeenLastCalledWith('specific-arg');
});
```

### 6. Snapshot Debugging

```typescript
test('debugging snapshots', () => {
  const { toJSON } = render(<MyComponent />);
  
  // Ver el snapshot en consola
  console.log(JSON.stringify(toJSON(), null, 2));

  // Crear snapshot
  expect(toJSON()).toMatchSnapshot();

  // Si falla, comparar manualmente
  const currentSnapshot = toJSON();
  console.log('Current:', currentSnapshot);
});
```

### 7. Watch Mode Avanzado

```bash
# Correr solo tests que fallaron
npm test -- --onlyFailures

# Correr tests relacionados a archivos modificados
npm test -- --onlyChanged

# Correr un test específico por nombre
npm test -- -t "should calculate fare"

# Actualizar snapshots automáticamente
npm test -- -u

# Ver coverage mientras desarrollas
npm test -- --coverage --watch
```

### 8. Error Common Patterns

```typescript
// ❌ Error: Unable to find an element
// Solución: Verificar que el elemento esté realmente en el DOM
test('find element', () => {
  render(<MyComponent />);
  screen.debug(); // Ver qué hay renderizado
  
  // Intentar queries alternativas
  screen.getByText('Text');
  screen.getByTestId('my-element');
  screen.getByRole('button', { name: /submit/i });
});

// ❌ Error: Cannot perform React state update on unmounted component
// Solución: Cleanup en useEffect
test('cleanup subscriptions', async () => {
  const { unmount } = render(<ComponentWithSubscription />);
  
  await waitFor(() => {
    expect(screen.getByText('Data')).toBeOnTheScreen();
  });
  
  unmount(); // Trigger cleanup
});

// ❌ Error: Exceeded timeout while waiting
// Solución: Aumentar timeout o revisar lógica async
test('increase timeout', async () => {
  render(<SlowComponent />);
  
  await waitFor(
    () => expect(screen.getByText('Done')).toBeOnTheScreen(),
    { timeout: 10000 } // 10 segundos
  );
});
```

---

## Checklist de PR

### Antes de Crear el PR

- [ ] **Tests escritos y pasando**
  ```bash
  npm test
  ```

- [ ] **Coverage cumple umbrales**
  ```bash
  npm run test:coverage
  ```
  - [ ] Global: >80% lines, >70% branches
  - [ ] Archivos críticos: >90%

- [ ] **No hay tests skipped sin justificación**
  ```typescript
  // ❌ Evitar sin razón
  test.skip('should do something', () => {});
  
  // ✅ OK con ticket de seguimiento
  test.skip('ISSUE-123: should handle edge case', () => {});
  ```

- [ ] **Linter pasa sin errores**
  ```bash
  npm run lint
  ```

- [ ] **TypeScript compila sin errores**
  ```bash
  npm run tsc -- --noEmit
  ```

### Calidad de Tests

- [ ] **Tests siguen patrón AAA (Arrange-Act-Assert)**
  ```typescript
  test('example', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = processInput(input);
    
    // Assert
    expect(result).toBe('expected');
  });
  ```

- [ ] **Cada test tiene un propósito claro y único**
  - [ ] Nombres descriptivos (no "test 1", "test 2")
  - [ ] Un solo concepto por test

- [ ] **Tests son independientes**
  - [ ] No dependen del orden de ejecución
  - [ ] No comparten estado mutable
  - [ ] Cada test hace su propio setup/cleanup

- [ ] **Mocks y fixtures apropiados**
  - [ ] Usan fixtures compartidos cuando es posible
  - [ ] Mocks son realistas
  - [ ] Se limpia estado de mocks entre tests

- [ ] **Casos edge contemplados**
  - [ ] Valores nulos/undefined
  - [ ] Strings vacíos
  - [ ] Arrays vacíos
  - [ ] Números negativos/cero
  - [ ] Errores de red/timeout

### Cobertura de Funcionalidad

- [ ] **Happy paths cubiertos**
  - [ ] Flujo principal funciona correctamente

- [ ] **Error paths cubiertos**
  - [ ] Errores se manejan gracefully
  - [ ] Mensajes de error apropiados

- [ ] **Loading states cubiertos**
  - [ ] Spinners/skeletons se muestran
  - [ ] Datos aparecen después de loading

- [ ] **Empty states cubiertos**
  - [ ] Sin datos muestra mensaje apropiado
  - [ ] Call-to-action cuando aplica

- [ ] **Accessibility validada**
  - [ ] Roles ARIA correctos
  - [ ] Labels descriptivos
  - [ ] Estados se comunican a screen readers

### Integration & E2E (si aplica)

- [ ] **Flujos críticos testeados end-to-end**
  - [ ] Booking completo
  - [ ] Login/Logout
  - [ ] Pago

- [ ] **Navegación funciona correctamente**
  - [ ] Links/botones navegan a pantallas correctas
  - [ ] Back navigation funciona

- [ ] **APIs mockeadas apropiadamente**
  - [ ] Success cases
  - [ ] Error cases
  - [ ] Loading states

### Performance

- [ ] **Tests corren rápido (<1s por unit test)**
  ```bash
  npm test -- --verbose
  # Revisar tiempo individual de cada test
  ```

- [ ] **No hay delays innecesarios**
  ```typescript
  // ❌ Evitar
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // ✅ Usar fake timers
  jest.useFakeTimers();
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  ```

### Documentación

- [ ] **Tests complejos tienen comentarios explicativos**
  ```typescript
  // Este test verifica que el cálculo de tarifa aplica
  // el multiplicador de surge pricing solo durante
  // horas pico (7-9am, 6-8pm) en días laborables
  test('applies surge pricing during peak hours', () => {
    // ...
  });
  ```

- [ ] **Fixtures/mocks están documentados**
  ```typescript
  /**
   * Mock user con perfil completo y verificado.
   * Úsalo para tests que requieren usuario autenticado.
   */
  export const mockVerifiedUser = { ... };
  ```

### CI/CD

- [ ] **Tests pasan en CI**
  - [ ] Todas las platforms (iOS/Android si aplica)
  - [ ] No hay flaky tests

- [ ] **Coverage report generado**
  - [ ] Disponible en PR comments
  - [ ] No decrease en coverage

### Final Check

- [ ] **Código de tests revisado con mismo rigor que código de producción**
- [ ] **Tests agregan valor real, no solo coverage numérico**
- [ ] **Refactoring futuro será seguro con estos tests**
- [ ] **Otro dev puede entender qué se está probando**

### Template de Descripción de PR

```markdown
## Cambios

[Descripción breve de los cambios]

## Tests

- [ ] Unit tests agregados/actualizados
- [ ] Integration tests agregados (si aplica)
- [ ] Coverage: XX% (antes: YY%)

### Casos cubiertos:
- ✅ Happy path: [descripción]
- ✅ Error handling: [descripción]
- ✅ Edge cases: [lista]

### Fixtures/Mocks agregados:
- `mockXXX`: [propósito]

## Screenshots/Videos

[Si aplica, GIFs o screenshots de la funcionalidad]

## Checklist

- [ ] Tests pasan localmente
- [ ] Coverage cumple umbrales
- [ ] Linter pasa
- [ ] TypeScript compila
- [ ] PR es reviewable (<400 líneas)
```

---

## Recursos Adicionales

### Documentación Oficial

- [Jest](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)

### Artículos Recomendados

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

### Comandos Rápidos

```bash
# Correr todos los tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm run test:coverage

# Un archivo específico
npm test Button.test.tsx

# Tests que matchean un patrón
npm test -- -t "should calculate"

# Actualizar snapshots
npm test -- -u

# Debug mode
npm run test:debug

# CI mode (sin watch, con coverage)
npm run test:ci

# Solo tests que fallaron en la última corrida
npm test -- --onlyFailures

# Solo tests modificados (requiere git)
npm test -- --onlyChanged
```

---

## Contacto y Soporte

Para dudas sobre testing:

1. Revisar esta guía primero
2. Buscar en el canal de Slack #testing
3. Crear un issue en GitHub con label `testing`
4. Ping al equipo de QA en el PR

**Mantén los tests limpios, rápidos y valiosos. Happy testing!** 🚀
