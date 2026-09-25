import React from 'react';
import { Home, Search, Library, Clock, User, ShieldCheck, Database, Radio } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Navbar = ({ activeTab, setActiveTab, onOpenSupabaseModal }) => {
  const { isUsingSupabase } = useData();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <nav 
      className="glass-panel"
      style={{
        width: 'var(--sidebar-width)',
        height: 'calc(100vh - 24px)',
        position: 'fixed',
        top: '12px',
        left: '12px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      {/* Top Header & Brand */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Brand Header */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px', cursor: 'pointer' }}
          onClick={() => setActiveTab('home')}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Radio size={22} color="#07090e" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="glow-text" style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '1px' }}>
              AURA
            </h2>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              LUXURY STREAMING
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(0, 242, 254, 0.25)' : '1px solid transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  textAlign: 'left'
                }}
              >
                <Icon size={20} color={isActive ? 'var(--accent-cyan)' : 'currentColor'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Supabase Status Footer */}
      <div 
        style={{
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <Database size={14} />
            <span>Database:</span>
          </div>
          <span 
            style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: isUsingSupabase ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: isUsingSupabase ? '#10b981' : '#f59e0b',
              fontWeight: 700,
              border: isUsingSupabase ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
            }}
          >
            {isUsingSupabase ? 'Supabase Live' : 'Demo Fallback'}
          </span>
        </div>

        <button 
          onClick={onOpenSupabaseModal}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-blue)',
            fontSize: '0.75rem',
            textAlign: 'left',
            cursor: 'pointer',
            fontWeight: 600,
            textDecoration: 'underline'
          }}
        >
          Configure Supabase URL & Keys
        </button>
      </div>
    </nav>
  );
};
