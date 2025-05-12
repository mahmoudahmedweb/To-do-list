import React from "react";
import TodoItem from "./TodoItem";
import { Todo, FilterType, SortType } from "../types/types";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  sortBy,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (
        priorityOrder[b.priority || "low"] -
          priorityOrder[a.priority || "low"] || a.text.localeCompare(b.text)
      );
    }
    if (sortBy === "name") return a.text.localeCompare(b.text);
    return new Date(b.id).getTime() - new Date(a.id).getTime(); // Sort by date (newest first)
  });

  return (
    <div className="content">
      {sortedTodos.length === 0 ? (
        <p className="empty-message">Your list is empty</p>
      ) : (
        <ul className="items-container">
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
