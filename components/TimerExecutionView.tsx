import { useNavigation } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Timer } from "../context/timersContext";
import { useThemeColor } from "../hooks/useThemeColor";
import ThemedButton from "./theme/ThemedButton";
import { ThemedText } from "./theme/ThemedText";
import { ThemedView } from "./theme/ThemedView";
import TimerClock from "./TimerClock";

interface TimerExecutionViewProps extends Timer {}

export default function TimerExecutionView({ infusions }: TimerExecutionViewProps) {
  const navigation = useNavigation();
  const [currentInfusionIndex, setCurrentInfusionIndex] = useState(0);
  const [areAllInfusionsDone, setAreAllInfusionsDone] = useState(false);

  const borderColor = useThemeColor("accent");
  const disabledContentColor = useThemeColor("accent");
  const backgroundColor = useThemeColor("content");

  const skipInfusionButtonDisabled = currentInfusionIndex === infusions.length - 1;
  const previousInfusionButtonDisabled = currentInfusionIndex === null || currentInfusionIndex === 0;

  const handlePrevious = () => {
    if (currentInfusionIndex !== null && currentInfusionIndex > 0) {
      setCurrentInfusionIndex(currentInfusionIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentInfusionIndex !== null && currentInfusionIndex < infusions.length - 1) {
      setCurrentInfusionIndex(currentInfusionIndex + 1);
    }
  };

  if (areAllInfusionsDone) {
    return (
      <ThemedView style={[styles.container, { borderColor, backgroundColor }]}>
        <ThemedText>All infusions are done!</ThemedText>

        <ThemedButton
          onPress={() => {
            setCurrentInfusionIndex(0);
            setAreAllInfusionsDone(false);
          }}
          title="Restart"
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { borderColor, backgroundColor }]}>
      <ThemedText style={styles.infusionCount}>
        Infusion {currentInfusionIndex + 1} of {infusions.length}
      </ThemedText>
      <TimerClock
        infusions={infusions}
        currentInfusionIndex={currentInfusionIndex}
        setCurrentInfusionIndex={setCurrentInfusionIndex}
        setAreAllInfusionsDone={setAreAllInfusionsDone}
      />
      <View style={[styles.timerButtons]}>
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

        <Pressable disabled={skipInfusionButtonDisabled} onPress={handleSkip}>
          <ThemedText style={[skipInfusionButtonDisabled && { color: disabledContentColor }]}>Skip</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  infusionCount: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "semibold",
    marginTop: 8,
  },
  timerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
