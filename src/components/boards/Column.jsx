import React from 'react';
import { ColumnHeader } from './ColumnHeader';
import { TaskCard } from '../tasks/TaskCard';
import { AddTaskButton } from '../tasks/AddTaskButton';

export function Column({ id, title, tasks = [], onAddTask, onTaskAction, onColumnAction }) {
  const handleAddTask = () => {
     console.log('Column handleAddTask called with id:', id); // Debug log
    if (onAddTask) {
      onAddTask(id);
    }
  };

  const handleRename = () => {
    if (onColumnAction) {
      onColumnAction('rename', id, { title });
    }
  };

  const handleDelete = () => {
    if (onColumnAction) {
      onColumnAction('delete', id, { title });
    }
  };

  return (
    <div 
      className="card"
      style={{
        width: '280px',
        minWidth: '280px',
        maxHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-column)',
        border: '1px solid var(--border-light)',
      }}
    >
      <ColumnHeader 
        title={title}
        taskCount={tasks.length}
        onAddTask={handleAddTask}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      
      <div style={{
        flex: 1,
        padding: 'var(--space-4)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)'
      }}>
        {tasks.map((task) => (
          <TaskCard 
            key={task.id}
            task={task}
            onAction={onTaskAction}
          />
        ))}

        {tasks.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'var(--gray-400)',
            fontSize: '0.8rem',
            padding: 'var(--space-4)',
            fontStyle: 'italic'
          }}>
            No tasks yet
          </div>
        )}
        
        
        <AddTaskButton onClick={handleAddTask} />
      </div>
    </div>
  );
}