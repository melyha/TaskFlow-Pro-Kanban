// Data Models for TaskFlow Pro

/**
 * Creates a new task object
 */
export const createTask = (data = {}) => ({
  id:
    data.id || `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  title: data.title || "",
  description: data.description || "",
  priority: data.priority || "none",
  dueDate: data.dueDate || null,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  columnId: data.columnId || null,
  labels: data.labels || [],
  completed: data.completed || false,
});

/**
 * Creates a new column object
 */
export const createColumn = (data = {}) => ({
  id:
    data.id ||
    `column_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  title: data.title || "New Column",
  position: data.position || 0,
  tasks: data.tasks || [],
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  color: data.color || null,
});

/**
 * Creates a new board object
 */
export const createBoard = (data = {}) => ({
  id:
    data.id || `board_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  title: data.title || "My Board",
  description: data.description || "",
  columns: data.columns || [],
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  settings: {
    theme: "default",
    showCompletedTasks: true,
    ...data.settings,
  },
});

/**
 * Default board data for new users
 */
export const getDefaultBoardData = () => {
  const todoColumn = createColumn({
    title: "To Do",
    position: 0,
    tasks: [
      createTask({
        title: "Welcome to TaskFlow Pro!",
        description:
          "Start organizing your tasks in this beautiful Kanban board. Drag and drop tasks between columns.",
        priority: "medium",
      }),
      createTask({
        title: "Try creating a new task",
        description: 'Click the "Add Task" button to create your first task.',
        priority: "low",
      }),
    ],
  });

  const progressColumn = createColumn({
    title: "In Progress",
    position: 1,
    tasks: [
      createTask({
        title: "Customize your workflow",
        description:
          "Add more columns, set priorities, and organize your work the way you want.",
        priority: "high",
      }),
    ],
  });

  const doneColumn = createColumn({
    title: "Done",
    position: 2,
    tasks: [
      createTask({
        title: "Explore the features",
        description:
          "You've already seen the beautiful design and smooth interactions!",
        priority: "none",
        completed: true,
      }),
    ],
  });

  return createBoard({
    title: "My First Board",
    description: "Welcome to your personal task management workspace",
    columns: [todoColumn, progressColumn, doneColumn],
  });
};

/**
 * Validation helpers
 */
export const validateTask = (task) => {
  const errors = [];

   // Only validate title if it exists
  if (task.title !== undefined && (!task.title || task.title.trim().length === 0)) {
    errors.push("Task title is required");
  }

  if (task.title && task.title.length > 100) {
    errors.push("Task title must be less than 100 characters");
  }

  // Only validate priority if it's being set
  if (task.priority !== undefined && !["none", "low", "medium", "high"].includes(task.priority)) {
    errors.push("Invalid priority level");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateColumn = (column) => {
  const errors = [];

  if (!column.title || column.title.trim().length === 0) {
    errors.push("Column title is required");
  }

  if (column.title && column.title.length > 50) {
    errors.push("Column title must be less than 50 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
