import { View } from 'react-native';
import { Timer } from '../context/timersContext';
import { ThemedText } from './theme/ThemedText';
import { ThemedView } from './theme/ThemedView';

interface TimerDetailViewProps extends Timer {}

export default function TimerDetailView({ infusions }: TimerDetailViewProps) {
  return (
    <ThemedView>
      <ThemedText>TODO Notes</ThemedText>
      <ThemedText>Infusions:</ThemedText>
      {infusions.map((infusion, index) => (
        <View key={index}>
          <ThemedText>{infusion}</ThemedText>
        </View>
      ))}
    </ThemedView>
  );
}
