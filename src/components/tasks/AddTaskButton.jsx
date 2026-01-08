import React from 'react';

export function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: 'var(--space-3)',
        border: '1px dashed var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        background: 'transparent',
        color: 'var(--gray-500)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        fontSize: '0.8rem',
        fontWeight: 'var(--font-medium)',
        transition: 'all var(--transition-normal)',
        marginTop: 'var(--space-2)'
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
      <span style={{ fontSize: '1rem' }}>➕</span>
      Add Task
    </button>
  );
}