import { fetchProducts, createProduct, updateProduct } from '../productService';
import { Product } from '../../types';

globalThis.fetch = jest.fn() as any;

describe('productService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('fetchProducts', () => {
    it('debe obtener y convertir datos del API correctamente', async () => {
      const mockApiResponse = {
        data: [
          {
            id: 'PROD001',
            name: 'Producto 1',
            description: 'Descripción del producto',
            logo: 'logo.png',
            date_release: '2025-12-25',
            date_revision: '2026-12-25',
          },
        ],
        total: 1,
        success: true,
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await fetchProducts();

      expect(result.data[0].dateRelease).toBe('2025-12-25');
      expect(result.data[0].dateRevision).toBe('2026-12-25');
      expect(result.data[0].id).toBe('PROD001');
    });

    it('debe lanzar error cuando la API falla', async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Error del servidor' }),
      });

      await expect(fetchProducts()).rejects.toThrow('Error del servidor');
    });

    it('debe manejar errores de red', async () => {
      (globalThis.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchProducts()).rejects.toThrow('Network error');
    });
  });

  describe('createProduct', () => {
    it('debe convertir fechas DD-MM-YYYY a YYYY-MM-DD antes de enviar', async () => {
      const product: Omit<Product, 'id'> & { id: string } = {
        id: 'PROD001',
        name: 'Nuevo Producto',
        description: 'Descripción del producto',
        logo: 'logo.png',
        dateRelease: '25-12-2025',
        dateRevision: '25-12-2026',
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: {
            id: 'PROD001',
            name: 'Nuevo Producto',
            description: 'Descripción del producto',
            logo: 'logo.png',
            date_release: '2025-12-25',
            date_revision: '2026-12-25',
          },
        }),
      });

      await createProduct(product);

      const callBody = JSON.parse((globalThis.fetch as jest.Mock).mock.calls[0][1].body);
      expect(callBody.date_release).toBe('2025-12-25');
      expect(callBody.date_revision).toBe('2026-12-25');
    });

    it('debe enviar formato snake_case al API', async () => {
      const product: Omit<Product, 'id'> & { id: string } = {
        id: 'PROD001',
        name: 'Producto',
        description: 'Descripción válida',
        logo: 'logo.png',
        dateRelease: '25-12-2025',
        dateRevision: '25-12-2026',
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await createProduct(product);

      const callBody = JSON.parse((globalThis.fetch as jest.Mock).mock.calls[0][1].body);
      expect(callBody).toHaveProperty('date_release');
      expect(callBody).toHaveProperty('date_revision');
      expect(callBody).not.toHaveProperty('dateRelease');
    });

    it('debe lanzar error cuando el API retorna error', async () => {
      const product: Omit<Product, 'id'> & { id: string } = {
        id: 'PROD001',
        name: 'Producto',
        description: 'Descripción válida',
        logo: 'logo.png',
        dateRelease: '25-12-2025',
        dateRevision: '25-12-2026',
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ errors: ['El ID ya existe'] }),
      });

      await expect(createProduct(product)).rejects.toThrow('El ID ya existe');
    });
  });

  describe('updateProduct', () => {
    it('debe actualizar un producto con conversión de fechas', async () => {
      const product: Partial<Product> = {
        name: 'Producto Actualizado',
        description: 'Nueva descripción',
        logo: 'new-logo.png',
        dateRelease: '01-01-2026',
        dateRevision: '01-01-2027',
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await updateProduct('PROD001', product);

      const callBody = JSON.parse((globalThis.fetch as jest.Mock).mock.calls[0][1].body);
      expect(callBody.date_release).toBe('2026-01-01');
      expect(callBody.date_revision).toBe('2027-01-01');
    });

    it('debe enviar solo los campos proporcionados', async () => {
      const product: Partial<Product> = {
        name: 'Producto Actualizado',
        description: 'Nueva descripción',
        logo: 'new-logo.png',
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await updateProduct('PROD001', product);

      const callBody = JSON.parse((globalThis.fetch as jest.Mock).mock.calls[0][1].body);
      expect(callBody.name).toBe('Producto Actualizado');
      expect(callBody).not.toHaveProperty('dateRelease');
      expect(callBody).not.toHaveProperty('dateRevision');
    });

    it('debe lanzar error cuando la actualización falla', async () => {
      const product: Partial<Product> = {
        name: 'Producto Actualizado',
        description: 'Nueva descripción',
        logo: 'new-logo.png',
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Producto no encontrado' }),
      });

      await expect(updateProduct('INVALID_ID', product)).rejects.toThrow('Producto no encontrado');
    });
  });
});
