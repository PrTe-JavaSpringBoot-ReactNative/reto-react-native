import { Product, ApiResponse } from '../types';
import { config } from '../config/env';

const API_BASE_URL = `${config.API_BASE_URL}/bp/products`;

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
