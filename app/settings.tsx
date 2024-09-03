import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedView } from "@/components/theme/ThemedView";
import { TimerSound, useSettings } from "@/context/settingsContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";
import ThemedButton from "../components/theme/ThemedButton";
import { useTimers } from "../context/timersContext";
import { useThemeColor } from "../hooks/useThemeColor";

export default function SettingsScreen() {
  const router = useRouter();
  const { clearAllTimerData } = useTimers();
  const { settings, setMuteTimerSounds, setSelectedTimerSound, setShowTimerHeroImage } = useSettings();
  const currentSoundObject = settings.selectedTimerSound?.soundObject;

  const handleDeleteTimerData = () => {
    Alert.alert("Delete All Timers", "All categories and timers will be deleted. Are you sure?", [
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          clearAllTimerData();
          router.replace("/");
        },
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  const handleTimerSelection = async (sound: TimerSound) => {
    // Stop the currently playing sound before playing the new one
    if (currentSoundObject) {
      await currentSoundObject.stopAsync();
    }

    if (sound.soundObject) {
      await sound.soundObject.playAsync();
    }

    setSelectedTimerSound(sound);
  };

  // stop the sound when the component unmounts
  useEffect(() => {
    return () => {
      if (currentSoundObject) {
        currentSoundObject.stopAsync();
      }
    };
  }, [currentSoundObject]);

  const accentColor = useThemeColor("accent");
  const textColor = useThemeColor("secondary");
  const backgroundColor = useThemeColor("content");

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <ThemedView style={styles.pageContainer}>
        <ThemedText style={styles.sectionTitle} type="subtitle">
          Sound
        </ThemedText>
        <View
          style={{
            ...styles.basicOption,
            borderColor: accentColor,
            backgroundColor,
          }}
        >
          <ThemedText>Mute Timer Sounds?</ThemedText>
          <Switch value={settings.muteTimerSounds} onValueChange={setMuteTimerSounds} />
        </View>
        {!settings.muteTimerSounds && (
          <View
            style={{
              ...styles.selectTimerSoundSection,
              borderColor: accentColor,
              backgroundColor,
            }}
          >
            <ThemedText>Timer Sound</ThemedText>
            {settings.availableTimerSounds.map((sound, idx) => (
              <Pressable
                onPress={() => handleTimerSelection(sound)}
                key={sound.id}
                style={{
                  ...styles.timerSound,
                  borderColor: accentColor,
                  ...(idx === 0 && { borderTopWidth: 0 }),
                }}
              >
                <ThemedText>{sound.name}</ThemedText>
                {settings.selectedTimerSound?.id === sound.id && (
                  <Ionicons name="checkmark" size={24} color={textColor} />
                )}
              </Pressable>
            ))}
          </View>
        )}
        <ThemedText style={styles.sectionTitle} type="subtitle">
          Miscellaneous
        </ThemedText>
        <View
          style={{
            ...styles.basicOption,
            borderColor: accentColor,
            backgroundColor,
          }}
        >
          <ThemedText>Show Hero Image in Timer List</ThemedText>
          <Switch value={settings.showTimerHeroImage} onValueChange={setShowTimerHeroImage} />
        </View>
        <ThemedButton style={styles.resetButton} title="Delete All Timers" onPress={handleDeleteTimerData} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    padding: 8,
    minHeight: "100%",
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  basicOption: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
  },
  selectTimerSoundSection: {
    marginTop: 16,
    borderWidth: 1,

    padding: 8,
    borderRadius: 12,
  },
  timerSound: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
  },
  resetButton: {
    marginTop: 12,
  },
});
