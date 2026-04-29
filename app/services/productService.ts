import { Product, ApiResponse } from '../types';
import { config } from '../config/env';

const API_BASE_URL = `${config.API_BASE_URL}/bp/products`;

// Helper function to convert DD-MM-YYYY to YYYY-MM-DD
const convertDateToServer = (dateString: string): string => {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

// Obtener lista de productos
export const fetchProducts = async (
): Promise<ApiResponse<Product>> => {
  try {
    let url = `${API_BASE_URL}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener productos');
    }

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id'> & { id: string }): Promise<Product> => {
  try {
    // Convert to snake_case format expected by backend
    // Convert dates from DD-MM-YYYY to YYYY-MM-DD
    const productToSend = {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: convertDateToServer(product.dateRelease),
      date_revision: convertDateToServer(product.dateRevision),
    };

    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productToSend),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0] || data.message || 'Error al crear producto');
    }

    return data.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
