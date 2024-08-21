import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/theme/ThemedView';
import { router } from 'expo-router';
import { ThemedText } from '../components/theme/ThemedText';
import { useSettings } from '../context/settingsContext';
import { useTimers } from '../context/timersContext';

export default function TimersScreen() {
  const { settings } = useSettings();
  const { timerCategories } = useTimers();
  return (
    <ScrollView style={styles.pageContainer}>
      <ThemedView>
        {settings.showTimerHeroImage && (
          <Image source={require('@/assets/images/green-tea.jpg')} />
        )}
        <View style={styles.mainContent}>
          {timerCategories.map(category => (
            <Pressable
              onPress={() => router.push(`/category/${category.id}`)}
              key={category.id}
            >
              <ThemedText type="title">{category.title}</ThemedText>
              <ThemedText type="subtitle">
                {category.timers.length} timers
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
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
