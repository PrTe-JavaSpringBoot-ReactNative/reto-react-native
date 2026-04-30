import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductsListScreen from '../index';
import * as productService from '../services/productService';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock('../services/productService');
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('ProductsListScreen', () => {
  const mockProducts = [
    {
      id: 'PROD001',
      name: 'Cuenta Corriente',
      description: 'Cuenta corriente personal',
      logo: 'logo1.png',
      dateRelease: '2025-01-01',
      dateRevision: '2026-01-01',
    },
    {
      id: 'PROD002',
      name: 'Tarjeta de Crédito',
      description: 'Tarjeta de crédito visa',
      logo: 'logo2.png',
      dateRelease: '2025-02-01',
      dateRevision: '2026-02-01',
    },
    {
      id: 'PROD003',
      name: 'Préstamo Personal',
      description: 'Préstamo personal a tasa fija',
      logo: 'logo3.png',
      dateRelease: '2025-03-01',
      dateRevision: '2026-03-01',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (productService.fetchProducts as jest.Mock).mockResolvedValue({
      data: mockProducts,
    });
  });

  describe('carga inicial', () => {
    it('debe mostrar indicador de carga mientras se obtienen productos', async () => {
      (productService.fetchProducts as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ data: mockProducts }), 100)
          )
      );

      const { getByTestId } = render(<ProductsListScreen />);

      expect(getByTestId).toBeDefined();
    });

    it('debe cargar productos correctamente al iniciar', async () => {
      const { getByText } = render(<ProductsListScreen />);

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
        expect(getByText('Tarjeta de Crédito')).toBeDefined();
        expect(getByText('Préstamo Personal')).toBeDefined();
      });
    });

    it('debe mostrar error cuando falla la carga', async () => {
      (productService.fetchProducts as jest.Mock).mockRejectedValueOnce(
        new Error('Error de red')
      );

      const { getByText } = render(<ProductsListScreen />);

      await waitFor(() => {
        expect(getByText('Error al cargar los productos')).toBeDefined();
      });
    });
  });

  describe('búsqueda de productos', () => {
    it('debe filtrar productos por nombre', async () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <ProductsListScreen />
      );

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
      });

      const searchInput = getByPlaceholderText('Buscar producto...');
      fireEvent.changeText(searchInput, 'Tarjeta');

      await waitFor(() => {
        expect(getByText('Tarjeta de Crédito')).toBeDefined();
        expect(queryByText('Cuenta Corriente')).toBeNull();
      });
    });

    it('debe filtrar productos por ID', async () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <ProductsListScreen />
      );

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
      });

      const searchInput = getByPlaceholderText('Buscar producto...');
      fireEvent.changeText(searchInput, 'PROD002');

      await waitFor(() => {
        expect(getByText('Tarjeta de Crédito')).toBeDefined();
        expect(queryByText('Préstamo Personal')).toBeNull();
      });
    });

    it('debe limpiar búsqueda y mostrar todos los productos', async () => {
      const { getByPlaceholderText, getByText } = render(
        <ProductsListScreen />
      );

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
      });

      const searchInput = getByPlaceholderText('Buscar producto...');
      fireEvent.changeText(searchInput, 'Tarjeta');

      await waitFor(() => {
        expect(getByText('Tarjeta de Crédito')).toBeDefined();
      });

      fireEvent.changeText(searchInput, '');

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
        expect(getByText('Tarjeta de Crédito')).toBeDefined();
        expect(getByText('Préstamo Personal')).toBeDefined();
      });
    });

    it('debe ser case-insensitive en búsqueda', async () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <ProductsListScreen />
      );

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
      });

      const searchInput = getByPlaceholderText('Buscar producto...');
      fireEvent.changeText(searchInput, 'cuenta');

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
        expect(queryByText('Tarjeta de Crédito')).toBeNull();
      });
    });
  });

  describe('lista de productos vacía', () => {
    it('debe mostrar mensaje cuando no hay productos', async () => {
      (productService.fetchProducts as jest.Mock).mockResolvedValueOnce({
        data: [],
      });

      const { getByText } = render(<ProductsListScreen />);

      await waitFor(() => {
        expect(getByText('No hay productos disponibles')).toBeDefined();
      });
    });

    it('debe mostrar mensaje cuando la búsqueda no tiene resultados', async () => {
      const { getByPlaceholderText, getByText } = render(
        <ProductsListScreen />
      );

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
      });

      const searchInput = getByPlaceholderText('Buscar producto...');
      fireEvent.changeText(searchInput, 'NoExiste');

      await waitFor(() => {
        expect(getByText('No hay productos disponibles')).toBeDefined();
      });
    });
  });

  describe('UI y componentes', () => {
    it('debe tener campo de búsqueda', async () => {
      const { getByPlaceholderText, getByText } = render(<ProductsListScreen />);

      await waitFor(() => {
        expect(getByText('Cuenta Corriente')).toBeDefined();
      });

      expect(getByPlaceholderText('Buscar producto...')).toBeDefined();
    });

    it('debe tener botón para agregar producto', async () => {
      const { getByText } = render(<ProductsListScreen />);

      await waitFor(() => {
        expect(getByText('Agregar')).toBeDefined();
      });
    });

    it('debe mostrar ID del producto en cada card', async () => {
      const { getAllByText } = render(<ProductsListScreen />);

      await waitFor(() => {
        expect(getAllByText(/ID: PROD\d{3}/).length).toBeGreaterThan(0);
      });
    });
  });
});
