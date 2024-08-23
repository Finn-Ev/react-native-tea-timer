import { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';
import { ThemedText } from './ThemedText';

interface ThemedTextInputProps extends TextInputProps {
  label?: string;
}

const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
  function ThemedTextInput({ label, style, ...props }, ref) {
    const accent = useThemeColor('accent');
    const textColor = useThemeColor('secondary');

    return (
      <>
        {label && (
          <ThemedText style={[styles.label, { color: textColor }]}>
            {label}
          </ThemedText>
        )}
        <TextInput
          placeholderTextColor={accent}
          ref={ref}
          style={[
            styles.input,
            { borderColor: accent, color: textColor },
            style,
          ]}
          {...props}
        />
      </>
    );
  }
);

const styles = StyleSheet.create({
  label: { marginBottom: 4 },
  input: { borderRadius: 12, borderWidth: 1, padding: 12 },
});

export default ThemedTextInput;
