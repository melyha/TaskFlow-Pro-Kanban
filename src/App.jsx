import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  return (
    <div className="container" style={{ padding: 'var(--space-8)' }}>
      <header style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ color: 'var(--primary-600)', marginBottom: 'var(--space-2)' }}>
          🚀 TaskFlow Pro
        </h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '1.125rem' }}>
          Advanced Kanban Task Management - Design System Preview
        </p>
      </header>

      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Design System Components</h2>
        
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Sample Task Card</h3>
          <p style={{ marginBottom: 'var(--space-4)' }}>This is how our task cards will look with the new design system.</p>
          
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <span className="priority-high">⚠️ High Priority</span>
            <span className="priority-medium">📋 Medium Priority</span>
            <span className="priority-low">✅ Low Priority</span>
          </div>
        </div>

        <input 
          className="input" 
          placeholder="Try typing in this input field..."
          style={{ marginBottom: 'var(--space-4)' }}
        />
      </section>

      <section>
        <h2 style={{ marginBottom: 'var(--space-4)' }}>Coming Soon</h2>
        <ul style={{ color: 'var(--gray-600)' }}>
          <li>📋 Kanban Board Layout</li>
          <li>🎯 Drag & Drop Tasks</li>
          <li>🏷️ Color-coded Labels</li>
          <li>📅 Due Date Management</li>
          <li>🔍 Search & Filtering</li>
        </ul>
      </section>
    </div>
  )
}

export default App
