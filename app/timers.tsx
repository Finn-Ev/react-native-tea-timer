import { Image, StyleSheet, ScrollView, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import FloatingActionButton from '../components/FloatingActionButton';
import { ThemedText } from '../components/ThemedText';

export default function TimersScreen() {
  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView>
        <Image source={require('@/assets/images/green-tea.jpg')} />
        <View style={styles.mainContent}>
          <ThemedText>Test</ThemedText>
        </View>
      </ScrollView>
      <FloatingActionButton onPress={() => {}} />
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
