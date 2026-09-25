import React from 'react';
import { useData } from '../context/DataContext';
import { useAudio } from '../context/AudioContext';
import { User, Shield, Headphones, Heart, Music, Sparkles, Radio } from 'lucide-react';

export const Profile = () => {
  const { songs, favorites } = useData();
  const { listeningHistory } = useAudio();

  // Calculate top artist stats
  const artistCounts = {};
  songs.forEach(s => {
    artistCounts[s.artist] = (artistCounts[s.artist] || 0) + 1;
  });
  const topArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '120px' }}>
      {/* Header Profile Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '36px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          background: 'linear-gradient(135deg, rgba(7, 9, 14, 0.95) 0%, rgba(0, 242, 254, 0.15) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: 'var(--shadow-glow)'
        }}
      >
        <div 
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0, 242, 254, 0.5)',
            border: '3px solid rgba(255,255,255,0.2)'
          }}
        >
          <User size={48} color="#07090e" strokeWidth={2.5} />
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(0, 242, 254, 0.15)', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
            <Sparkles size={12} />
            LUXURY LISTENER VIP
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Aura Music Listener</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            High-fidelity Audio Streaming Account • Dynamic Supabase Connected
          </p>
        </div>
      </div>

      {/* Listening Statistics Cards */}
      <div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>Listening Overview</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)' }}>
              <Headphones size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{listeningHistory.length}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Total Plays Logged</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(255, 71, 87, 0.15)', color: '#ff4757' }}>
              <Heart size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{favorites.length}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Favorites Saved</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(79, 172, 254, 0.15)', color: 'var(--accent-blue)' }}>
              <Music size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{songs.length}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Catalog Tracks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Artists & Preferences */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Top Artists */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio color="var(--accent-cyan)" size={18} /> Top Artists in Catalog
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topArtists.map(([artist, count], idx) => (
              <div key={artist} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>#{idx + 1}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{artist}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{count} song{count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Quality & Settings */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield color="var(--accent-cyan)" size={18} /> Streaming Preferences
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)' }}>
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Audio Source</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cloudinary High Definition MP3</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>Active</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)' }}>
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Visual Theme</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dark Luxury Glassmorphism</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
