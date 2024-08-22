import { StyleSheet } from 'react-native';
import { Timer } from '../context/timersContext';
import { ThemedView } from './theme/ThemedView';
import TimerListItem from './TimerListItem';

interface TimerListProps {
  timers: Timer[];
}

export default function TimerList({ timers }: TimerListProps) {
  return (
    <ThemedView style={styles.container}>
      {timers.map(timer => (
        <TimerListItem key={timer.id} {...timer} />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    // gap: 4,
  },
});
