import React, { useState } from "react";
import { Todo, FilterType, SortType } from "./types/types";
import useLocalStorage from "./hooks/useLocalStorage";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [inputValue, setInputValue] = useState("");
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("date");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: new Date().toISOString(),
        text: inputValue,
        completed: false,
        dueDate: dueDate || undefined,
        priority: priority,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      setDueDate("");
      setPriority("medium");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <div className="to-do">
        <div className="heading">
          <h2>
            My To-do list
            <span id="count">{todos.length} item(s)</span>
          </h2>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <div className="filters">
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <div className="sort-options">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        <TodoList
          todos={todos}
          filter={filter}
          sortBy={sortBy}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        <div className="functions">
          <div className="input-group">
            <input
              type="text"
              placeholder="Type your list here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="additional-fields">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due date"
              />
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <button className="add-btn" onClick={addTodo}>
            Add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
