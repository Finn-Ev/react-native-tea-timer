import { View, type ViewProps } from 'react-native';

import { useCustomThemeColor, useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useCustomThemeColor({
    light: lightColor,
    dark: darkColor,
  });

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
