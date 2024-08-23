import { StyleSheet } from 'react-native';
import { Timer } from '../context/timersContext';
import { ThemedView } from './theme/ThemedView';
import TimerGridItem from './TimerGridItem';

interface TimerListProps {
  timers: Timer[];
}

export default function TimerGrid({ timers }: TimerListProps) {
  return (
    <ThemedView style={styles.container}>
      {timers.map((timer, index) => (
        <TimerGridItem key={timer.id} {...timer} index={index} />
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
    flexWrap: 'wrap',
  },
});
