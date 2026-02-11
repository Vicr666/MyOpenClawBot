"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { Plus, Trash2, Check, Circle, X } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type Filter = "all" | "active" | "completed";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("todo-app-data");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse todos", e);
      }
    }
    setMounted(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todo-app-data", JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
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

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (!mounted) return null;

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 transition-all duration-300">
      <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
        <h1 className="text-2xl font-bold text-white mb-1">Tasks</h1>
        <p className="text-indigo-100 text-sm opacity-90">
          {todos.filter((t) => !t.completed).length} items remaining
        </p>
      </div>

      <div className="p-4">
        {/* Input Area */}
        <div className="relative mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="w-full pl-4 pr-12 py-3.5 bg-zinc-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all placeholder:text-zinc-400 dark:text-white"
          />
          <button
            onClick={addTodo}
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 p-1.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 mb-4 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                filter === f
                  ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-zinc-400">
              <p className="text-sm">No tasks found</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="group flex items-center gap-3 p-3 bg-white dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:border-indigo-100 dark:hover:border-zinc-700 transition-all"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-zinc-300 dark:border-zinc-600 text-transparent hover:border-emerald-400"
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </button>
                <span
                  className={`flex-1 text-sm truncate transition-all ${
                    todo.completed
                      ? "text-zinc-400 line-through decoration-zinc-300"
                      : "text-zinc-700 dark:text-zinc-200"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.some((t) => t.completed) && (
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
            <button
              onClick={clearCompleted}
              className="text-xs text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <X size={12} /> Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
