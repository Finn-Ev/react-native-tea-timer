import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/theme/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedText } from '../components/theme/ThemedText';
import TimerList from '../components/TimerList';
import { useSettings } from '../context/settingsContext';
import { useTimers } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';

export default function TimersScreen() {
  const { settings } = useSettings();
  const { customTimerCategories, defaultCategory } = useTimers();

  const borderColor = useThemeColor('accent');

  const noContentToDisplay =
    customTimerCategories.length === 0 && defaultCategory.timers.length === 0;

  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView style={styles.scrollView}>
        {settings.showTimerHeroImage && (
          <Image source={require('@/assets/images/green-tea.jpg')} />
        )}

        {noContentToDisplay ? (
          <ThemedView style={styles.noContentHint}>
            <ThemedText type="subtitle">No timers created yet</ThemedText>
            <View style={styles.noContentHintMessage}>
              <ThemedText>Create one by clicking on</ThemedText>
              <Ionicons name="add" size={28} />
            </View>
          </ThemedView>
        ) : (
          <View style={styles.mainContent}>
            {customTimerCategories.map(category => (
              <Pressable
                onPress={() => router.push(`/category/${category.id}`)}
                key={category.id}
              >
                <ThemedText type="title">{category.title}</ThemedText>
                <ThemedText type="subtitle">
                  {category.timers.length}{' '}
                  {category.timers.length === 1 ? 'timer' : 'timers'}
                </ThemedText>
              </Pressable>
            ))}
            {defaultCategory.timers.length > 0 && (
              <View style={[styles.uncategorisedTimers, { borderColor }]}>
                <ThemedText type="subtitle">{defaultCategory.title}</ThemedText>
                <TimerList timers={defaultCategory.timers} />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    minHeight: '100%',
    position: 'relative',
  },
  scrollView: {
    marginBottom: 48,
  },
  noContentHint: {
    marginTop: 24,
    alignItems: 'center',
    minHeight: '100%',
  },
  noContentHintMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContent: {
    padding: 8,
  },
  uncategorisedTimers: {
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 8,
  },
});
