import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppLayout } from './components/layout/AppLayout'
import { Board } from './components/boards/Board'
import { useBoard } from './hooks/useBoard'
import { TaskForm } from './components/tasks/TaskForm'

function App() {
  // Use our powerful state management hook
  const {
    currentBoard,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addColumn,
    updateColumn,
    deleteColumn,
    clearError,
    resetToDefault,
  } = useBoard();

  // Local UI state for forms
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Handle adding tasks
  const handleAddTask = (columnId) => {
    setActiveColumnId(columnId);
    setShowTaskForm(true);
    setEditingTask(null);
  };

  // Handle task form submission
  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      // Update existing task
      const success = updateTask(editingTask.id, taskData);
      if (success) {
        setShowTaskForm(false);
        setEditingTask(null);
        setActiveColumnId(null);
      }
    } else {
      // Create new task
      const success = addTask(activeColumnId, taskData);
      if (success) {
        setShowTaskForm(false);
        setActiveColumnId(null);
      }
    }
  };

  // Handle task form cancellation
  const handleTaskCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    setActiveColumnId(null);
  };

  // Handle task actions (edit, delete)
  const handleTaskAction = (action, taskId, taskData = null) => {
    switch (action) {
      case 'edit':
        setEditingTask(taskData);
        setActiveColumnId(taskData.columnId);
        setShowTaskForm(true);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this task?')) {
          deleteTask(taskId);
        }
        break;
      case 'toggle':
        updateTask(taskId, { completed: !taskData.completed });
        break;
      default:
        console.log('Unknown task action:', action);
    }
  };

  // Handle adding columns
  const handleAddColumn = () => {
    const columnTitle = window.prompt('Enter column title:');
    if (columnTitle && columnTitle.trim()) {
      addColumn({ title: columnTitle.trim() });
    }
  };

  // Handle column actions
  const handleColumnAction = (action, columnId, columnData = null) => {
    switch (action) {
      case 'rename':
        const newTitle = window.prompt('Enter new column title:', columnData.title);
        if (newTitle && newTitle.trim() && newTitle !== columnData.title) {
          updateColumn(columnId, { title: newTitle.trim() });
        }
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this column and all its tasks?')) {
          deleteColumn(columnId);
        }
        break;
      default:
        console.log('Unknown column action:', action);
    }
  };

  // Loading state
  if (loading) {
    return (
      <AppLayout>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
          color: 'var(--gray-600)',
          fontSize: '1.1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid var(--primary-200)',
              borderTop: '2px solid var(--primary-500)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Loading your board...
          </div>
        </div>
      </AppLayout>
    );
  }

  // Error state
  if (!currentBoard) {
    return (
      <AppLayout>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
          color: 'var(--error-500)',
          fontSize: '1.1rem'
        }}>
          Failed to load board data
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout onReset={resetToDefault}>
      {/* Error notification */}
      {error && (
        <div style={{
          background: 'var(--error-50)',
          color: 'var(--error-700)',
          padding: 'var(--space-3) var(--space-4)',
          margin: 'var(--space-4)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--error-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>{error}</span>
          <button 
            onClick={clearError}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--error-500)',
              cursor: 'pointer',
              padding: 'var(--space-1)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Task Form Modal */}
      {showTaskForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 'var(--space-4)'
        }}>
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <TaskForm
              onSubmit={handleTaskSubmit}
              onCancel={handleTaskCancel}
              initialData={editingTask || {}}  // ← Add || {} to handle null
            />
          </div>
        </div>
      )}

      {/* Main Board */}
      <Board
        columns={currentBoard.columns}
        onAddTask={handleAddTask}
        onTaskAction={handleTaskAction}
        onAddColumn={handleAddColumn}
        onColumnAction={handleColumnAction}
      />
    </AppLayout>
  )
}


export default App
