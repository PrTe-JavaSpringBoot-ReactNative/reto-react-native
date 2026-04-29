import * as dotenv from 'expo-dotenv';

dotenv.load();

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.3.187:3002/bp';

export const config = {
  API_BASE_URL,
};
