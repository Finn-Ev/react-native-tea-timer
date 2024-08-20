import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useTimers } from '../context/timersContext';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from './ThemedText';

interface SelectCategoryProps {
  selectedCategoryId: string | null;
  handleCategorySelection: (categoryId: string) => void;
}

export default function SelectCategory({
  selectedCategoryId,
  handleCategorySelection,
}: SelectCategoryProps) {
  const { timerCategories, createTimerCategory } = useTimers();

  const accentColor = useThemeColor('accent');
  const textColor = useThemeColor('secondary');
  const backgroundColor = useThemeColor('content');

  const handleCreateCategory = (title: string) => {
    const newCategory = createTimerCategory(title);
    handleCategorySelection(newCategory.id);
  };

  return (
    <View
      style={{
        ...styles.container,
        borderColor: accentColor,
        backgroundColor: backgroundColor,
      }}
    >
      {timerCategories.map((category, idx) => (
        <Pressable
          onPress={() => handleCategorySelection(category.id)}
          key={category.id}
          style={{
            ...styles.category,
            borderColor: accentColor,
            ...(idx === 0 && { borderTopWidth: 0 }),
          }}
        >
          <ThemedText>{category.title}</ThemedText>
          {selectedCategoryId === category.id && (
            <Ionicons name="checkmark" size={24} color={textColor} />
          )}
        </Pressable>
      ))}

      <Pressable
        onPress={() => {
          Alert.prompt('Create category', 'Enter a name', text => {
            if (text) {
              handleCreateCategory(text);
            }
          });
        }}
        style={{
          ...styles.createCategory,
          borderColor: accentColor,
        }}
      >
        <Ionicons name="add-circle" size={24} color={textColor} />
        <ThemedText>Create category</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,

    padding: 8,
    borderRadius: 12,
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderTopWidth: 1,
  },
  createCategory: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    gap: 4,
  },
});
