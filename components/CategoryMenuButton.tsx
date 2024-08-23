import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable } from 'react-native';
import { TimerCategory, useTimers } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';

interface CategoryActionSheetProps {
  category: TimerCategory;
}

export default function CategoryMenuButton({
  category,
}: CategoryActionSheetProps) {
  const { showActionSheetWithOptions } = useActionSheet();

  const { deleteTimerCategory, updateTimerCategory } = useTimers();

  const tintColor = useThemeColor('icon');

  const showActionSheet = () => {
    const options = ['Change category title', 'Delete category', 'Cancel'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: any) => {
        switch (selectedIndex) {
          case 0:
            Alert.prompt(
              'Change Category Title',
              '',
              newTitle => {
                if (newTitle) {
                  updateTimerCategory(category.id, { title: newTitle });
                }
              },
              'plain-text',
              category.title
            );
            break;

          case destructiveButtonIndex:
            Alert.alert(
              'Delete Category',
              'Are you sure you want to delete this category and all its timers?',
              [
                {
                  text: 'Yes, delete',
                  style: 'destructive',
                  onPress: () => {
                    deleteTimerCategory(category.id);
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]
            );
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <Pressable onPress={showActionSheet}>
      <Ionicons name="ellipsis-horizontal" color={tintColor} size={24} />
    </Pressable>
  );
}
