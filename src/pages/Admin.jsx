import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAudio } from '../context/AudioContext';
import { GlassModal } from '../components/GlassModal';
import confetti from 'canvas-confetti';
import { 
  Plus, Edit3, Trash2, ShieldCheck, Database, Music, 
  Link, Image, Play, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';

export const Admin = () => {
  const { songs, addSong, editSong, deleteSong, isUsingSupabase } = useData();
  const { playTrack } = useAudio();

  const initialFormState = {
    title: '',
    artist: '',
    album: '',
    cover_url: '',
    audio_url: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingSong, setEditingSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Sample Cloudinary audio URLs provided by user for instant insertion
  const sampleCloudinaryUrls = [
    {
      title: "Neelothi",
      artist: "Justin Prabhakaran, Vikram Prabhu",
      album: "Sirai",
      cover_url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800",
      audio_url: "https://res.cloudinary.com/tkicjdgq/video/upload/v1790311777/Sirai_-_Neelothi_Video_Song_Vikram_PrabhuL_K_Akshay_Kumar_Justin_PrabhakaranSuresh_R_7_Screen_-_Seven_Screen_Studio.mp3"
    },
    {
      title: "Usure Needhan Pulla",
      artist: "G.V. Prakash Kumar, Soori",
      album: "Mandaadi",
      cover_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
      audio_url: "https://res.cloudinary.com/tkicjdgq/video/upload/v1790311695/Usure_Needhan_Pulla_Video_Song_Mandaadi_Soori_Suhas_GV_Prakash_Kumar_Mathimaran_-_RS_Infotainment.mp3"
    },
    {
      title: "Pattampoochi",
      artist: "G.V. Prakash Kumar, Suriya",
      album: "Vishwanath and Sons",
      cover_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
      audio_url: "https://res.cloudinary.com/tkicjdgq/video/upload/v1790311445/Pattampoochi_Lyric_Video_Vishwanath_and_Suriya_Mamitha_Baiju_G.V._Prakash_Venky_Atluri_-_Aditya_Music_Tamil.mp3"
    }
  ];

  const handleOpenAddModal = () => {
    setEditingSong(null);
    setFormData(initialFormState);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (song) => {
    setEditingSong(song);
    setFormData({
      title: song.title,
      artist: song.artist,
      album: song.album,
      cover_url: song.cover_url,
      audio_url: song.audio_url
    });
    setFeedback(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.artist || !formData.audio_url) {
      setFeedback({ type: 'error', text: 'Title, Artist, and Audio URL are required!' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      if (editingSong) {
        await editSong(editingSong.id, formData);
        setFeedback({ type: 'success', text: 'Song updated successfully!' });
      } else {
        await addSong(formData);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setFeedback({ type: 'success', text: 'New song added successfully to catalog!' });
      }

      setTimeout(() => {
        setIsModalOpen(false);
        setFormData(initialFormState);
        setEditingSong(null);
      }, 1000);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Operation failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (song) => {
    if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
      await deleteSong(song.id);
    }
  };

  const fillSample = (sample) => {
    setFormData(sample);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '120px' }}>
      {/* Admin Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck color="var(--accent-cyan)" size={32} />
            Admin Song Management
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Add, Edit, Delete, and Manage all tracks in your dynamic Supabase database
          </p>
        </div>

        <button className="btn-primary" onClick={handleOpenAddModal} style={{ padding: '12px 24px' }}>
          <Plus size={20} />
          Add New Song
        </button>
      </div>

      {/* Database Mode Alert */}
      <div 
        className="glass-panel"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: isUsingSupabase ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)',
          background: isUsingSupabase ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Database size={22} color={isUsingSupabase ? '#10b981' : '#f59e0b'} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: isUsingSupabase ? '#10b981' : '#f59e0b' }}>
              {isUsingSupabase ? 'Supabase Live Integration Active' : 'Fallback Dataset Mode'}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {isUsingSupabase 
                ? 'All song mutations execute real SQL queries on your Supabase database.'
                : 'Local state mutations active. Connect your Supabase URL & Key from the navbar to persist to cloud.'}
            </p>
          </div>
        </div>
      </div>

      {/* Managed Songs Table / Cards */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>
          Song Inventory ({songs.length} Tracks)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {songs.map((song, idx) => (
            <div 
              key={song.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: 2 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, width: '20px' }}>
                  {idx + 1}
                </span>

                <img 
                  src={song.cover_url} 
                  alt={song.title}
                  style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{song.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{song.artist}</p>
                </div>
              </div>

              <div style={{ flex: 1.5, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'none', mdDisplay: 'block' }}>
                <span style={{ color: 'var(--text-muted)' }}>Album:</span> {song.album}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className="icon-btn"
                  onClick={() => playTrack(song)}
                  title="Test Play Audio"
                >
                  <Play size={16} fill="currentColor" />
                </button>

                <button 
                  className="icon-btn"
                  onClick={() => handleOpenEditModal(song)}
                  title="Edit Song"
                >
                  <Edit3 size={16} color="var(--accent-cyan)" />
                </button>

                <button 
                  className="icon-btn"
                  onClick={() => handleDelete(song)}
                  style={{ color: '#ff4757', borderColor: 'rgba(255, 71, 87, 0.3)' }}
                  title="Delete Song"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form for Add/Edit */}
      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingSong ? `Edit Song: ${editingSong.title}` : 'Add New Song to Supabase'}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Preset Cloudinary sample picker */}
          {!editingSong && (
            <div style={{ padding: '12px', background: 'rgba(0, 242, 254, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Sparkles size={14} /> Quick Auto-Fill Sample Cloudinary Audio Tracks:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sampleCloudinaryUrls.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="glass-pill"
                    onClick={() => fillSample(s)}
                    style={{ padding: '4px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    + {s.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Song Title *
            </label>
            <input 
              type="text"
              required
              placeholder="e.g. Neelothi"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Artist Name *
              </label>
              <input 
                type="text"
                required
                placeholder="e.g. Justin Prabhakaran"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Album Name
              </label>
              <input 
                type="text"
                placeholder="e.g. Sirai"
                value={formData.album}
                onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Cover Image URL (`cover_url`)
            </label>
            <input 
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={formData.cover_url}
              onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Cloudinary Audio Stream URL (`audio_url`) *
            </label>
            <input 
              type="text"
              required
              placeholder="https://res.cloudinary.com/.../song.mp3"
              value={formData.audio_url}
              onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>

          {feedback && (
            <div 
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 71, 87, 0.2)',
                color: feedback.type === 'success' ? '#10b981' : '#ff4757',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {feedback.text}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary"
            disabled={submitting}
            style={{ justifyContent: 'center', marginTop: '10px' }}
          >
            {submitting ? 'Saving to Database...' : (editingSong ? 'Update Song' : 'Add Song to Database')}
          </button>
        </form>
      </GlassModal>
    </div>
  );
};
