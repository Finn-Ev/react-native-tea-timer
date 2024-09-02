import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/theme/ThemedView";
import TimerExecutionView from "../../components/TimerExecutionView";
import { useTimers } from "../../context/timersContext";

export default function ExecuteTimerScreen() {
  const { getTimerById } = useTimers();

  const navigation = useNavigation();
  const { timerId } = useLocalSearchParams();

  const timer = getTimerById(timerId as string);

  useEffect(() => {
    if (!timer) {
      return;
    }
    navigation.setOptions({
      headerTitle: timer.title,
    });
  }, [navigation, timer?.title]);

  return (
    <ThemedView style={styles.container}>
      <TimerExecutionView {...timer} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
