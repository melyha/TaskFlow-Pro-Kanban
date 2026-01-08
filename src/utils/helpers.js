// Helper utilities for TaskFlow Pro

/**
 * Generate unique IDs
 */
export const generateId = (prefix = 'item') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format dates for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
  if (diffDays < 7) return `In ${diffDays} days`;
  
  return date.toLocaleDateString();
};

/**
 * Get priority display info
 */
export const getPriorityInfo = (priority) => {
  const priorities = {
    none: { color: 'var(--priority-none)', icon: '⚪', label: 'No Priority' },
    low: { color: 'var(--priority-low)', icon: '🟢', label: 'Low Priority' },
    medium: { color: 'var(--priority-medium)', icon: '🟡', label: 'Medium Priority' },
    high: { color: 'var(--priority-high)', icon: '🔴', label: 'High Priority' }
  };
  
  return priorities[priority] || priorities.none;
};

/**
 * Sort tasks by priority
 */
export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
  
  return [...tasks].sort((a, b) => {
    const aPriority = priorityOrder[a.priority] ?? 3;
    const bPriority = priorityOrder[b.priority] ?? 3;
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // If same priority, sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

/**
 * Filter tasks by criteria
 */
export const filterTasks = (tasks, filters = {}) => {
  return tasks.filter(task => {
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }
    
    if (filters.dueDate === 'overdue') {
      const taskDate = new Date(task.dueDate);
      const now = new Date();
      if (!task.dueDate || taskDate >= now) return false;
    }
    
    if (filters.completed !== undefined && task.completed !== filters.completed) {
      return false;
    }
    
    return true;
  });
};

/**
 * Calculate board statistics
 */
export const calculateBoardStats = (board) => {
  const stats = {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    priorities: { none: 0, low: 0, medium: 0, high: 0 },
    overdueTasks: 0
  };
  
  const now = new Date();
  
  board.columns.forEach(column => {
    column.tasks.forEach(task => {
      stats.totalTasks++;
      
      if (task.completed) {
        stats.completedTasks++;
      } else {
        stats.pendingTasks++;
      }
      
      stats.priorities[task.priority] = (stats.priorities[task.priority] || 0) + 1;
      
      if (task.dueDate && new Date(task.dueDate) < now && !task.completed) {
        stats.overdueTasks++;
      }
    });
  });
  
  stats.completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;
  
  return stats;
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce function for search/filtering
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};