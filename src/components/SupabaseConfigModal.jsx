import React, { useState } from 'react';
import { GlassModal } from './GlassModal';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase';
import { useData } from '../context/DataContext';
import { Database, Copy, Check, Sparkles } from 'lucide-react';

export const SupabaseConfigModal = ({ isOpen, onClose }) => {
  const { refetchSongs, isUsingSupabase } = useData();
  const [url, setUrl] = useState(() => localStorage.getItem('AURA_SUPABASE_URL') || SUPABASE_URL || '');
  const [key, setKey] = useState(() => localStorage.getItem('AURA_SUPABASE_KEY') || SUPABASE_ANON_KEY || '');
  const [copied, setCopied] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const sqlSchema = `-- Create songs table
CREATE TABLE IF NOT EXISTS public.songs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & Policies
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.songs FOR SELECT USING (true);
CREATE POLICY "Allow full access for demo" ON public.songs FOR ALL USING (true) WITH CHECK (true);`;

  const handleSave = () => {
    if (url) localStorage.setItem('AURA_SUPABASE_URL', url.trim());
    else localStorage.removeItem('AURA_SUPABASE_URL');

    if (key) localStorage.setItem('AURA_SUPABASE_KEY', key.trim());
    else localStorage.removeItem('AURA_SUPABASE_KEY');

    setSavedMsg('Settings saved! Reloading dataset...');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Supabase Database Setup">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Connect your custom Supabase database or copy the SQL schema script below.
        </p>

        {/* Status banner */}
        <div 
          style={{
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            background: isUsingSupabase ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: isUsingSupabase ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Database size={20} color={isUsingSupabase ? '#10b981' : '#f59e0b'} />
          <div>
            <h5 style={{ fontSize: '0.85rem', color: isUsingSupabase ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
              {isUsingSupabase ? 'Connected to Supabase' : 'Running in Offline/Demo Dataset Mode'}
            </h5>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {isUsingSupabase 
                ? 'All song changes are stored directly in your Supabase DB.' 
                : 'Using embedded initial dataset with Cloudinary audio links.'}
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Supabase Project URL
            </label>
            <input 
              type="text"
              placeholder="https://xxxx.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              Supabase Anon Public Key
            </label>
            <input 
              type="password"
              placeholder="eyJhbGciOiJIUzI1Ni..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
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

        {savedMsg && (
          <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{savedMsg}</p>
        )}

        <button className="btn-primary" onClick={handleSave} style={{ justifyContent: 'center' }}>
          <Sparkles size={16} />
          Save & Connect Supabase
        </button>

        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />

        {/* SQL Schema helper */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700 }}>Supabase SQL Schema Script</h5>
            <button 
              onClick={handleCopySql}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: 'var(--text-primary)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy SQL'}
            </button>
          </div>
          <pre 
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid var(--glass-border)',
              fontSize: '0.72rem',
              color: '#38f9d7',
              overflowX: 'auto',
              maxHeight: '140px'
            }}
          >
            {sqlSchema}
          </pre>
        </div>
      </div>
    </GlassModal>
  );
};
