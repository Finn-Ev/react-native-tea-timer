import { StyleSheet } from 'react-native';
import { useTimers } from '../context/timersContext';
import CategoryGridItem from './CategoryGridItem';
import { ThemedView } from './theme/ThemedView';

export default function CategoryGrid() {
  const { customTimerCategories } = useTimers();

  return (
    <ThemedView style={styles.container}>
      {customTimerCategories.map((category, index) => (
        <CategoryGridItem key={category.id} {...category} index={index} />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
