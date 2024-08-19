import { Image, StyleSheet, ScrollView, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import FloatingActionButton from '../components/FloatingActionButton';
import { ThemedText } from '../components/ThemedText';
import { useSettings } from '../context/settingsContext';
import { router } from 'expo-router';

export default function TimersScreen() {
  const { settings } = useSettings();
  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView>
        {settings.showTimerHeroImage && (
          <Image source={require('@/assets/images/green-tea.jpg')} />
        )}
        <View style={styles.mainContent}>
          <ThemedText>Test</ThemedText>
        </View>
      </ScrollView>
      <FloatingActionButton
        onPress={() => {
          router.push('/create-timer');
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    minHeight: '100%',
    position: 'relative',
  },
  mainContent: {
    padding: 8,
  },
});
