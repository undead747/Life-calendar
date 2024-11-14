import Background from '@/components/Background';
import Header from '@/components/Header';
import { WeatherProvider } from '@/context/WeatherContext';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WeatherProvider>
      <div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          {children}
        </div>
        <Background style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      </div>
    </WeatherProvider>
  );
};

export default HomeLayout;