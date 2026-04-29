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
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Banco',
        }}
      />

    </Stack>
  );
}
