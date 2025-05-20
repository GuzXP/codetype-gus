import React from 'react';
import TypingTest from '../components/TypingTest';
import VideoBackground from '../components/VideoBackground';
const Index = () => {
  return <>
      <VideoBackground />
      <div className="min-h-screen bg-background bg-opacity-70 py-8 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              CodeType
            </h1>
            <p className="text-muted-foreground text-base">Ngoding Ceritanya😹</p>
          </div>
          
          <TypingTest />
        </div>
      </div>
    </>;
};
export default Index;