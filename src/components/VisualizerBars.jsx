import React from 'react';

export const VisualizerBars = ({ isPlaying = false, barCount = 4 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '22px' }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          style={{
            width: '3px',
            backgroundColor: 'var(--accent-cyan)',
            borderRadius: '2px',
            boxShadow: '0 0 8px var(--accent-cyan)',
            height: isPlaying ? '100%' : '4px',
            animation: isPlaying ? `waveBar 0.8s ease-in-out infinite ${i * 0.15}s` : 'none',
            transition: 'height 0.3s ease'
          }}
        />
      ))}
    </div>
  );
};
