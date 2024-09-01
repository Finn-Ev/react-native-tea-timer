import { useNavigation } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Timer } from "../context/timersContext";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "./theme/ThemedText";
import { ThemedView } from "./theme/ThemedView";
import TimerClock from "./TimerClock";

interface TimerExecutionViewProps extends Timer {}

export default function TimerExecutionView({ id, infusions }: TimerExecutionViewProps) {
  const navigation = useNavigation();
  const [currentInfusionIndex, setCurrentInfusionIndex] = useState<number | null>(null);
  const [shouldStartTimerAutomatically, setShouldStartTimerAutomatically] = useState(false);
  const [areAllInfusionsDone, setAreAllInfusionsDone] = useState(false);

  const borderColor = useThemeColor("accent");
  const disabledContentColor = useThemeColor("accent");

  const nextInfusionButtonDisabled = currentInfusionIndex === infusions.length - 1;
  const previousInfusionButtonDisabled = currentInfusionIndex === null || currentInfusionIndex === 0;

  const handleStart = () => {
    setCurrentInfusionIndex(0);
    setShouldStartTimerAutomatically(true);
  };

  const handlePrevious = () => {
    if (currentInfusionIndex !== null && currentInfusionIndex > 0) {
      setCurrentInfusionIndex(currentInfusionIndex - 1);
      setShouldStartTimerAutomatically(false); // Prevent the timer from auto-starting when navigating back
    }
  };

  const handleNext = () => {
    if (currentInfusionIndex !== null && currentInfusionIndex < infusions.length - 1) {
      setCurrentInfusionIndex(currentInfusionIndex + 1);
      setShouldStartTimerAutomatically(false); // Prevent the timer from auto-starting when navigating forward
    }
  };

  if (areAllInfusionsDone) {
    return (
      <ThemedView style={[styles.container, { borderColor }]}>
        <ThemedText>All infusions are done!</ThemedText>

        {/* restart button and back button */}
        <Pressable
          onPress={() => {
            setCurrentInfusionIndex(0);
            setAreAllInfusionsDone(false);
            // setShouldStartTimerAutomatically(true);
          }}
        >
          <ThemedText>Restart</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ThemedText>Back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { borderColor }]}>
      {currentInfusionIndex === null ? (
        <Pressable onPress={handleStart}>
          <ThemedText>Start</ThemedText>
        </Pressable>
      ) : (
        <>
          <ThemedText>
            {currentInfusionIndex + 1}. Infusion: {infusions[currentInfusionIndex]} sec.
          </ThemedText>
          <TimerClock
            infusions={infusions}
            currentInfusionIndex={currentInfusionIndex}
            setCurrentInfusionIndex={setCurrentInfusionIndex}
            shouldStartTimerAutomatically={shouldStartTimerAutomatically}
            areAllInfusionsDone={areAllInfusionsDone}
            setAreAllInfusionsDone={setAreAllInfusionsDone}
          />
          <Pressable disabled={nextInfusionButtonDisabled} onPress={handleNext}>
            <ThemedText style={[nextInfusionButtonDisabled && { color: disabledContentColor }]}>Next</ThemedText>
          </Pressable>

          <Pressable disabled={previousInfusionButtonDisabled} onPress={handlePrevious}>
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
