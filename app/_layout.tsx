import { Stack } from 'expo-router';
import { colors } from './styles/globalStyles';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.textGrey,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '700',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '🏦 BANCO',
        }}
      />
      <Stack.Screen
        name="screens/ProductDetail"
        options={{
          title: '🏦 BANCO',
        }}
      />

    </Stack>
  );
}
