import React from 'react';
import { Play, Pause, Heart, Disc } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useData } from '../context/DataContext';
import { VisualizerBars } from './VisualizerBars';

export const SongCard = ({ song, onEdit, onDelete, showActions = false }) => {
  const { currentSong, isPlaying, playTrack } = useAudio();
  const { favorites, toggleFavorite } = useData();

  const isCurrent = currentSong?.id === song.id;
  const isFav = favorites.includes(song.id);

  return (
    <div 
      className="glass-panel"
      style={{
        padding: '16px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
        overflow: 'hidden',
        border: isCurrent ? '1px solid var(--accent-cyan)' : undefined,
        boxShadow: isCurrent ? 'var(--shadow-glow)' : undefined
      }}
      onClick={() => playTrack(song)}
    >
      {/* Cover Art Wrapper */}
      <div 
        style={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          position: 'relative',
          background: 'rgba(0,0,0,0.3)'
        }}
      >
        <img 
          src={song.cover_url || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500'} 
          alt={song.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isCurrent ? 'scale(1.05)' : 'scale(1)'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500';
          }}
        />

        {/* Overlay Hover / Play state */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: isCurrent ? 'rgba(7, 9, 14, 0.45)' : 'rgba(7, 9, 14, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isCurrent ? 1 : 0.85,
            transition: 'opacity 0.25s ease'
          }}
        >
          {isCurrent && isPlaying ? (
            <div style={{ background: 'rgba(7, 9, 14, 0.75)', padding: '12px', borderRadius: '50%', border: '1px solid var(--accent-cyan)' }}>
              <VisualizerBars isPlaying={true} barCount={4} />
            </div>
          ) : (
            <button 
              className="btn-primary"
              style={{
                width: '46px',
                height: '46px',
                padding: 0,
                justifyContent: 'center',
                boxShadow: isCurrent ? '0 0 20px var(--accent-cyan)' : '0 4px 15px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                playTrack(song);
              }}
            >
              <Play size={20} fill="#07090e" style={{ marginLeft: '3px' }} />
            </button>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(7, 9, 14, 0.65)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isFav ? '#ff4757' : 'var(--text-secondary)',
            transition: 'transform 0.2s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(song.id);
          }}
          title={isFav ? "Remove from Library" : "Add to Library"}
        >
          <Heart size={16} fill={isFav ? "#ff4757" : "none"} />
        </button>
      </div>

      {/* Track Meta Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4 
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: isCurrent ? 'var(--accent-cyan)' : 'var(--text-primary)'
          }}
        >
          {song.title}
        </h4>
        
        <p 
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {song.artist}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          <Disc size={12} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.album}</span>
        </div>
      </div>
    </div>
  );
};
