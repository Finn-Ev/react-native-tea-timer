import AsyncStorage from "@react-native-async-storage/async-storage"; // Or localStorage for web
import { Audio } from "expo-av";
import React, { createContext, useContext, useEffect, useState } from "react";

export type TimerSound = {
  id: string;
  name: string;
  audioFilePath: number; // Update this to expect a module reference
  soundObject?: Audio.Sound;
};

export type Settings = {
  showTimerHeroImage: boolean;
  muteTimerSounds: boolean;
  selectedTimerSound: TimerSound | null;
  availableTimerSounds: TimerSound[];
};

const defaultSettings: Omit<Settings, "availableTimerSounds"> = {
  showTimerHeroImage: true,
  muteTimerSounds: false,
  selectedTimerSound: null,
};

const initialAvailableTimerSounds: TimerSound[] = [
  { id: "1", name: "Tingsha", audioFilePath: require("@/assets/sounds/tingsha.mp3") },
  { id: "2", name: "Bell", audioFilePath: require("@/assets/sounds/bell.mp3") },
];

// Create SettingsContext
const SettingsContext = createContext<
  | {
      settings: Settings;
      setShowTimerHeroImage: (show: boolean) => void;
      setMuteTimerSounds: (mute: boolean) => void;
      setSelectedTimerSound: (sound: TimerSound) => void;
      resetSettings: () => void;
    }
  | undefined
>(undefined);

// SettingsProvider Component
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    ...defaultSettings,
    availableTimerSounds: initialAvailableTimerSounds,
  });

  useEffect(() => {
    const loadSounds = async () => {
      const soundsWithObjects = await Promise.all(
        initialAvailableTimerSounds.map(async (sound) => {
          const { sound: soundObject } = await Audio.Sound.createAsync(sound.audioFilePath);
          return { ...sound, soundObject };
        })
      );

      setSettings((prevSettings) => ({
        ...prevSettings,
        availableTimerSounds: soundsWithObjects,
        selectedTimerSound:
          soundsWithObjects.find((sound) => sound.id === prevSettings.selectedTimerSound?.id) || soundsWithObjects[0], // Ensure the selected sound is updated with the sound object
      }));
    };

    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem("settings");
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings((prevSettings) => ({
            ...prevSettings,
            ...parsedSettings,
          }));
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    };

    loadSettings();
    loadSounds();

    return () => {
      // Unload sounds when the provider unmounts
      settings.availableTimerSounds.forEach((sound) => sound.soundObject?.unloadAsync());
    };
  }, []);

  // Save settings to AsyncStorage whenever settings change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem("settings", JSON.stringify(settings));
      } catch (error) {
        console.error("Failed to save settings", error);
      }
    };

    saveSettings();
  }, [settings]);

  // Set the selected timer sound
  const setSelectedTimerSound = (sound: TimerSound) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      selectedTimerSound: sound,
    }));
  };

  // Set the showTimerHeroImage setting
  const setShowTimerHeroImage = (show: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      showTimerHeroImage: show,
    }));
  };

  // Set the muteTimerSounds setting
  const setMuteTimerSounds = (mute: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      muteTimerSounds: mute,
    }));
  };

  // Reset settings to default
  const resetSettings = () => {
    setSettings({
      ...defaultSettings,
      availableTimerSounds: initialAvailableTimerSounds,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setShowTimerHeroImage,
        setMuteTimerSounds,
        setSelectedTimerSound,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the SettingsContext
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
