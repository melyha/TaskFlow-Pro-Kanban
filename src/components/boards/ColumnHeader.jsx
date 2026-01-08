import React from 'react';

export function ColumnHeader({ title, taskCount, onAddTask, onRename, onDelete }) {
   const handleMoreOptions = () => {
    const action = window.confirm(
      `Options for "${title}" column:\n\nClick OK to rename, Cancel to delete`
    );
    
    if (action) {
      if (onRename) onRename();
    } else {
      if (onDelete && window.confirm('Are you sure you want to delete this column?')) {
        onDelete();
      }
    }
  };


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-4)',
      borderBottom: '1px solid var(--border-light)',
      background: 'var(--bg-primary)',
    }}>
      <div className="flex items-center gap-2">
        <h3 style={{ 
          color: 'var(--gray-800)',
          fontWeight: 'var(--font-semibold)',
          fontSize: '1rem'
        }}>
          {title}
        </h3>
        <span style={{
          background: taskCount > 0 ? 'var(--primary-100)' :  'var(--gray-100)',
          color: taskCount > 0 ? 'var(--primary-700)' : 'var(--gray-600)',
          padding: 'var(--space-1) var(--space-2)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 'var(--font-medium)',
          minWidth: '20px',
          textAlign: 'center'
        }}>
          {taskCount}
        </span>
      </div>
      
      <div className="flex gap-1">
        <button 
          onClick={onAddTask}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--gray-500)',
            cursor: 'pointer',
            padding: 'var(--space-1)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            transition: 'color var(--transition-fast)'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary-500)'}
          onMouseOut={(e) => e.target.style.color = 'var(--gray-500)'}
          title="Add task"
        >
          ➕
        </button>
        <button 
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--gray-400)',
            cursor: 'pointer',
            padding: 'var(--space-1)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            transition: 'color var(--transition-fast)'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--gray-600)'}
          onMouseOut={(e) => e.target.style.color = 'var(--gray-400)'}
          title="Column options"
        >
          ⋯
        </button>
      </div>
    </div>
  );
}