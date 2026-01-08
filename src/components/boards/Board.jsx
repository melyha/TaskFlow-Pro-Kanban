import React from 'react';
import { Column } from './Column';
import { AddColumnButton } from './AddColumnButton';

export function Board({ columns = [], onAddTask, onTaskAction, onAddColumn }) {
  return (
    <div style={{
         width: '100%',
      height: '100%',
      display: 'flex',
      gap: 'var(--space-6)',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: 'var(--space-4)',
    }}>
        <div style={{
        display: 'flex',
        gap: 'var(--space-6)',
        minWidth: 'fit-content', // This ensures proper width calculation
        height: '100%',
        paddingRight: 'var(--space-4)', // Extra padding so Add Column isn't cut off
      }}></div>
      {columns.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          tasks={column.tasks}
          onAddTask={onAddTask}
          onTaskAction={onTaskAction}
        />
      ))}
      
      <AddColumnButton onClick={onAddColumn} />
    </div>
  );
}