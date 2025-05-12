import React from "react";
import { Todo } from "../types/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    newText: string,
    newPriority?: string,
    newDueDate?: string
  ) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const [editPriority, setEditPriority] = React.useState(todo.priority || "");
  const [editDueDate, setEditDueDate] = React.useState(todo.dueDate || "");

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText, editPriority, editDueDate);
      setIsEditing(false);
    }
  };

  return (
    <li className={todo.completed ? "checked" : ""}>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleEdit()}
            autoFocus
            className="edit-input"
          />
          <div className="edit-controls">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="edit-priority"
            >
              <option value="">No priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="edit-date"
            />
            <button onClick={handleEdit} className="save-btn">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="checkbox-container" onClick={() => onToggle(todo.id)}>
            <div
              className={`custom-checkbox ${todo.completed ? "checked" : ""}`}
            >
              {todo.completed && <span className="checkmark">✓</span>}
            </div>
            <div className="task-content">
              <span className="task-text">{todo.text}</span>
              {todo.priority && (
                <span className={`priority-tag ${todo.priority}`}>
                  {todo.priority}
                </span>
              )}
              {todo.dueDate && (
                <span className="due-date-tag">
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="action-buttons">
            <span className="edit-btn" onClick={() => setIsEditing(true)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </span>
            <span className="remove-btn" onClick={() => onDelete(todo.id)}>
              ×
            </span>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
