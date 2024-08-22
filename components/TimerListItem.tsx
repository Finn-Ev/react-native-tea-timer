import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useClickOutside } from 'react-native-click-outside';
import { Timer, useTimers } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './theme/ThemedText';

interface TimerListCardProps extends Timer {}

export default function TimerListItem({
  title,
  infusions,
  id,
}: TimerListCardProps) {
  const { deleteTimer } = useTimers();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // used to be able to close the dropdown menu when clicking outside of it
  const dropdownMenuRef = useClickOutside<View>(() => setIsDropdownOpen(false));

  const backgroundColor = useThemeColor('content');
  const borderColor = useThemeColor('accent');

  const handleDeleteTimer = () => {
    Alert.alert('Delete Timer', 'Are you sure you want to delete this timer?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          deleteTimer(id);
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.mainContent, { backgroundColor }]}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText>Infusions: {infusions.length}</ThemedText>
        <Pressable
          style={styles.dropdownButton}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Ionicons name="ellipsis-horizontal" size={22} />
        </Pressable>
      </View>
      {isDropdownOpen && (
        <View
          ref={dropdownMenuRef}
          style={[styles.dropdownMenu, { borderColor }]}
        >
          <Pressable
            onPress={handleDeleteTimer}
            style={[
              styles.dropdownOption,
              { borderBottomWidth: 1, borderColor },
            ]}
          >
            <ThemedText>Delete</ThemedText>
            {/* <Ionicons name="close-outline" size={20} /> */}
          </Pressable>
          <Pressable
            onPress={() => router.push(`/edit-timer/${id}`)}
            style={styles.dropdownOption}
          >
            <ThemedText>Edit</ThemedText>
            {/* <Ionicons name="chevron-forward" size={22} /> */}
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: '48%',
    margin: '1%',
  },
  mainContent: {
    padding: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  dropdownButton: {
    position: 'absolute',
    top: -12,
    right: 0,
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: -2,
    right: 34,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: 'white',
  },
  dropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
