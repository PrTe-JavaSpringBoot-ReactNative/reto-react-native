import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductDetailScreen from '../ProductDetail';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useLocalSearchParams: jest.fn(() => ({
    id: 'PROD001',
    name: 'Cuenta Corriente',
    description: 'Cuenta corriente personal',
    logo: 'logo.png',
    dateRelease: '2025-12-25',
    dateRevision: '2026-12-25',
  })),
}));

describe('ProductDetailScreen', () => {
  describe('visualización de datos', () => {
    it('debe mostrar ID del producto', () => {
      const { getByText } = render(<ProductDetailScreen />);

      expect(getByText('ID: PROD001')).toBeDefined();
    });

    it('debe mostrar nombre del producto', () => {
      const { getByText } = render(<ProductDetailScreen />);

      expect(getByText('[Cuenta Corriente]')).toBeDefined();
    });

    it('debe mostrar descripción del producto', () => {
      const { getByText } = render(<ProductDetailScreen />);

      expect(getByText('[Cuenta corriente personal]')).toBeDefined();
    });

    it('debe mostrar sección de información extra', () => {
      const { getByText } = render(<ProductDetailScreen />);

      expect(getByText('Información extra')).toBeDefined();
    });

    it('debe mostrar etiquetas de campos', () => {
      const { getAllByText } = render(<ProductDetailScreen />);

      expect(getAllByText('Nombre').length).toBeGreaterThan(0);
      expect(getAllByText('Descripción').length).toBeGreaterThan(0);
      expect(getAllByText('Logo').length).toBeGreaterThan(0);
      expect(getAllByText('Fecha liberación').length).toBeGreaterThan(0);
      expect(getAllByText('Fecha revisión').length).toBeGreaterThan(0);
    });
  });

  describe('conversión de fechas', () => {
    it('debe mostrar fechas en formato DD-MM-YYYY', () => {
      const { getByText } = render(<ProductDetailScreen />);

      expect(getByText('[25-12-2025]')).toBeDefined();
      expect(getByText('[25-12-2026]')).toBeDefined();
    });

    it('debe convertir correctamente fecha de liberación', () => {
      const { getAllByText } = render(<ProductDetailScreen />);

      const dateDisplays = getAllByText('[25-12-2025]');
      expect(dateDisplays.length).toBeGreaterThan(0);
    });
  });

  describe('logo placeholder', () => {
    it('debe mostrar placeholder de logo', () => {
      const { getAllByText } = render(<ProductDetailScreen />);

      expect(getAllByText('Logo').length).toBeGreaterThan(0);
    });
  });

  describe('botones de acción', () => {
    it('debe tener botón de editar', () => {
      const { getByText } = render(<ProductDetailScreen />);

      expect(getByText('Editar')).toBeDefined();
    });

    it('debe tener botón de eliminar', () => {
      const { getByText } = render(<ProductDetailScreen />);

      expect(getByText('Eliminar')).toBeDefined();
    });

    it('debe tener botón editar funcional', () => {
      const { getByText } = render(<ProductDetailScreen />);

      const editButton = getByText('Editar');
      expect(editButton).toBeDefined();

      fireEvent.press(editButton);
      expect(editButton).toBeDefined();
    });
  });

  describe('estructura de datos', () => {
    it('debe recibir todos los parámetros necesarios', () => {
      const { getByText } = render(<ProductDetailScreen />);

      // Verifica que todos los datos se recibieron y se muestran
      expect(getByText('ID: PROD001')).toBeDefined();
      expect(getByText('[Cuenta Corriente]')).toBeDefined();
      expect(getByText('[Cuenta corriente personal]')).toBeDefined();
    });
  });
});
