import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { AudioProvider } from './context/AudioContext';
import { AnimatedGradient } from './components/AnimatedGradient';
import { Navbar } from './components/Navbar';
import { PlayerBar } from './components/PlayerBar';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';

import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Library } from './pages/Library';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';

import './styles/index.css';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'search':
        return <Search />;
      case 'library':
        return <Library setActiveTab={setActiveTab} />;
      case 'history':
        return <History />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* ReactBits Ambient Gradient Background */}
      <AnimatedGradient />

      {/* Navigation Sidebar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Main Views Container */}
      <main 
        style={{
          marginLeft: 'calc(var(--sidebar-width) + 24px)',
          padding: '24px 24px 120px 12px',
          maxWidth: '1400px'
        }}
      >
        {renderPage()}
      </main>

      {/* Sticky Bottom Glass Audio Player */}
      <PlayerBar />

      {/* Supabase Configuration & SQL Schema Modal */}
      <SupabaseConfigModal 
        isOpen={isSupabaseModalOpen} 
        onClose={() => setIsSupabaseModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </DataProvider>
  );
}
