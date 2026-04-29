// Product types
export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  logo: string;
  fechaLiberacion: string;
  fechaRevision: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  success: boolean;
  message?: string;
}

export interface FormErrors {
  id?: string;
  nombre?: string;
  descripcion?: string;
  logo?: string;
  fechaLiberacion?: string;
  fechaRevision?: string;
}
