import { View } from "react-native";
import { ThemedText } from "./theme/ThemedText";

interface TimerClockProps {
  duration: number;
}

export default function TimerClock({ duration }: TimerClockProps) {
  return (
    <View>
      {/* TODO actual timerView with decreasing time, pause and reset button and options to add/subtract 3 sec. manually*/}

      <ThemedText>{duration}</ThemedText>
    </View>
  );
}
