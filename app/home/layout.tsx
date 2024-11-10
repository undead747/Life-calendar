import Header from '@/components/Header';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        {children}
      </div>
      <video autoPlay loop muted style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/videos/wallpaper.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomeLayout;