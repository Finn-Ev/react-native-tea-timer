import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

interface ThemedButtonProps extends TouchableOpacityProps {
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
    <TouchableOpacity
      style={[
        styles.button,
        style as StyleProp<ViewStyle>,
        { backgroundColor: backgroundColor },
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
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
