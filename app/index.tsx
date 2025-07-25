import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function Index() {
  useFrameworkReady();

  useEffect(() => {
    // Small delay to ensure tabs are ready
    const timer = setTimeout(() => {
      router.replace('/(tabs)/discover');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6366F1' }}>Loading...</Text>
    </View>
  );
}