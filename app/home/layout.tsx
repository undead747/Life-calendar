import Header from '@/components/Header';
import { WeatherProvider } from '@/context/WeatherContext';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WeatherProvider>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        {children}
      </div>
    </WeatherProvider>
  );
};

export default HomeLayout;