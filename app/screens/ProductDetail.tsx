import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../types';
import { colors, spacing } from '../styles/globalStyles';

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [error, setError] = useState<string | null>(null);

  const product: Product = {
    id: params.id as string,
    name: params.name as string,
    description: params.description as string,
    logo: params.logo as string,
    dateRelease: params.dateRelease as string,
    dateRevision: params.dateRevision as string,
  };


  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* ID Section */}
      <View style={styles.idSection}>
        <Text style={styles.idValue}>ID: {product.id}</Text>
        <Text style={styles.idLabel}>Información extra</Text>
      </View>

      {/* Details Card */}
      <View style={styles.detailCard}>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Nombre</Text>
          <Text style={styles.fieldValue}>[{product.name}]</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <Text style={styles.fieldValue}>[{product.description}]</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Logo</Text>
        </View>

        {/* Logo Placeholder */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>Logo</Text>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Fecha liberación</Text>
          <Text style={styles.fieldValue}>
            [{new Date(product.dateRelease).toLocaleDateString('es-ES')}]
          </Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Fecha revisión</Text>
          <Text style={styles.fieldValue}>
            [{new Date(product.dateRevision).toLocaleDateString('es-ES')}]
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.editButton]} >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.deleteButton]} >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
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
  contentContainer: {
    padding: spacing.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idSection: {
    marginBottom: spacing.lg,
  },
  idValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  idLabel: {
    fontSize: 12,
    color: colors.textGrey,
  },
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  fieldRow: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 13,
    color: colors.textGrey,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  fieldValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  logoPlaceholder: {
    width: 180,
    height: 120,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFC700',
  },
  logoText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
    left: -40,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  buttonContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.lightGrey,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  editButtonText: {
    color: colors.textGrey,
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
  },
});
