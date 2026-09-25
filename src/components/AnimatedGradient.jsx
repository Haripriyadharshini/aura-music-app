import React from 'react';

export const AnimatedGradient = () => {
  return (
    <div className="animated-mesh-bg">
      <div 
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, rgba(79,172,254,0.05) 50%, transparent 70%)',
          animation: 'pulseGlow 12s infinite ease-in-out',
          pointerEvents: 'none'
        }} 
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, rgba(0,242,254,0.04) 60%, transparent 70%)',
          animation: 'pulseGlow 16s infinite ease-in-out 4s',
          pointerEvents: 'none'
        }} 
      />
    </div>
  );
};
