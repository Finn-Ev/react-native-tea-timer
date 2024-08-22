import TimerForm from '@/components/TimerForm';
import { defaultCategoryId, useTimers } from '@/context/timersContext';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

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

  const handleSave = (
    title: string,
    infusions: number[],
    categoryId: string
  ) => {
    const updatedTimerData = {
      title,
      infusions,
    };

    updateTimer(timerId, categoryId, updatedTimerData);

    if (categoryId === initialTimerCategory.id) {
      router.back();
    } else if (categoryId === defaultCategoryId) {
      router.replace(`/timers`);
    } else {
      router.replace(`/category/${categoryId}`);
    }
  };

  return (
    <TimerForm
      initialTitle={initialTimerData.title}
      initialInfusions={initialTimerData.infusions}
      initialCategoryId={initialTimerCategory.id}
      onSave={handleSave}
      navigation={navigation}
    />
  );
}
