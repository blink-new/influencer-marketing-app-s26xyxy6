import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Redirect to the main tabs
    router.replace('/(tabs)/discover');
  }, []);

  return null;
}