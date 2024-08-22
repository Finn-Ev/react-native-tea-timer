import TimerForm from '@/components/TimerForm';
import { defaultCategoryId, useTimers } from '@/context/timersContext';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CreateTimerScreen() {
  const { addTimer } = useTimers();
  const router = useRouter();
  const { categoryId: preSelectedCategoryId } = useLocalSearchParams();

  const handleSave = (
    title: string,
    infusions: number[],
    categoryId: string
  ) => {
    const timer = {
      title,
      infusions,
      id: Math.random().toString(36).substring(7),
    };

    addTimer(categoryId, timer);

    if (categoryId === preSelectedCategoryId) {
      router.back();
    } else if (categoryId === defaultCategoryId) {
      router.replace(`/timers`);
    } else {
      router.replace(`/category/${categoryId}`);
    }
  };

  return (
    <TimerForm
      initialCategoryId={preSelectedCategoryId as string}
      onSave={handleSave}
    />
  );
}
