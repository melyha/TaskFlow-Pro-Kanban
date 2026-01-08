import React from 'react';

export function TaskCard({ task, onAction }) {
  const { id, title, description, priority = 'none', dueDate } = task;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--priority-high)';
      case 'medium': return 'var(--priority-medium)';
      case 'low': return 'var(--priority-low)';
      default: return 'var(--priority-none)';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div 
      className="card"
      style={{
        background: 'var(--bg-card)',
        padding: 'var(--space-4)',
        cursor: 'grab',
        borderLeft: `3px solid ${getPriorityColor(priority)}`,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-2)'
      }}>
        <h4 style={{
          color: 'var(--gray-800)',
          fontWeight: 'var(--font-semibold)',
          fontSize: '0.875rem',
          lineHeight: 1.4,
          flex: 1
        }}>
          {title}
        </h4>
        <span style={{ fontSize: '0.75rem', marginLeft: 'var(--space-2)' }}>
          {getPriorityIcon(priority)}
        </span>
      </div>
      
      {description && (
        <p style={{
          color: 'var(--gray-600)',
          fontSize: '0.75rem',
          lineHeight: 1.5,
          marginBottom: 'var(--space-3)'
        }}>
          {description}
        </p>
      )}
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--gray-500)'
      }}>
        {dueDate && (
          <span>📅 {new Date(dueDate).toLocaleDateString()}</span>
        )}
        <div className="flex gap-1">
          <button style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--gray-400)'
          }}>
            ✏️
          </button>
          <button style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--gray-400)'
          }}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}