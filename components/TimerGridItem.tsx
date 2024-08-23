import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useClickOutside } from 'react-native-click-outside';
import { Timer, useTimers } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './theme/ThemedText';

interface TimerListCardProps extends Timer {
  index: number;
}

export default function TimerGridItem({
  title,
  infusions,
  id,
  index,
}: TimerListCardProps) {
  const { deleteTimer } = useTimers();
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
    <View
      style={[
        styles.container,
        {
          zIndex: isDropdownOpen ? 1 : 0,
        },
      ]}
    >
      <View style={[styles.mainContent, { backgroundColor, borderColor }]}>
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
            onPress={() => router.push(`/edit-timer/${id}`)}
            style={[
              styles.dropdownOption,
              { borderBottomWidth: 1, borderColor },
            ]}
          >
            <ThemedText>Edit</ThemedText>
            {/* <Ionicons name="chevron-forward" size={22} /> */}
          </Pressable>
          <Pressable onPress={handleDeleteTimer} style={styles.dropdownOption}>
            <ThemedText>Delete</ThemedText>
            {/* <Ionicons name="close-outline" size={20} /> */}
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '49%',
    marginBottom: 8,
  },
  mainContent: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
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
