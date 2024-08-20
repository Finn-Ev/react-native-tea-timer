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
  const textColor = useThemeColor('primary');
  const backgroundColor = useThemeColor('secondary');
  return (
    <Pressable
      style={[
        styles.button,
        style as StyleProp<ViewStyle>,
        { backgroundColor: backgroundColor },
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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
