import { validateProduct, hasErrors } from '../validations';
import { Product } from '../../types';

describe('validations', () => {
  const getFutureDate = (yearsAhead: number): string => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + yearsAhead);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const futureDate = getFutureDate(1);
  const futureDatePlusOneYear = getFutureDate(2);

  const validProduct: Partial<Product> = {
    id: 'PROD001',
    name: 'Valid Product',
    description: 'Valid description text',
    logo: 'logo.png',
    dateRelease: futureDate,
    dateRevision: futureDatePlusOneYear,
  };

  describe('validateProduct', () => {
    it('debe validar un producto completamente válido', () => {
      const errors = validateProduct(validProduct);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('debe capturar múltiples errores de validación', () => {
      const invalidProduct: Partial<Product> = {
        id: 'AB',
        name: 'Bad',
        description: 'Short',
        logo: '',
        dateRelease: '01-01-2020',
        dateRevision: '01-01-2021',
      };
      const errors = validateProduct(invalidProduct);
      expect(Object.keys(errors).length).toBeGreaterThan(3);
    });

    it('debe validar restricciones de ID (mín 3, máx 10 caracteres)', () => {
      expect(validateProduct({ ...validProduct, id: 'AB' }).id).toBeDefined();
      expect(validateProduct({ ...validProduct, id: 'ABC123456789' }).id).toBeDefined();
      expect(validateProduct({ ...validProduct, id: 'PROD001' }).id).toBeUndefined();
    });

    it('debe validar restricciones de nombre (mín 5, máx 100 caracteres)', () => {
      expect(validateProduct({ ...validProduct, name: 'Test' }).name).toBeDefined();
      expect(validateProduct({ ...validProduct, name: 'A'.repeat(101) }).name).toBeDefined();
      expect(validateProduct({ ...validProduct, name: 'Valid Name' }).name).toBeUndefined();
    });

    it('debe validar restricciones de descripción (mín 10, máx 200 caracteres)', () => {
      expect(validateProduct({ ...validProduct, description: 'Short' }).description).toBeDefined();
      expect(validateProduct({ ...validProduct, description: 'A'.repeat(201) }).description).toBeDefined();
      expect(validateProduct({ ...validProduct, description: 'Valid description text' }).description).toBeUndefined();
    });

    it('debe requerir logo', () => {
      expect(validateProduct({ ...validProduct, logo: '' }).logo).toBeDefined();
      expect(validateProduct({ ...validProduct, logo: 'logo.png' }).logo).toBeUndefined();
    });

    it('debe validar formato de fecha de liberación (DD-MM-YYYY)', () => {
      expect(validateProduct({ ...validProduct, dateRelease: '2025-12-25' }).dateRelease).toBeDefined();
      expect(validateProduct({ ...validProduct, dateRelease: '' }).dateRelease).toBeDefined();
    });

    it('debe rechazar fechas pasadas para fecha de liberación', () => {
      const errors = validateProduct({ ...validProduct, dateRelease: '01-01-2020', dateRevision: '01-01-2021' });
      expect(errors.dateRelease).toBeDefined();
    });

    it('debe validar que fecha de revisión sea exactamente 1 año después de fecha de liberación', () => {
      const releaseDate = futureDate;
      const incorrectRevisionDate = futureDatePlusOneYear === '01-01-2027' ? '02-01-2027' : '01-01-2027';
      const correctRevisionDate = futureDatePlusOneYear;

      expect(validateProduct({ ...validProduct, dateRelease: releaseDate, dateRevision: incorrectRevisionDate }).dateRevision).toBeDefined();
      expect(validateProduct({ ...validProduct, dateRelease: releaseDate, dateRevision: correctRevisionDate }).dateRevision).toBeUndefined();
    });
  });

  describe('hasErrors', () => {
    it('debe retornar false para objeto de errores vacío', () => {
      expect(hasErrors({})).toBe(false);
    });

    it('debe retornar true cuando existen errores', () => {
      expect(hasErrors({ id: 'Error' })).toBe(true);
      expect(hasErrors({ id: 'Error', name: 'Error' })).toBe(true);
    });
  });
});
