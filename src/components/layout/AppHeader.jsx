import React from 'react';

export function AppHeader({ onReset }) {

   // Sample function for Analytics - shows task stats
  const handleAnalytics = () => {
    alert(`📊 TaskFlow Pro Analytics

📋 Total Tasks: 4
✅ Completed: 1  
🚧 In Progress: 1
📌 To Do: 2

🔥 High Priority: 2
🟡 Medium Priority: 1
🟢 Low Priority: 1

📈 This Week: +3 tasks created`);
  };

  const handleSettings = () => {
    const action = window.confirm('⚙️ Settings Options:\n\nOK = Reset to default data\nCancel = Close');
    if (action && onReset) {
      onReset();
    }
  };
    
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
          <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={handleAnalytics}>
            📊 Analytics
          </button>
          <button className="btn btn-primary" style={{ fontSize: '0.8rem' }} onClick={handleSettings}>
            ⚙️ Settings
          </button>
        </nav>
      </div>
    </header>
  );
}