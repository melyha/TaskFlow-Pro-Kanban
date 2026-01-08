import React from 'react';

export function AddColumnButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        minWidth: '260px',
        width: '260px',
        height: '120px',
        border: '2px dashed var(--border-medium)',
        borderRadius: 'var(--radius-lg)',
        background: 'transparent',
        color: 'var(--gray-500)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        transition: 'all var(--transition-normal)',
        fontSize: '0.875rem',
        fontWeight: 'var(--font-medium)'
      }}
      onMouseOver={(e) => {
        e.target.style.borderColor = 'var(--primary-400)';
        e.target.style.color = 'var(--primary-600)';
        e.target.style.background = 'var(--primary-50)';
      }}
      onMouseOut={(e) => {
        e.target.style.borderColor = 'var(--border-medium)';
        e.target.style.color = 'var(--gray-500)';
        e.target.style.background = 'transparent';
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>➕</span>
      Add Column
    </button>
  );
}