import { Pressable, StyleProp, StyleSheet, Text, TouchableOpacityProps, ViewStyle } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  fontSize?: number;
}

export default function ThemedButton({ title, style, children, fontSize = 16, ...props }: ThemedButtonProps) {
  const textColor = useThemeColor("primary");
  const backgroundColor = useThemeColor("secondary");
  return (
    <Pressable style={[styles.button, style as StyleProp<ViewStyle>, { backgroundColor: backgroundColor }]} {...props}>
      <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },

  text: {
    textAlign: "center",
  },
});
