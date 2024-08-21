import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';
import { ThemedView } from '../../components/theme/ThemedView';
import { useTimers } from '../../context/timersContext';

export default function CategoryDetailScreen() {
  const { timerCategories } = useTimers();
  const router = useRouter();
  const navigation = useNavigation();

  const { categoryId } = useLocalSearchParams();

  useLayoutEffect(() => {
    const category = timerCategories.find(
      category => category.id === categoryId
    );
    if (!category) {
      router.replace('/timers');
      return;
    }

    navigation.setOptions({ headerTitle: category.title });
  }, [navigation]);

  return <ThemedView></ThemedView>;
}
