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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
});
