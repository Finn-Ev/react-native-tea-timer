import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import ThemedButton from "./theme/ThemedButton";

interface TimerClockProps {
  infusions: number[];
  currentInfusionIndex: number;
  setCurrentInfusionIndex: (index: number) => void;
  setAreAllInfusionsDone: (done: boolean) => void;
}

export default function TimerClock({
  infusions,
  currentInfusionIndex,
  setCurrentInfusionIndex,
  setAreAllInfusionsDone,
}: TimerClockProps) {
  const secondaryColor = useThemeColor("secondary");

  const [displayedDuration, setDisplayedDuration] = useState(infusions[currentInfusionIndex]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setDisplayedDuration((prevDuration) => {
          if (prevDuration <= 1) {
            clearInterval(interval!);
            setIsRunning(false);
            setIsPaused(false);
            if (currentInfusionIndex < infusions.length - 1) {
              setCurrentInfusionIndex(currentInfusionIndex + 1);
            } else {
              setAreAllInfusionsDone(true);
            }
            return 0;
          }
          return prevDuration - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  useEffect(() => {
    setDisplayedDuration(infusions[currentInfusionIndex]);
    setIsRunning(false);
    setIsPaused(false);
  }, [currentInfusionIndex]);

  const handlePauseResume = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setDisplayedDuration(infusions[currentInfusionIndex]);
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeString = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    return timeString.split("");
  };

  const timeArray = formatTime(displayedDuration);

  return (
    <View style={styles.container}>
      <View style={styles.clockWrapper}>
        {timeArray.map((char, index) => (
          <Text
            key={index}
            style={[
              styles.displayDigit,
              {
                // vertically align the colon
                marginTop: index === 2 ? -6 : 0,
              },
            ]}
          >
            {char}
          </Text>
        ))}
      </View>

      <View style={styles.actionButtonContainer}>
        <ThemedButton
          onPress={handleReset}
          title={"Reset"}
          style={[styles.actionButton, { backgroundColor: secondaryColor }]}
          fontSize={18}
        />
        <ThemedButton
          onPress={handlePauseResume}
          title={isPaused || !isRunning ? "Start" : "Pause"}
          style={[styles.actionButton, { backgroundColor: secondaryColor }]}
          fontSize={18}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    display: "flex",
    alignItems: "center",
    padding: 16,
  },
  clockWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  displayDigit: {
    fontSize: 42,
    fontWeight: "normal",
    textAlign: "center",
    width: 26,
  },
  actionButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
    gap: 16,
  },
  actionButton: {
    backgroundColor: "lightblue",
    borderRadius: 8,
    width: 75,
  },
});
