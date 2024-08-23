import { Ionicons } from '@expo/vector-icons';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import CategoryMenuButton from '../../components/CategoryMenuButton';
import { ThemedText } from '../../components/theme/ThemedText';
import { ThemedView } from '../../components/theme/ThemedView';
import TimerGrid from '../../components/TimerGrid';
import { useSettings } from '../../context/settingsContext';
import { useTimers } from '../../context/timersContext';

export default function CategoryDetailScreen() {
  const { getCategoryById } = useTimers();
  const { settings } = useSettings();

  const navigation = useNavigation();

  const { categoryId } = useLocalSearchParams();

  const category = getCategoryById(categoryId as string);

  useEffect(() => {
    if (!category) {
      return;
    }
    navigation.setOptions({
      headerTitle: category.title,
      headerRight: ({ tintColor }: any) => (
        <View style={styles.headerRightButtons}>
          <CategoryMenuButton category={category} />
          <Link href={`/create-timer/${categoryId}`}>
            <Ionicons name="add-outline" color={tintColor} size={28} />
          </Link>
        </View>
      ),
    });
  }, [navigation, category?.title]);

  if (!category) {
    router.replace('/timers');
    return;
  }

  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView style={styles.scrollView}>
        {settings.showTimerHeroImage && (
          <Image source={require('@/assets/images/green-tea.jpg')} />
        )}
        <View style={styles.mainContent}>
          {category.timers.length === 0 ? (
            <View style={styles.noTimersHint}>
              <ThemedText type="subtitle">
                No timers in this category yet
              </ThemedText>
              <View style={styles.noTimersHintMessage}>
                <ThemedText>Create one by clicking on</ThemedText>
                <Ionicons name="add" size={28} />
              </View>
            </View>
          ) : (
            <TimerGrid timers={category.timers} />
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerRightButtons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  pageContainer: {
    flex: 1,
  },
  scrollView: {
    marginBottom: 48,
  },
  mainContent: {
    padding: 8,
  },
  noTimersHint: {
    flex: 1,
    marginTop: 24,
    alignItems: 'center',
  },
  noTimersHintMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
