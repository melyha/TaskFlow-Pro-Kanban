import React from 'react';
import { ColumnHeader } from './ColumnHeader';
import { TaskCard } from '../tasks/TaskCard';
import { AddTaskButton } from '../tasks/AddTaskButton';

export function Column({ title, tasks = [], onAddTask, onTaskAction }) {
  const handleAddTask = () => {
    if (onAddTask) {
      onAddTask(title);
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
        
        <AddTaskButton onClick={handleAddTask} />
      </div>
    </div>
  );
}