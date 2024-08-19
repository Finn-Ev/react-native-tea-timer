import { StyleSheet, ScrollView, View, Switch, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TimerSound, useSettings } from '@/context/settingsContext';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';

export default function SettingsScreen() {
  const handleTimerSelection = async (sound: TimerSound) => {
    // play the sound when the sound gets newly selected
    if (settings.selectedTimerSound?.id !== sound.id) {
      // Play the selected sound
      //   console.log('Loading Sound');
      //   const { sound: loadedSound } = await Audio.Sound.createAsync(
      //     require(sound.audioFilePath)
      //   );
      //   console.log('Playing Sound');
      //   await loadedSound.playAsync();
    }

    setSelectedTimerSound(sound);
  };

  const {
    settings,
    setMuteTimerSounds,
    setSelectedTimerSound,
    setShowTimerHeroImage,
  } = useSettings();

  const accentColor = useThemeColor('accent');
  const textColor = useThemeColor('text');

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <ThemedView style={styles.pageContainer}>
        <ThemedText style={styles.sectionTitle} type="subtitle">
          General
        </ThemedText>
        <View style={{ ...styles.basicOption, borderColor: accentColor }}>
          <ThemedText>Show Timers Hero Image</ThemedText>
          <Switch
            value={settings.showTimerHeroImage}
            onValueChange={setShowTimerHeroImage}
          />
        </View>
        <ThemedText style={styles.sectionTitle} type="subtitle">
          Sound
        </ThemedText>
        <View style={{ ...styles.basicOption, borderColor: accentColor }}>
          <ThemedText>Mute Timer Sounds?</ThemedText>
          <Switch
            value={settings.muteTimerSounds}
            onValueChange={setMuteTimerSounds}
          />
        </View>
        {!settings.muteTimerSounds && (
          <View
            style={{
              ...styles.selectTimerSoundSection,
              borderColor: accentColor,
            }}
          >
            <ThemedText>Available Timer Sounds</ThemedText>
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
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    padding: 8,
    minHeight: '100%',
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  basicOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
  },
});
