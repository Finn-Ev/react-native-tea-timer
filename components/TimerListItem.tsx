import { Pressable, StyleSheet } from 'react-native';
import { Timer } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './theme/ThemedText';

interface TimerListCardProps extends Timer {}

export default function TimerListItem({
  id,
  title,
  infusions,
}: TimerListCardProps) {
  const backgroundColor = useThemeColor('content');

  return (
    <Pressable style={[styles.container, { backgroundColor }]}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText>Infusions: {infusions.length}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    padding: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
