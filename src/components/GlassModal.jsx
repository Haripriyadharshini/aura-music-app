import React from 'react';
import { X } from 'lucide-react';

export const GlassModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(7, 9, 14, 0.8)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '28px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 0 40px rgba(0, 242, 254, 0.2)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 className="glow-text" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            {title}
          </h3>
          <button 
            className="icon-btn"
            onClick={onClose}
            style={{ width: '32px', height: '32px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
};
