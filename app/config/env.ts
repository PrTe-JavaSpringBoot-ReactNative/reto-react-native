// Expo exposes environment variables with EXPO_PUBLIC_ prefix automatically
// You can set these in .env file and Expo will inject them at build time

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.3.187:3002/bp';

export const config = {
  API_BASE_URL,
};
