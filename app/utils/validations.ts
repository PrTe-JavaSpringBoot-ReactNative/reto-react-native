import { FormErrors, Product } from '../types';

export const validateProduct = (product: Partial<Product>): FormErrors => {
  const errors: FormErrors = {};

  // Validar ID
  if (!product.id || product.id.trim() === '') {
    errors.id = 'El ID es requerido';
  } else if (product.id.length < 3) {
    errors.id = 'El ID debe tener mínimo 3 caracteres';
  } else if (product.id.length > 10) {
    errors.id = 'El ID debe tener máximo 10 caracteres';
  }

  // Validar Nombre
  if (!product.nombre || product.nombre.trim() === '') {
    errors.nombre = 'El nombre es requerido';
  } else if (product.nombre.length < 5) {
    errors.nombre = 'El nombre debe tener mínimo 5 caracteres';
  } else if (product.nombre.length > 100) {
    errors.nombre = 'El nombre debe tener máximo 100 caracteres';
  }

  // Validar Descripción
  if (!product.descripcion || product.descripcion.trim() === '') {
    errors.descripcion = 'La descripción es requerida';
  } else if (product.descripcion.length < 10) {
    errors.descripcion = 'La descripción debe tener mínimo 10 caracteres';
  } else if (product.descripcion.length > 200) {
    errors.descripcion = 'La descripción debe tener máximo 200 caracteres';
  }

  // Validar Logo
  if (!product.logo || product.logo.trim() === '') {
    errors.logo = 'El logo es requerido';
  }

  // Validar Fecha de Liberación
  if (!product.fechaLiberacion) {
    errors.fechaLiberacion = 'La fecha de liberación es requerida';
  } else {
    const liberation = new Date(product.fechaLiberacion);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (liberation < today) {
      errors.fechaLiberacion = 'La fecha debe ser igual o mayor a la fecha actual';
    }
  }

  // Validar Fecha de Revisión
  if (!product.fechaRevision) {
    errors.fechaRevision = 'La fecha de revisión es requerida';
  } else if (product.fechaLiberacion) {
    const liberation = new Date(product.fechaLiberacion);
    const revision = new Date(product.fechaRevision);
    const expectedRevision = new Date(liberation);
    expectedRevision.setFullYear(expectedRevision.getFullYear() + 1);

    // Comparar sin la hora
    if (revision.toDateString() !== expectedRevision.toDateString()) {
      errors.fechaRevision =
        'La fecha de revisión debe ser exactamente un año después de la fecha de liberación';
    }
  }

  return errors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
