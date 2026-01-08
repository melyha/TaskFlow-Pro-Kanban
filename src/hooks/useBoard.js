// React hook for board state management
import { useState, useEffect, useCallback } from 'react';
import { readStorage, writeStorage } from '../data/storage';
import { createTask, createColumn, createBoard, getDefaultBoardData, validateTask, validateColumn } from '../data/models';
import { generateId, deepClone } from '../utils/helpers';

export const useBoard = () => {
  const [boardData, setBoardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize board data on mount
  useEffect(() => {
    const initializeBoard = async () => {
      try {
        setLoading(true);
        
        // Try to load from storage
        const storedData = readStorage();
        
        if (storedData && storedData.boards && storedData.boards.length > 0) {
          setBoardData(storedData);
        } else {
          // Create default board for new users
          const defaultBoard = getDefaultBoardData();
          const initialData = {
            boards: [defaultBoard],
            currentBoardId: defaultBoard.id,
            settings: {
              theme: 'default',
              autoSave: true
            }
          };
          
          setBoardData(initialData);
          writeStorage(initialData);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load board data');
        console.error('Error initializing board:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeBoard();
  }, []);

  // Save data to storage whenever boardData changes
  useEffect(() => {
    if (boardData && !loading) {
          console.log('Saving data to localStorage:', boardData); // Debug log
      const saveSuccess = writeStorage(boardData);
      if (!saveSuccess) {
        setError('Failed to save data');
      }
      else {
      console.log('Data saved successfully!'); // Debug log
    }
    }
  }, [boardData, loading]);

  // Get current board
  const getCurrentBoard = useCallback(() => {
    if (!boardData || !boardData.boards) return null;
    return boardData.boards.find(board => board.id === boardData.currentBoardId) || boardData.boards[0];
  }, [boardData]);

  // ======= TASK OPERATIONS =======

  const addTask = useCallback((columnId, taskData) => {
    try {
      const validation = validateTask(taskData);
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return false;
      }

      setBoardData(prevData => {
        const newData = deepClone(prevData);
        const currentBoard = newData.boards.find(b => b.id === newData.currentBoardId);
        
        if (!currentBoard) return prevData;
        
        const targetColumn = currentBoard.columns.find(col => col.id === columnId);
        if (!targetColumn) return prevData;

        const newTask = createTask({
          ...taskData,
          columnId
        });

        targetColumn.tasks.push(newTask);
        targetColumn.updatedAt = new Date().toISOString();
        currentBoard.updatedAt = new Date().toISOString();

        return newData;
      });

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
      return false;
    }
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    try {
      const validation = validateTask({ ...updates });
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return false;
      }

      setBoardData(prevData => {
        const newData = deepClone(prevData);
        const currentBoard = newData.boards.find(b => b.id === newData.currentBoardId);
        
        if (!currentBoard) return prevData;
        
        let taskFound = false;
        
        currentBoard.columns.forEach(column => {
          const taskIndex = column.tasks.findIndex(task => task.id === taskId);
          if (taskIndex !== -1) {
            column.tasks[taskIndex] = {
              ...column.tasks[taskIndex],
              ...updates,
              updatedAt: new Date().toISOString()
            };
            column.updatedAt = new Date().toISOString();
            taskFound = true;
          }
        });
        
        if (taskFound) {
          currentBoard.updatedAt = new Date().toISOString();
        }

        return taskFound ? newData : prevData;
      });

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      return false;
    }
  }, []);

  const deleteTask = useCallback((taskId) => {
    try {
      setBoardData(prevData => {
        const newData = deepClone(prevData);
        const currentBoard = newData.boards.find(b => b.id === newData.currentBoardId);
        
        if (!currentBoard) return prevData;
        
        let taskDeleted = false;
        
        currentBoard.columns.forEach(column => {
          const taskIndex = column.tasks.findIndex(task => task.id === taskId);
          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
            column.updatedAt = new Date().toISOString();
            taskDeleted = true;
          }
        });
        
        if (taskDeleted) {
          currentBoard.updatedAt = new Date().toISOString();
        }

        return taskDeleted ? newData : prevData;
      });

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      return false;
    }
  }, []);

  const moveTask = useCallback((taskId, fromColumnId, toColumnId, newIndex = 0) => {
    try {
      setBoardData(prevData => {
        const newData = deepClone(prevData);
        const currentBoard = newData.boards.find(b => b.id === newData.currentBoardId);
        
        if (!currentBoard) return prevData;
        
        const fromColumn = currentBoard.columns.find(col => col.id === fromColumnId);
        const toColumn = currentBoard.columns.find(col => col.id === toColumnId);
        
        if (!fromColumn || !toColumn) return prevData;
        
        const taskIndex = fromColumn.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return prevData;
        
        const [task] = fromColumn.tasks.splice(taskIndex, 1);
        task.columnId = toColumnId;
        task.updatedAt = new Date().toISOString();
        
        toColumn.tasks.splice(newIndex, 0, task);
        
        fromColumn.updatedAt = new Date().toISOString();
        toColumn.updatedAt = new Date().toISOString();
        currentBoard.updatedAt = new Date().toISOString();

        return newData;
      });

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to move task');
      console.error('Error moving task:', err);
      return false;
    }
  }, []);

  // ======= COLUMN OPERATIONS =======

  const addColumn = useCallback((columnData = {}) => {
    try {
      const validation = validateColumn(columnData);
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return false;
      }

      setBoardData(prevData => {
        const newData = deepClone(prevData);
        const currentBoard = newData.boards.find(b => b.id === newData.currentBoardId);
        
        if (!currentBoard) return prevData;
        
        const newColumn = createColumn({
          title: columnData.title || `Column ${currentBoard.columns.length + 1}`,
          position: currentBoard.columns.length,
          ...columnData
        });

        currentBoard.columns.push(newColumn);
        currentBoard.updatedAt = new Date().toISOString();

        return newData;
      });

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to add column');
      console.error('Error adding column:', err);
      return false;
    }
  }, []);

  const updateColumn = useCallback((columnId, updates) => {
    try {
      const validation = validateColumn(updates);
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return false;
      }

      setBoardData(prevData => {
        const newData = deepClone(prevData);
        const currentBoard = newData.boards.find(b => b.id === newData.currentBoardId);
        
        if (!currentBoard) return prevData;
        
        const columnIndex = currentBoard.columns.findIndex(col => col.id === columnId);
        if (columnIndex === -1) return prevData;

        currentBoard.columns[columnIndex] = {
          ...currentBoard.columns[columnIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        currentBoard.updatedAt = new Date().toISOString();

        return newData;
      });

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update column');
      console.error('Error updating column:', err);
      return false;
    }
  }, []);

  const deleteColumn = useCallback((columnId) => {
    try {
      setBoardData(prevData => {
        const newData = deepClone(prevData);
        const currentBoard = newData.boards.find(b => b.id === newData.currentBoardId);
        
        if (!currentBoard) return prevData;
        
        const columnIndex = currentBoard.columns.findIndex(col => col.id === columnId);
        if (columnIndex === -1) return prevData;
        
        // Don't allow deleting the last column
        if (currentBoard.columns.length <= 1) {
          setError('Cannot delete the last column');
          return prevData;
        }

        currentBoard.columns.splice(columnIndex, 1);
        currentBoard.updatedAt = new Date().toISOString();

        return newData;
      });

      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete column');
      console.error('Error deleting column:', err);
      return false;
    }
  }, []);

  // ======= UTILITY FUNCTIONS =======

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshData = useCallback(() => {
    const storedData = readStorage();
    if (storedData) {
      setBoardData(storedData);
    }
  }, []);

  // Return the hook interface
  return {
    // State
    boardData,
    currentBoard: getCurrentBoard(),
    loading,
    error,
    
    // Task operations
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    
    // Column operations
    addColumn,
    updateColumn,
    deleteColumn,
    
    // Utility functions
    clearError,
    refreshData
  };
};