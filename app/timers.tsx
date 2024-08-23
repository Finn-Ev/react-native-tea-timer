import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/theme/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import CategoryGrid from '../components/CategoryGrid';
import DefaultCategoryView from '../components/DefaultCategoryView';
import { ThemedText } from '../components/theme/ThemedText';
import { useSettings } from '../context/settingsContext';
import { useTimers } from '../context/timersContext';

export default function TimersScreen() {
  const { settings } = useSettings();
  const { customTimerCategories, defaultCategory } = useTimers();

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
            <CategoryGrid />
            <DefaultCategoryView />
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
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
});
