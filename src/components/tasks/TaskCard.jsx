import React from "react";
import { getPriorityInfo, formatDate } from "../../utils/helpers";

export function TaskCard({ task, onAction }) {
  const { id, title, description, priority = "none", dueDate, completed } = task;
  const priorityInfo = getPriorityInfo(priority);

  const handleEdit = (e) => {
    e.stopPropagation();
    onAction("edit", id, task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onAction("delete", id, task);
  };

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    onAction("toggle", id, task);
  };

  return (
    <div
      className="card"
      style={{
        background: completed ? "var(--gray-50)" : "var(--bg-card)",
        padding: "var(--space-4)",
        cursor: "grab",
        borderLeft: `3px solid ${priorityInfo.color}`,
        opacity: completed ? 0.7 : 1,
      }}
      onMouseOver={(e) => {
        if (!completed) {
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "var(--space-2)",
        }}
      >
        <h4
          style={{
            color: completed ? "var(--gray-500)" : "var(--gray-800)",
            fontWeight: "var(--font-semibold)",
            fontSize: "0.875rem",
            lineHeight: 1.4,
            flex: 1,
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {title}
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>{priorityInfo.icon}</span>
          <button
            onClick={handleToggleComplete}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              borderRadius: "var(--radius-sm)",
              color: completed ? "var(--success-500)" : "var(--gray-400)",
              fontSize: "0.75rem",
            }}
            title={completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {completed ? "✅" : "⭕"}
          </button>
        </div>
      </div>

      {description && (
        <p
          style={{
            color: completed ? "var(--gray-400)" : "var(--gray-600)",
            fontSize: "0.75rem",
            lineHeight: 1.5,
            marginBottom: "var(--space-3)",
          }}
        >
          {description}
        </p>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--gray-500)",
        }}
      >
        {dueDate && <span>📅 {formatDate(dueDate)}</span>}
        <div className="flex gap-1">
          <button
            onClick={handleEdit}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              borderRadius: "var(--radius-sm)",
              color: "var(--gray-400)",
            }}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              borderRadius: "var(--radius-sm)",
              color: "var(--gray-400)",
            }}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
