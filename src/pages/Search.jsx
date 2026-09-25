import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { SongCard } from '../components/SongCard';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';

export const Search = () => {
  const { songs } = useData();
  const [query, setQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  const filteredSongs = songs.filter(song => {
    const q = query.toLowerCase().trim();
    if (!q) return true;

    if (filterMode === 'title') return song.title.toLowerCase().includes(q);
    if (filterMode === 'artist') return song.artist.toLowerCase().includes(q);
    if (filterMode === 'album') return song.album.toLowerCase().includes(q);

    return (
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.album.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '120px' }}>
      {/* Header & Search Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
          Search Music Catalog
        </h1>

        {/* Input Bar */}
        <div 
          className="glass-panel"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 20px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <SearchIcon size={22} color="var(--accent-cyan)" />
          <input 
            type="text"
            placeholder="Search by title, artist, or album..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '1.05rem',
              outline: 'none'
            }}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SlidersHorizontal size={14} /> Filter:
          </span>
          {['all', 'title', 'artist', 'album'].map(mode => (
            <button
              key={mode}
              className="glass-pill"
              onClick={() => setFilterMode(mode)}
              style={{
                padding: '6px 16px',
                fontSize: '0.82rem',
                textTransform: 'capitalize',
                background: filterMode === mode ? 'var(--accent-gradient)' : undefined,
                color: filterMode === mode ? '#07090e' : undefined,
                fontWeight: filterMode === mode ? 700 : 500,
                borderColor: filterMode === mode ? 'var(--accent-cyan)' : undefined
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Showing {filteredSongs.length} track{filteredSongs.length !== 1 ? 's' : ''}
          {query ? ` matching "${query}"` : ''}
        </p>

        {filteredSongs.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {filteredSongs.map(song => (
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
              gap: '12px'
            }}
          >
            <SearchIcon size={48} color="var(--text-muted)" />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No tracks found</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
              We couldn't find any songs matching your search term. Try searching for another keyword or add a new track in the Admin panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
