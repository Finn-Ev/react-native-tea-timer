import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface ThemedButtonProps extends PressableProps {
  title: string;
}

export default function ThemedButton({
  title,
  style,
  children,
  ...props
}: ThemedButtonProps) {
  const primaryColor = useThemeColor('primary');
  const secondaryColor = useThemeColor('secondary');
  return (
    <Pressable
      style={[
        styles.button,
        style as StyleProp<ViewStyle>,
        { backgroundColor: primaryColor },
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: secondaryColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});
