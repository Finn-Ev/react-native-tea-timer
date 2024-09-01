import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { ThemedText } from "./theme/ThemedText";

interface TimerClockProps {
  infusions: number[];
  currentInfusionIndex: number;
  setCurrentInfusionIndex: (index: number) => void;
  areAllInfusionsDone: boolean;
  setAreAllInfusionsDone: (done: boolean) => void;
}

export default function TimerClock({
  infusions,
  currentInfusionIndex,
  setCurrentInfusionIndex,
  areAllInfusionsDone,
  setAreAllInfusionsDone,
}: TimerClockProps) {
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
            setIsRunning(false); // Stop the timer when it reaches 0
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

  return (
    <View>
      <ThemedText>{displayedDuration}</ThemedText>

      <Button onPress={handlePauseResume} title={isPaused || !isRunning ? "Start" : "Pause"} />
      <Button onPress={handleReset} title="Reset" />
    </View>
  );
}
