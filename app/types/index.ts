// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  dateRelease: string;
  dateRevision: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  success: boolean;
  message?: string;
}

export interface FormErrors {
  id?: string;
  name?: string;
  description?: string;
  logo?: string;
  dateRelease?: string;
  dateRevision?: string;
}
