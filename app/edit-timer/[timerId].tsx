import ThemedIcon from '@/components/theme/ThemedIcon';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import CategoryList from '../../components/CategoryList';
import InfusionCard from '../../components/InfusionCard';
import { ThemedText } from '../../components/theme/ThemedText';
import ThemedTextInput from '../../components/theme/ThemedTextInput';
import { ThemedView } from '../../components/theme/ThemedView';
import { defaultCategoryId, useTimers } from '../../context/timersContext';

export default function EditTimerScreen() {
  const { updateTimer, getTimerCategoryByTimerId, getTimerById } = useTimers();

  const navigation = useNavigation();
  const router = useRouter();

  const localSearchParams = useLocalSearchParams();
  const timerId = localSearchParams.timerId as string;

  if (!timerId) {
    throw new Error('Timer id is required');
  }

  const initialTimerData = getTimerById(timerId);
  const initialTimerCategory = getTimerCategoryByTimerId(timerId);

  const [title, setTitle] = useState(initialTimerData.title);
  const [infusions, setInfusions] = useState<number[]>(
    initialTimerData.infusions
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    initialTimerCategory.id
  );

  if (!selectedCategoryId) {
    throw new Error('Category id is required');
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleSave}>
          <ThemedText>Save</ThemedText>
        </Pressable>
      ),
    });
  }, [navigation, title, selectedCategoryId, infusions]);

  const handleSave = () => {
    if (!title || infusions.length === 0) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const updatedTimerData = {
      title,
      infusions,
    };

    updateTimer(timerId, updatedTimerData);

    // Determine the appropriate route based on the category selection
    if (selectedCategoryId === initialTimerCategory.id) {
      // If the category is unchanged, just go back to the previous screen
      router.back();
    } else if (selectedCategoryId === defaultCategoryId) {
      // If the category was changed to the default category
      router.replace(`/timers`);
    } else {
      // If the category was changed to another custom category
      router.replace(`/category/${selectedCategoryId}`);
    }
  };

  const handleDurationChange = (index: number, value: number) => {
    const newInfusions = [...infusions];
    newInfusions[index] = value;
    setInfusions(newInfusions);
  };

  const handleCategorySelection = (categoryId: string) => {
    if (categoryId === selectedCategoryId) {
      setSelectedCategoryId(defaultCategoryId);
    } else {
      setSelectedCategoryId(categoryId);
    }
  };

  const handleAddInfusion = () => {
    setInfusions([...infusions, 0]);
  };

  const handleDeleteInfusion = (index: number) => {
    const newInfusions = [...infusions];
    newInfusions.splice(index, 1);
    setInfusions(newInfusions);
  };

  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView>
        <View>
          <ThemedTextInput
            value={title}
            onChangeText={setTitle}
            label="Name"
            style={{}}
            placeholder="e.g. Sencha"
          />
          <View style={styles.categoryList}>
            <ThemedText>Category</ThemedText>
            <CategoryList
              selectedCategoryId={selectedCategoryId}
              handleCategorySelection={handleCategorySelection}
            />
          </View>
          <View style={styles.infusionList}>
            <ThemedText>Infusions</ThemedText>
            {infusions.map((duration, index) => (
              <InfusionCard
                key={index}
                index={index}
                duration={duration}
                onDurationChange={handleDurationChange}
                deleteInfusion={handleDeleteInfusion}
              />
            ))}
          </View>
          <View style={styles.addInfusionIconWrapper}>
            <Pressable onPress={handleAddInfusion}>
              <ThemedIcon name="add-circle" size={56} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    minHeight: '100%',
    padding: 8,
  },
  categoryList: {
    marginTop: 16,
    display: 'flex',
    gap: 8,
  },
  infusionList: {
    marginTop: 16,
    display: 'flex',
    gap: 8,
  },
  addInfusionIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingBottom: 32,
  },
});
