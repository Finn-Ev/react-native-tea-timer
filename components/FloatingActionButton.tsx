import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface FloatingActionButtonProps {
  onPress?: () => void;
}

export default function FloatingActionButton({
  onPress,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity style={styles.floatingActionButton} onPress={onPress}>
      <Ionicons name="add" size={48} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingActionButton: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    width: 64,
    height: 64,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
