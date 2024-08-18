import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <ThemedView style={styles.pageContainer}>
        <ThemedText type="default"></ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    padding: 8,
    minHeight: '100%',
  },
});
