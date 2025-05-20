
import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-0">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg opacity-20"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/picsum/1920/1080)' }}
      />
      <div className="absolute inset-0 bg-background bg-opacity-80" />
    </div>
  );
};

export default VideoBackground;
