import { PomodoroProvider } from '@/context/PomodoroContent';
import React from 'react';

const PomodoroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <PomodoroProvider>
          {children}
      </PomodoroProvider>
  );
};

export default PomodoroLayout;