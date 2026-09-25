import React from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, 
  Repeat, Shuffle, Heart, Disc 
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useData } from '../context/DataContext';

export const PlayerBar = () => {
  const { 
    currentSong, isPlaying, currentTime, duration, volume, isMuted,
    isShuffle, isRepeat, togglePlay, handleNextTrack, handlePrevTrack,
    seekTo, changeVolume, toggleMute, setIsShuffle, setIsRepeat 
  } = useAudio();

  const { favorites, toggleFavorite } = useData();

  if (!currentSong) return null;

  const isFav = favorites.includes(currentSong.id);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '12px',
        left: 'calc(var(--sidebar-width) + 24px)',
        right: '12px',
        height: 'var(--player-height)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(0, 242, 254, 0.2)'
      }}
    >
      {/* 1. Track Info (Left) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '28%', minWidth: '200px' }}>
        <img 
          src={currentSong.cover_url || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500'} 
          alt={currentSong.title}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-sm)',
            objectFit: 'cover',
            boxShadow: isPlaying ? '0 0 15px rgba(0, 242, 254, 0.3)' : 'none'
          }}
        />
        <div style={{ overflow: 'hidden' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentSong.title}
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentSong.artist}
          </p>
        </div>
        <button 
          onClick={() => toggleFavorite(currentSong.id)}
          style={{
            background: 'none',
            border: 'none',
            color: isFav ? '#ff4757' : 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            marginLeft: '4px'
          }}
          title={isFav ? "Liked" : "Like"}
        >
          <Heart size={18} fill={isFav ? "#ff4757" : "none"} />
        </button>
      </div>

      {/* 2. Controls & Seekbar (Center) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '44%', maxWidth: '600px' }}>
        {/* Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button 
            onClick={() => setIsShuffle(prev => !prev)}
            style={{
              background: 'none',
              border: 'none',
              color: isShuffle ? 'var(--accent-cyan)' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
            title="Shuffle"
          >
            <Shuffle size={16} />
          </button>

          <button 
            onClick={handlePrevTrack}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
            title="Previous Track"
          >
            <SkipBack size={20} />
          </button>

          <button 
            className="btn-primary"
            onClick={togglePlay}
            style={{ width: '42px', height: '42px', padding: 0, justifyContent: 'center' }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} fill="#07090e" /> : <Play size={20} fill="#07090e" style={{ marginLeft: '2px' }} />}
          </button>

          <button 
            onClick={handleNextTrack}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
            title="Next Track"
          >
            <SkipForward size={20} />
          </button>

          <button 
            onClick={() => setIsRepeat(prev => !prev)}
            style={{
              background: 'none',
              border: 'none',
              color: isRepeat ? 'var(--accent-cyan)' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
            title="Repeat"
          >
            <Repeat size={16} />
          </button>
        </div>

        {/* Progress Timeline Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '35px', textAlign: 'right' }}>
            {formatTime(currentTime)}
          </span>

          <div 
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <input 
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime || 0}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                WebkitAppearance: 'none',
                background: `linear-gradient(to right, var(--accent-cyan) 0%, var(--accent-cyan) ${progressPercent}%, rgba(255, 255, 255, 0.15) ${progressPercent}%, rgba(255, 255, 255, 0.15) 100%)`,
                borderRadius: 'var(--radius-full)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '35px' }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* 3. Volume & Extras (Right) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', width: '28%', minWidth: '160px' }}>
        <button 
          onClick={toggleMute}
          style={{ background: 'none', border: 'none', color: isMuted ? '#ff4757' : 'var(--text-secondary)', cursor: 'pointer' }}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <input 
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => changeVolume(e.target.value)}
          style={{
            width: '90px',
            height: '5px',
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, var(--accent-blue) 0%, var(--accent-blue) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.15) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.15) 100%)`,
            borderRadius: 'var(--radius-full)',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
      </div>
    </div>
  );
};
