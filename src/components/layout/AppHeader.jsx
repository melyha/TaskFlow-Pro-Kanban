import React from 'react';

export function AppHeader() {

    
  return (
    <header style={{
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-light)',
      padding: 'var(--space-4) var(--space-6)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 style={{ 
            color: 'var(--primary-600)', 
            fontSize: '1.5rem',
            fontWeight: 'var(--font-bold)'
          }}>
            🚀 TaskFlow Pro
          </h1>
          <span style={{ 
            background: 'var(--primary-100)',
            color: 'var(--primary-700)',
            padding: 'var(--space-1) var(--space-3)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 'var(--font-medium)'
          }}>
            BETA
          </span>
        </div>
        
        <nav className="flex items-center gap-4">
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            📊 Analytics
          </button>
          <button className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            ⚙️ Settings
          </button>
        </nav>
      </div>
    </header>
  );
}