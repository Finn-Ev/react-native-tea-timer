import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React, { ReactNode } from 'react';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { SettingsProvider } from './settingsContext';
import { TimersProvider } from './timersContext';

export const ContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ActionSheetProvider>
      <ClickOutsideProvider>
        <TimersProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </TimersProvider>
      </ClickOutsideProvider>
    </ActionSheetProvider>
  );
};
