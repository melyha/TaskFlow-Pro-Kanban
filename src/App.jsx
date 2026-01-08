import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppLayout } from './components/layout/AppLayout'
import { Board } from './components/boards/Board'

// Sample data to showcase the component structure
const sampleBoardData = {
  columns: [
    {
      id: 1,
      title: "To Do",
      tasks: [
        {
          id: 1,
          title: "Set up project repository",
          description: "Initialize Git repo and set up project structure",
          priority: "high",
          dueDate: "2026-01-10"
        },
        {
          id: 2,
          title: "Design system implementation",
          description: "Create color tokens and component styles",
          priority: "medium",
          dueDate: "2026-01-08"
        }
      ]
    },
    {
      id: 2,
      title: "In Progress", 
      tasks: [
        {
          id: 3,
          title: "Build core components",
          description: "Create Board, Column, and TaskCard components",
          priority: "high"
        }
      ]
    },
    {
      id: 3,
      title: "Done",
      tasks: [
        {
          id: 4,
          title: "Project planning",
          description: "Define scope and requirements",
          priority: "low"
        }
      ]
    }
  ]
};

function App() {
  const handleAddTask = (columnTitle) => {
    console.log(`Add task to column: ${columnTitle}`);
  };

  const handleTaskAction = (action, taskId) => {
    console.log(`Task action: ${action} on task ${taskId}`);
  };

  const handleAddColumn = () => {
    console.log('Add new column');
  };

  return (
    <AppLayout>
      <Board
        columns={sampleBoardData.columns}
        onAddTask={handleAddTask}
        onTaskAction={handleTaskAction}
        onAddColumn={handleAddColumn}
      />
    </AppLayout>
  )
}


export default App
