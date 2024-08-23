import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { TimerCategory } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './theme/ThemedText';

interface CategoryGridItemProps extends TimerCategory {
  index: number;
}

export default function CategoryGridItem({
  index,
  id,
  timers,
  title,
}: CategoryGridItemProps) {
  const backgroundColor = useThemeColor('content');
  const borderColor = useThemeColor('accent');

  return (
    <Pressable
      style={[styles.container, { backgroundColor, borderColor }]}
      onPress={() => router.push(`/category/${id}`)}
      key={id}
    >
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText>
        {timers.length} {timers.length === 1 ? 'timer' : 'timers'}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '49%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
