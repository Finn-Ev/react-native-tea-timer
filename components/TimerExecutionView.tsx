import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Timer } from "../context/timersContext";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "./theme/ThemedText";
import { ThemedView } from "./theme/ThemedView";
import TimerClock from "./TimerClock";

interface TimerExecutionViewProps extends Timer {}

export default function TimerExecutionView({ id, infusions }: TimerExecutionViewProps) {
  const [currentInfusionIndex, setCurrentInfusionIndex] = useState<number | null>(null);

  const borderColor = useThemeColor("accent");
  const disabledContentColor = useThemeColor("accent");

  const nextInfusionButtonDisabled = currentInfusionIndex === infusions.length - 1;
  const previousInfusionButtonDisabled = currentInfusionIndex === null || currentInfusionIndex === 0;

  return (
    <ThemedView style={[styles.container, { borderColor }]}>
      {currentInfusionIndex === null ? (
        <Pressable onPress={() => setCurrentInfusionIndex(0)}>
          <ThemedText>Start</ThemedText>
        </Pressable>
      ) : (
        <>
          <ThemedText>
            {currentInfusionIndex + 1}. Infusion: {infusions[currentInfusionIndex]} sec.
          </ThemedText>
          <TimerClock duration={infusions[currentInfusionIndex]} />
          {/* TODO actual timerView with decreasing time, pause and reset button and options to add/subtract 3 sec. manually*/}
          <Pressable
            disabled={nextInfusionButtonDisabled}
            onPress={() => setCurrentInfusionIndex(currentInfusionIndex + 1)}
          >
            <ThemedText style={[nextInfusionButtonDisabled && { color: disabledContentColor }]}>Next</ThemedText>
          </Pressable>

          <Pressable
            disabled={previousInfusionButtonDisabled}
            onPress={() => setCurrentInfusionIndex(currentInfusionIndex - 1)}
          >
            <ThemedText
              style={[
                previousInfusionButtonDisabled && {
                  color: disabledContentColor,
                },
              ]}
            >
              Previous
            </ThemedText>
          </Pressable>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
});
