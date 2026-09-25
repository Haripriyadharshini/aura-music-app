import React from 'react';
import { useAudio } from '../context/AudioContext';
import { useData } from '../context/DataContext';
import { Clock, Play, Trash2, Disc } from 'lucide-react';

export const History = () => {
  const { listeningHistory, playTrack, clearHistory } = useAudio();
  const { songs } = useData();

  const getRelativeTime = (isoString) => {
    if (!isoString) return 'Recently';
    const played = new Date(isoString);
    const now = new Date();
    const diffSecs = Math.floor((now - played) / 1000);

    if (diffSecs < 60) return 'Just now';
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)} mins ago`;
    if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)} hours ago`;
    return played.toLocaleDateString();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '120px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock color="var(--accent-cyan)" size={28} />
            Listening History
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Tracks you have played recently across sessions
          </p>
        </div>

        {listeningHistory.length > 0 && (
          <button 
            className="btn-secondary"
            onClick={clearHistory}
            style={{ color: '#ff4757', borderColor: 'rgba(255, 71, 87, 0.3)' }}
          >
            <Trash2 size={16} />
            Clear Log
          </button>
        )}
      </div>

      {/* History List */}
      {listeningHistory.length > 0 ? (
        <div className="glass-panel" style={{ padding: '8px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {listeningHistory.map((item, idx) => {
              // Find matching full song object or construct
              const song = songs.find(s => s.id === item.songId) || {
                id: item.songId,
                title: item.title,
                artist: item.artist,
                album: item.album,
                cover_url: item.cover_url,
                audio_url: item.audio_url
              };

              return (
                <div 
                  key={item.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    borderBottom: idx < listeningHistory.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    transition: 'var(--transition-fast)'
                  }}
                  className="history-row"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', width: '24px', fontWeight: 700 }}>
                      {idx + 1}
                    </span>

                    <img 
                      src={item.cover_url} 
                      alt={item.title}
                      style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />

                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.artist}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', flex: 1 }}>
                    <Disc size={14} />
                    <span>{item.album}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>
                      {getRelativeTime(item.played_at)}
                    </span>

                    <button 
                      className="btn-primary"
                      style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                      onClick={() => playTrack(song)}
                    >
                      <Play size={16} fill="#07090e" style={{ marginLeft: '2px' }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
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
            gap: '14px'
          }}
        >
          <Clock size={48} color="var(--text-muted)" />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No Listening History Yet</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
            Start listening to any song to dynamically build your listening timeline here.
          </p>
        </div>
      )}
    </div>
  );
};
