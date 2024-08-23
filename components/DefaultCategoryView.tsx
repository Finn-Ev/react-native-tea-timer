import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTimers } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './theme/ThemedText';
import { ThemedView } from './theme/ThemedView';
import TimerGrid from './TimerGrid';

export default function DefaultCategoryView() {
  const asyncStorageKey = 'isDefaultTimerCategoryExpanded';

  const { defaultCategory, customTimerCategories } = useTimers();

  const [isExpanded, setIsExpanded] = useState(false);

  const borderColor = useThemeColor('accent');

  useEffect(() => {
    AsyncStorage.getItem(asyncStorageKey).then(value => {
      setIsExpanded(value === 'true');
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(asyncStorageKey, JSON.stringify(isExpanded));
  }, [isExpanded]);

  return (
    <>
      <ThemedView>
        {defaultCategory.timers.length > 0 && (
          <View
            style={[
              styles.uncategorisedTimers,
              {
                marginTop: customTimerCategories.length ? 12 : 0,
                paddingTop: customTimerCategories.length ? 12 : 0,
                borderColor: customTimerCategories.length
                  ? borderColor
                  : 'transparent',
              },
            ]}
          >
            {customTimerCategories.length > 0 && (
              <Pressable
                style={styles.uncategorisedTimersTitleWrapper}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <ThemedText style={styles.uncategorisedTimersTitle}>
                  {defaultCategory.title}
                </ThemedText>
                <Ionicons
                  name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                  size={24}
                />
              </Pressable>
            )}
            {isExpanded && <TimerGrid timers={defaultCategory.timers} />}
          </View>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  uncategorisedTimers: {
    borderTopWidth: 1,
  },
  uncategorisedTimersTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uncategorisedTimersTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
});
