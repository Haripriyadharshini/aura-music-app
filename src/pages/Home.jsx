import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAudio } from '../context/AudioContext';
import { SongCard } from '../components/SongCard';
import { Play, Sparkles, Flame, Radio, ChevronRight, ChevronLeft } from 'lucide-react';

export const Home = ({ setActiveTab }) => {
  const { songs } = useData();
  const { playTrack, currentSong, isPlaying } = useAudio();
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto rotate carousel every 6 seconds
  useEffect(() => {
    if (!songs || songs.length === 0) return;
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % Math.min(songs.length, 3));
    }, 6000);
    return () => clearInterval(timer);
  }, [songs]);

  const featuredTrack = songs[carouselIndex] || songs[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', paddingBottom: '120px' }}>
      {/* Hero Animated Carousel */}
      {featuredTrack && (
        <div 
          className="glass-panel"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            padding: '40px',
            minHeight: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `linear-gradient(135deg, rgba(7, 9, 14, 0.9) 0%, rgba(0, 242, 254, 0.12) 100%), url(${featuredTrack.cover_url}) center/cover no-repeat`,
            border: '1px solid rgba(0, 242, 254, 0.3)',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          {/* Glass Overlay backdrop */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(7,9,14,0.92) 0%, rgba(7,9,14,0.7) 60%, rgba(7,9,14,0.2) 100%)',
              zIndex: 1
            }}
          />

          {/* Hero Content */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(0, 242, 254, 0.15)', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', fontSize: '0.78rem', fontWeight: 700 }}>
              <Sparkles size={14} />
              <span>FEATURED TRACK #{carouselIndex + 1}</span>
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15 }}>
              {featuredTrack.title}
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              {featuredTrack.artist} • <span style={{ color: 'var(--accent-blue)' }}>{featuredTrack.album}</span>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
              <button 
                className="btn-primary"
                onClick={() => playTrack(featuredTrack)}
                style={{ fontSize: '1rem', padding: '12px 28px' }}
              >
                <Play size={20} fill="#07090e" />
                Play Now
              </button>

              <button 
                className="btn-secondary"
                onClick={() => setActiveTab('search')}
              >
                Explore More
              </button>
            </div>
          </div>

          {/* Carousel Controls (Right) */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="icon-btn"
              onClick={() => setCarouselIndex(prev => (prev - 1 + Math.min(songs.length, 3)) % Math.min(songs.length, 3))}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="icon-btn"
              onClick={() => setCarouselIndex(prev => (prev + 1) % Math.min(songs.length, 3))}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Quick Play Grid */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame color="var(--accent-cyan)" size={22} />
            Quick Mix & Trending
          </h3>
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setActiveTab('search')}
          >
            See All
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {songs.slice(0, 4).map(song => (
            <div 
              key={song.id}
              className="glass-panel"
              style={{
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onClick={() => playTrack(song)}
            >
              <img 
                src={song.cover_url} 
                alt={song.title}
                style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
              />
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {song.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {song.artist}
                </p>
              </div>
              <button 
                className="btn-primary" 
                style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                onClick={(e) => {
                  e.stopPropagation();
                  playTrack(song);
                }}
              >
                <Play size={16} fill="#07090e" style={{ marginLeft: '2px' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Song Grid */}
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Radio color="var(--accent-cyan)" size={22} />
          All Songs ({songs.length})
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {songs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};
