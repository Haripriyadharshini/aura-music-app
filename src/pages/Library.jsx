import React from 'react';
import { useData } from '../context/DataContext';
import { useAudio } from '../context/AudioContext';
import { SongCard } from '../components/SongCard';
import { Heart, Play, Music } from 'lucide-react';

export const Library = ({ setActiveTab }) => {
  const { songs, favorites } = useData();
  const { playTrack } = useAudio();

  const favoriteSongs = songs.filter(s => favorites.includes(s.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '120px' }}>
      {/* Hero Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '36px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(79, 172, 254, 0.05) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.25)'
        }}
      >
        <div 
          style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #ff4757 0%, #ff6b81 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(255, 71, 87, 0.4)'
          }}
        >
          <Heart size={40} fill="#fff" color="#fff" />
        </div>

        <div>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '1px' }}>
            PLAYLIST
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Liked Songs</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {favoriteSongs.length} track{favoriteSongs.length !== 1 ? 's' : ''} in your personal collection
          </p>
        </div>

        {favoriteSongs.length > 0 && (
          <button 
            className="btn-primary" 
            style={{ marginLeft: 'auto', padding: '12px 24px' }}
            onClick={() => playTrack(favoriteSongs[0])}
          >
            <Play size={20} fill="#07090e" />
            Play All
          </button>
        )}
      </div>

      {/* Grid or Empty view */}
      {favoriteSongs.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {favoriteSongs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <div 
          className="glass-panel"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <Music size={50} color="var(--text-muted)" />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Your Library is Empty</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
            Click the heart icon on any track to add it to your Liked Songs library for quick access.
          </p>
          <button className="btn-primary" onClick={() => setActiveTab('home')}>
            Browse Songs
          </button>
        </div>
      )}
    </div>
  );
};
