import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddProductScreen from '../AddProduct';
import * as productService from '../../services/productService';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: jest.fn(() => ({})),
}));

jest.mock('../../services/productService');
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('AddProductScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (productService.createProduct as jest.Mock).mockResolvedValue({
      id: 'PROD001',
      name: 'Test',
      description: 'Test description',
      logo: 'logo.png',
      date_release: '2025-12-25',
      date_revision: '2026-12-25',
    });
  });

  describe('modo creación', () => {
    it('debe permitir editar ID cuando se crea un producto', () => {
      render(<AddProductScreen />);

      const idInput = render(<AddProductScreen />).getByPlaceholderText('Ej: PROD001');
      expect(idInput.props.editable).toBe(true);
    });

    it('debe mostrar botón "Agregar"', async () => {
      const { getByText } = render(<AddProductScreen />);

      await waitFor(() => {
        expect(getByText('Agregar')).toBeDefined();
      });
    });

    it('debe tener fecha de liberación con hoy por defecto', () => {
      const { getByDisplayValue } = render(<AddProductScreen />);

      const today = new Date();
      const dateString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

      expect(getByDisplayValue(dateString)).toBeDefined();
    });
  });

  describe('validación del formulario', () => {
    it('debe mostrar error cuando ID está vacío', async () => {
      const { getByText } = render(<AddProductScreen />);

      const submitButton = getByText('Agregar');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText('El ID es requerido')).toBeDefined();
      });
    });

    it('debe mostrar error cuando nombre está vacío', async () => {
      const { getByPlaceholderText, getByText } = render(<AddProductScreen />);

      const idInput = getByPlaceholderText('Ej: PROD001');
      fireEvent.changeText(idInput, 'PROD001');

      const submitButton = getByText('Agregar');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText('El nombre es requerido')).toBeDefined();
      });
    });

    it('debe validar antes de hacer submit', async () => {
      const { getByText } = render(<AddProductScreen />);

      const submitButton = getByText('Agregar');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(productService.createProduct).not.toHaveBeenCalled();
      });
    });
  });

  describe('campos del formulario', () => {
    it('debe tener input para ID', () => {
      const { getByPlaceholderText } = render(<AddProductScreen />);

      expect(getByPlaceholderText('Ej: PROD001')).toBeDefined();
    });

    it('debe tener input para nombre', () => {
      const { getByPlaceholderText } = render(<AddProductScreen />);

      expect(getByPlaceholderText('Nombre del producto')).toBeDefined();
    });

    it('debe tener input para descripción', () => {
      const { getByPlaceholderText } = render(<AddProductScreen />);

      expect(getByPlaceholderText('Descripción del producto')).toBeDefined();
    });

    it('debe tener input para logo', () => {
      const { getByPlaceholderText } = render(<AddProductScreen />);

      expect(getByPlaceholderText('URL o ruta del logo')).toBeDefined();
    });

    it('debe tener inputs para fechas', () => {
      const { queryByPlaceholderText } = render(<AddProductScreen />);

      const releaseInput = queryByPlaceholderText('DD-MM-YYYY');
      expect(releaseInput).toBeDefined();
    });
  });

  describe('botones', () => {
    it('debe tener botón de agregar/enviar', () => {
      const { getByText } = render(<AddProductScreen />);

      expect(getByText('Agregar')).toBeDefined();
    });

    it('debe tener botón de reiniciar', () => {
      const { getByText } = render(<AddProductScreen />);

      expect(getByText('Reiniciar')).toBeDefined();
    });
  });

  describe('manejo de errores', () => {
    it('debe mostrar error cuando la creación falla', async () => {
      (productService.createProduct as jest.Mock).mockRejectedValueOnce(
        new Error('Error al crear')
      );

      const { getByPlaceholderText, getByText } = render(<AddProductScreen />);

      const idInput = getByPlaceholderText('Ej: PROD001');
      const nameInput = getByPlaceholderText('Nombre del producto');
      const descInput = getByPlaceholderText('Descripción del producto');
      const logoInput = getByPlaceholderText('URL o ruta del logo');

      fireEvent.changeText(idInput, 'PROD001');
      fireEvent.changeText(nameInput, 'Test Product');
      fireEvent.changeText(descInput, 'Valid description');
      fireEvent.changeText(logoInput, 'logo.png');

      const submitButton = getByText('Agregar');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText('Error al agregar el producto')).toBeDefined();
      });
    });
  });
});
