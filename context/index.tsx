import React, { ReactNode } from 'react';
import { TimersProvider } from './timersContext';
import { SettingsProvider } from './settingsContext';

export const ContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TimersProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </TimersProvider>
  );
};
