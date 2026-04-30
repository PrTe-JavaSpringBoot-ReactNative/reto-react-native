# BancaApp - Prueba Técnica DEV Sofka

Aplicación de banca móvil desarrollada con React Native y Expo. 

## Requisitos Previos

- **Node.js**: v18 o superior (trabajado con 20.19.4)
- **npm**: v9 o superior (trabajado con 10.6.0)
- **Expo CLI**: instalado globalmente (`npm install -g expo-cli`) (versión 0.18.29)
- Un dispositivo o emulador Android/iOS, o navegador para probar en web

## Instalación

1. Clonar o descargar el proyecto
2. Instalar dependencias:
```bash
npm install
```

## Configuración del Entorno (.env)

1. Crear un archivo `.env` en la raíz del proyecto:
```bash
cp .env.example .env
```

2. Editar el archivo `.env` con la configuración necesaria:
```
# API Configuration
# Replace the IP address with your actual local machine IP
# You can find it by running: ipconfig (on Windows) or ifconfig (on Mac/Linux)

EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:3002
```

### Configuración de la URL API

- **En desarrollo local**: 
  - Reemplazar `192.168.x.x` con la IP real de tu máquina
  - Comando para obtener IP:
    - **Windows**: `ipconfig` (buscar "IPv4 Address")
    - **Mac/Linux**: `ifconfig` (buscar inet)
  - Ejemplo: `http://192.168.1.100:3002`

- **En producción**: Usar la URL del servidor API en producción

> **Nota**: Las variables prefijadas con `EXPO_PUBLIC_` son accesibles desde el cliente. No incluyas información sensible en estas variables.

## Ejecución del Proyecto

### Modo desarrollo (permite elegir plataforma)
```bash
npm start
```
Luego presionar:
- `a` para Android
- `i` para iOS
- `w` para Web

### Android
```bash
npm run android
```

### iOS (solo en Mac)
```bash
npm run ios
```

### Web
```bash
npm run web
```

## Tests y Cobertura

### Ejecutar todos los tests
```bash
npm run test
```

### Ver reporte de cobertura
```bash
npm run test:coverage
```

## Cobertura de Tests Alcanzada

### Resumen General
- **Total de tests**: 71 tests pasados
- **Cobertura general**: 83.51% de líneas
- **Umbral mínimo requerido**: 70% de líneas ✅

### Cobertura por módulo

| Módulo | Cobertura | Estado |
|--------|-----------|--------|
| `app/services/productService.ts` | 100% | ✅ |
| `app/styles/globalStyles.ts` | 100% | ✅ |
| `app/config/env.ts` | 100% | ✅ |
| `app/utils/validations.ts` | 94% | ✅ |
| `app/screens/ProductDetail.tsx` | 87.5% | ✅ |
| `app/screens/AddProduct.tsx` | 76.27% | ✅ |
| `app/components/ProductForm.tsx` | 77.77% | ✅ |
| `app/index.tsx` | 73.46% | ✅ |

--------------------|---------|----------|---------|---------|------------------------------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                        
--------------------|---------|----------|---------|---------|------------------------------------------
All files           |   81.85 |    74.78 |   69.09 |   83.51 |                                          
 app                |      72 |      100 |   53.84 |      72 |                                          
  _layout.tsx       |       0 |      100 |       0 |       0 | 5                                        
  index.tsx         |   73.46 |      100 |   58.33 |   73.46 | 32,52-62,81,97,151                       
 app/components     |   76.78 |     75.3 |   66.66 |   77.77 |                                          
  ProductForm.tsx   |   76.78 |     75.3 |   66.66 |   77.77 | 43-45,113-118,148-176,200                
 app/config         |     100 |      100 |     100 |     100 |                                          
  env.ts            |     100 |      100 |     100 |     100 |                                          
 app/screens        |   74.68 |    60.25 |   68.42 |   78.66 |                                          
  AddProduct.tsx    |   73.77 |       60 |   66.66 |   76.27 | 40-42,70-71,80,85-94,111,116-117,194-206 
  ProductDetail.tsx |   77.77 |     62.5 |      75 |    87.5 | 38,112                                   
 app/services       |     100 |    77.77 |     100 |     100 |                                          
  productService.ts |     100 |    77.77 |     100 |     100 | 20,64,100                                
 app/styles         |     100 |      100 |     100 |     100 |                                          
  globalStyles.ts   |     100 |      100 |     100 |     100 |                                          
 app/types          |       0 |        0 |       0 |       0 |                                          
  index.ts          |       0 |        0 |       0 |       0 |                                          
 app/utils          |   92.15 |    91.83 |     100 |      94 |                                          
  validations.ts    |   92.15 |    91.83 |     100 |      94 | 50,63,69                                 
--------------------|---------|----------|---------|---------|------------------------------------------

### Archivos de Test

1. **`app/utils/__tests__/validations.test.ts`** (11 tests)
   - Validación de campos de producto
   - Manejo de errores

2. **`app/services/__tests__/productService.test.ts`** (9 tests)
   - Obtención de productos
   - Creación de productos
   - Actualización de productos

3. **`app/components/__tests__/ProductForm.test.tsx`** (12 tests)
   - Inicialización del formulario
   - Edición de campos
   - Validaciones
   - Restricciones de longitud

4. **`app/screens/__tests__/AddProduct.test.tsx`** (17 tests)
   - Validación del formulario
   - Campos requeridos
   - Manejo de errores
   - Navegación

5. **`app/screens/__tests__/ProductDetail.test.tsx`** (10 tests)
   - Visualización de datos
   - Conversión de fechas
   - Botones de acción

6. **`app/__tests__/index.test.tsx`** (12 tests)
   - Carga de productos
   - Búsqueda y filtrado
   - Manejo de errores
   - Interfaz de usuario

## Estructura del Proyecto

```
app/
├── __tests__/              # Tests del componente principal
├── components/             # Componentes reutilizables
│   └── __tests__/
├── config/                 # Configuración (env.ts)
├── screens/                # Pantallas de la app
│   └── __tests__/
├── services/               # Servicios (API, etc)
│   └── __tests__/
├── styles/                 # Estilos globales
├── types/                  # Tipos TypeScript
├── utils/                  # Utilidades
│   └── __tests__/
├── _layout.tsx            # Layout principal
└── index.tsx              # Pantalla de productos
```

## Tecnologías Utilizadas

- **React Native**: Framework para desarrollo móvil
- **Expo**: Plataforma para desarrollo con React Native
- **TypeScript**: Tipado estático
- **Jest**: Framework de testing
- **React Native Testing Library**: Utilidades para testing de componentes
- **Expo Router**: Ruteo para React Native

## Notas

- Los tests están configurados con Jest y se ejecutan automáticamente
- La cobertura se calcula automáticamente y debe superar el 70% de líneas
- Todos los descripciones de tests están en español
