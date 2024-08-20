import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import FloatingActionButton from '../components/FloatingActionButton';
import { ThemedText } from '../components/ThemedText';
import { useSettings } from '../context/settingsContext';
import { defaultCategoryId, useTimers } from '../context/timersContext';

export default function TimersScreen() {
  const { settings } = useSettings();
  const { timerCategories } = useTimers();
  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView>
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
      </ScrollView>
      <FloatingActionButton
        onPress={() => {
          router.push(`/create-timer/${defaultCategoryId}`);
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
