import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Product, FormErrors } from '../types';
import { validateProduct, hasErrors } from '../utils/validations';
import { createProduct } from '../services/productService';
import { colors, spacing } from '../styles/globalStyles';

// Helper function to format date as DD-MM-YYYY
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

// Helper function to parse DD-MM-YYYY and convert to Date
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Helper function to add 1 year to a date string (DD-MM-YYYY)
const addOneYear = (dateString: string): string => {
  const date = parseDate(dateString);
  date.setFullYear(date.getFullYear() + 1);
  return formatDate(date);
};

export default function AddProductScreen() {
  const router = useRouter();
  const today = formatDate(new Date());
  const nextYear = addOneYear(today);

  const [form, setForm] = useState<Partial<Product>>({
    id: '',
    name: '',
    description: '',
    logo: '',
    dateRelease: today,
    dateRevision: nextYear,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (field: keyof Product, value: string) => {
    setForm({ ...form, [field]: value });

    // Si cambia la fecha de liberación, actualizar automáticamente la fecha de revisión
    if (field === 'dateRelease' && value) {
      const newRevisionDate = addOneYear(value);
      setForm((prev) => ({
        ...prev,
        dateRelease: value,
        dateRevision: newRevisionDate,
      }));
    }

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleReset = () => {
    setForm({
      id: '',
      name: '',
      description: '',
      logo: '',
      dateRelease: today,
      dateRevision: nextYear,
    });
    setErrors({});
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    try {
      setSubmitError(null);
      const validationErrors = validateProduct(form);

      if (hasErrors(validationErrors)) {
        setErrors(validationErrors);
        return;
      }

      setLoading(true);

      // Crear producto con las fechas convertidas
      await createProduct(form as Omit<Product, 'id'> & { id: string });

      setLoading(false);
      router.back();
    } catch (err) {
      setSubmitError('Error al agregar el producto');
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {submitError && <Text style={styles.submitError}>{submitError}</Text>}

      <View>
        <Text style={styles.title}>Formulario de Registro</Text>
      </View>

      {/* ID Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>ID *</Text>
        <TextInput
          style={[styles.input, errors.id && styles.inputError]}
          placeholder="Ej: PROD001"
          value={form.id}
          onChangeText={(text) => handleInputChange('id', text)}
          maxLength={10}
        />
        {errors.id && <Text style={styles.errorText}>{errors.id}</Text>}
      </View>

      {/* Name Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nombre del producto"
          value={form.name}
          onChangeText={(text) => handleInputChange('name', text)}
          maxLength={100}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* Description Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.description && styles.inputError]}
          placeholder="Descripción del producto"
          value={form.description}
          onChangeText={(text) => handleInputChange('description', text)}
          maxLength={200}
          multiline
          numberOfLines={4}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      {/* Logo Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Logo *</Text>
        <TextInput
          style={[styles.input, errors.logo && styles.inputError]}
          placeholder="URL o ruta del logo"
          value={form.logo}
          onChangeText={(text) => handleInputChange('logo', text)}
        />
        {errors.logo && <Text style={styles.errorText}>{errors.logo}</Text>}
      </View>

      {/* Release Date Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de Liberación *</Text>
        <TextInput
          style={[styles.input, errors.dateRelease && styles.inputError]}
          placeholder="DD-MM-YYYY"
          value={form.dateRelease}
          onChangeText={(text) => handleInputChange('dateRelease', text)}
        />
        {errors.dateRelease && <Text style={styles.errorText}>{errors.dateRelease}</Text>}
      </View>

      {/* Revision Date Field */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de Revisión *</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled, errors.dateRevision && styles.inputError]}
          placeholder="DD-MM-YYYY (se actualiza automáticamente)"
          value={form.dateRevision}
          onChangeText={(text) => handleInputChange('dateRevision', text)}
          editable={false}

        />
        {errors.dateRevision && <Text style={styles.errorText}>{errors.dateRevision}</Text>}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <Text style={styles.submitButtonText}>Agregar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.lg * 2,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.white,
  },
  inputDisabled:{
    backgroundColor: colors.lightGrey,
    color: colors.grey,
  },
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
  submitError: {
    color: colors.error,
    backgroundColor: '#FFE5E5',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    fontSize: 14,
  },
  buttonContainer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: colors.border,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: colors.textGrey,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
