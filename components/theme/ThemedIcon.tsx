import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type ThemedIconProps = React.ComponentProps<typeof Ionicons>;

export default function ThemedIcon({ color, ...props }: ThemedIconProps) {
  const themeIconColor = useThemeColor('icon');
  if (!color) {
    color = themeIconColor;
  }

  return <Ionicons color={color} {...props} />;
}
