import React, { ReactNode } from 'react';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { SettingsProvider } from './settingsContext';
import { TimersProvider } from './timersContext';

export const ContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ClickOutsideProvider>
      <TimersProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </TimersProvider>
    </ClickOutsideProvider>
  );
};
