import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Or localStorage for web

export type Settings = {
  showTimerHeroImage: boolean;
  muteTimerSounds: boolean;
  selectedTimerSound: TimerSound | null;
  availableTimerSounds: TimerSound[];
};

export type TimerSound = {
  id: string;
  name: string;
  audioFilePath: string;
};

const defaultSettings: Settings = {
  showTimerHeroImage: true,
  muteTimerSounds: false,
  selectedTimerSound: {
    id: '1',
    name: 'Default',
    audioFilePath: './assets/sounds/default.mp3',
  },
  availableTimerSounds: [
    { id: '1', name: 'Default', audioFilePath: './assets/sounds/default.mp3' },
    { id: '2', name: 'Chime', audioFilePath: './assets/sounds/chime.mp3' },
    { id: '3', name: 'Bell', audioFilePath: './assets/sounds/bell.mp3' },
  ],
};

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
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Load settings from AsyncStorage (or localStorage for web) when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('settings');
        if (savedSettings) {
          setSettings({
            ...JSON.parse(savedSettings),
            availableTimerSounds: defaultSettings.availableTimerSounds,
          });
        }
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever settings change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('settings', JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings', error);
      }
    };

    saveSettings();
  }, [settings]);

  // Set the selected timer sound
  const setSelectedTimerSound = (sound: TimerSound) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      selectedTimerSound: sound,
    }));
  };

  // Set the showTimerHeroImage setting
  const setShowTimerHeroImage = (show: boolean) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      showTimerHeroImage: show,
    }));
  };

  // Set the muteTimerSounds setting
  const setMuteTimerSounds = (mute: boolean) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      muteTimerSounds: mute,
    }));
  };

  // Reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
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
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
