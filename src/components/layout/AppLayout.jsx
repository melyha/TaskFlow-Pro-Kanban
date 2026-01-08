import React from 'react';
import { AppHeader } from './AppHeader';

export function AppLayout({ children, onReset }) {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppHeader onReset={onReset} />
      <main style={{ 
        flex: 1,
        padding: '0', // Remove padding here since Board handles it
        overflow: 'hidden', // Prevent main from scrolling
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </main>
    </div>
  );
}