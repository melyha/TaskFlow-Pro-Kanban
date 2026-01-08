import React, { useState } from 'react';

export function TaskForm({ onSubmit, onCancel, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [priority, setPriority] = useState(initialData.priority || 'none');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      id: initialData.id || Date.now(),
    });
    
    setTitle('');
    setDescription('');
    setPriority('none');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--bg-card)',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <input
          className="input"
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required
        />
      </div>
      
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <textarea
          className="input"
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ resize: 'vertical' }}
        />
      </div>
      
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <select
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="none">No Priority</option>
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
      </div>
      
      <div className="flex gap-2 justify-between">
        <button 
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="btn btn-primary"
        >
          {initialData.id ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}