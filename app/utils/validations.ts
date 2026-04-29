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
  if (!product.name || product.name.trim() === '') {
    errors.name = 'El nombre es requerido';
  } else if (product.name.length < 5) {
    errors.name = 'El nombre debe tener mínimo 5 caracteres';
  } else if (product.name.length > 100) {
    errors.name = 'El nombre debe tener máximo 100 caracteres';
  }

  // Validar Descripción
  if (!product.description || product.description.trim() === '') {
    errors.description = 'La descripción es requerida';
  } else if (product.description.length < 10) {
    errors.description = 'La descripción debe tener mínimo 10 caracteres';
  } else if (product.description.length > 200) {
    errors.description = 'La descripción debe tener máximo 200 caracteres';
  }

  // Validar Logo
  if (!product.logo || product.logo.trim() === '') {
    errors.logo = 'El logo es requerido';
  }

  // Validar Fecha de Liberación
  if (!product.dateRelease) {
    errors.dateRelease = 'La fecha de liberación es requerida';
  } else {
    const liberation = new Date(product.dateRelease);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (liberation < today) {
      errors.dateRelease = 'La fecha debe ser igual o mayor a la fecha actual';
    }
  }

  // Validar Fecha de Revisión
  if (!product.dateRevision) {
    errors.dateRevision = 'La fecha de revisión es requerida';
  } else if (product.dateRelease) {
    const liberation = new Date(product.dateRelease);
    const revision = new Date(product.dateRevision);
    const expectedRevision = new Date(liberation);
    expectedRevision.setFullYear(expectedRevision.getFullYear() + 1);

    // Comparar sin la hora
    if (revision.toDateString() !== expectedRevision.toDateString()) {
      errors.dateRevision =
        'La fecha de revisión debe ser exactamente un año después de la fecha de liberación';
    }
  }

  return errors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
