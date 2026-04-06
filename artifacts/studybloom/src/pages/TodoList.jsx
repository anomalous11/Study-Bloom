import { useState } from "react";
import { useData } from "../context/DataContext";

const PRIORITIES = ["High", "Medium", "Low"];

function TaskItem({ task, subjects, onToggle, onDelete }) {
  const subject = subjects.find((s) => s.id === task.subjectId);
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
      task.completed
        ? "border-border-color bg-surface-color opacity-60"
        : "border-border-color bg-card-color hover-lift"
    }`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? "bg-primary-color border-primary-color text-white"
            : "border-border-color hover:border-primary-color"
        }`}
      >
        {task.completed && <span className="text-xs">✓</span>}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`font-body text-sm font-medium text-text-color transition-all duration-200 ${task.completed ? "line-through opacity-60" : ""}`}>
          {task.name}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {subject && (
            <span className="text-xs text-muted-color font-body bg-surface-color px-2 py-0.5 rounded-lg">
              {subject.name}
            </span>
          )}
          {task.dueDate && (
            <span className="text-xs text-muted-color font-body">
              📅 {new Date(task.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-xs px-2 py-0.5 rounded-lg font-body ${
          task.priority === "High" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" :
          task.priority === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
        }`}>
          {task.priority}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 rounded-lg text-muted-color hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function TodoList() {
  const { todos, setTodos, subjects } = useData();
  const [showForm, setShowForm] = useState(false);
  const [filterSubject, setFilterSubject] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [form, setForm] = useState({ name: "", subjectId: "", dueDate: "", priority: "Medium" });

  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const filtered = todos.filter((t) => {
    if (filterSubject && t.subjectId !== filterSubject) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    return true;
  });

  const pending = filtered.filter((t) => !t.completed);
  const done = filtered.filter((t) => t.completed);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      name: form.name.trim(),
      subjectId: form.subjectId || null,
      dueDate: form.dueDate || null,
      priority: form.priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTask]);
    setForm({ name: "", subjectId: "", dueDate: "", priority: "Medium" });
    setShowForm(false);
  };

  const handleToggle = (id) => {
    setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="page-enter space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-color">To-Do List</h1>
          <p className="text-muted-color font-body text-sm mt-1">Stay on top of your assignments</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <span>+</span> Add Task
        </button>
      </div>

      {total > 0 && (
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sm text-text-color font-medium">Progress</span>
            <span className="text-muted-color text-sm font-body">{completed}/{total} done</span>
          </div>
          <div className="progress-bar-bg rounded-full h-3 overflow-hidden">
            <div className="progress-bar h-full rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-muted-color font-body mt-1">{pct}% complete {pct === 100 ? "🎉 All done!" : ""}</p>
        </div>
      )}

      {showForm && (
        <div className="card p-5 border-2 border-primary-light">
          <h2 className="font-display text-lg font-semibold text-text-color mb-4">Add New Task</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="label">Task Name *</label>
              <input
                className="input-field"
                placeholder="e.g. Complete Chapter 5 exercises"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="label">Subject</label>
                <select
                  className="input-field"
                  value={form.subjectId}
                  onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                >
                  <option value="">General</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Due Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Priority</label>
                <select
                  className="input-field"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Add Task</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <select
          className="input-field w-auto"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select
          className="input-field w-auto"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        {(filterSubject || filterPriority) && (
          <button
            onClick={() => { setFilterSubject(""); setFilterPriority(""); }}
            className="btn-ghost text-sm"
          >
            Clear filters
          </button>
        )}
      </div>

      {todos.length === 0 ? (
        <div className="card p-12 text-center">
          <span className="text-5xl block mb-4">✅</span>
          <h3 className="font-display text-xl font-semibold text-text-color mb-2">No tasks yet</h3>
          <p className="text-muted-color font-body">Add your first task to get started!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <h2 className="font-display text-base font-semibold text-text-color mb-3 flex items-center gap-2">
                📋 Pending <span className="text-sm text-muted-color font-body font-normal">({pending.length})</span>
              </h2>
              <div className="space-y-2">
                {pending.map((task) => (
                  <TaskItem key={task.id} task={task} subjects={subjects} onToggle={handleToggle} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
          {done.length > 0 && (
            <div>
              <h2 className="font-display text-base font-semibold text-text-color mb-3 flex items-center gap-2">
                ✅ Completed <span className="text-sm text-muted-color font-body font-normal">({done.length})</span>
              </h2>
              <div className="space-y-2">
                {done.map((task) => (
                  <TaskItem key={task.id} task={task} subjects={subjects} onToggle={handleToggle} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
