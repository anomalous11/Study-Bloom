import { useState } from "react";
import { useData } from "../context/DataContext";

function SubjectCard({ subject, onDelete, onClick }) {
  const daysLeft = subject.examDate
    ? Math.ceil((new Date(subject.examDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div
      className="card p-5 hover-lift cursor-pointer group relative"
      onClick={() => onClick(subject)}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(subject.id); }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 text-muted-color hover:text-rose-500"
      >
        ✕
      </button>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-lg flex-shrink-0">
          📖
        </div>
        <div>
          <h3 className="font-display font-semibold text-text-color text-base">{subject.name}</h3>
          <p className="text-xs text-muted-color font-body">{subject.semester}</p>
        </div>
      </div>
      {subject.examDate && (
        <div className={`inline-flex items-center gap-1.5 text-xs font-body px-2.5 py-1 rounded-lg mb-3 ${
          daysLeft !== null && daysLeft <= 3 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" :
          daysLeft !== null && daysLeft <= 7 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
          "bg-sage-100 text-sage-800 dark:bg-green-900/30 dark:text-green-300"
        }`}>
          📅 Exam: {new Date(subject.examDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {daysLeft !== null && ` · ${daysLeft >= 0 ? `${daysLeft}d left` : "Passed"}`}
        </div>
      )}
      {subject.topics && subject.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {subject.topics.slice(0, 4).map((topic, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-lg bg-surface-color text-muted-color font-body">
              {topic}
            </span>
          ))}
          {subject.topics.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-lg bg-surface-color text-muted-color font-body">
              +{subject.topics.length - 4} more
            </span>
          )}
        </div>
      )}
      <p className="text-xs text-primary-color mt-3 font-body opacity-0 group-hover:opacity-100 transition-opacity">
        Click for AI resources ✨
      </p>
    </div>
  );
}

export default function Syllabus({ onSubjectClick }) {
  const { subjects, setSubjects } = useData();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", semester: "", examDate: "", topics: "" });
  const [dragOver, setDragOver] = useState(false);

  const grouped = subjects.reduce((acc, s) => {
    const sem = s.semester || "Uncategorized";
    if (!acc[sem]) acc[sem] = [];
    acc[sem].push(s);
    return acc;
  }, {});

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newSubject = {
      id: Date.now().toString(),
      name: form.name.trim(),
      semester: form.semester.trim() || "Current Semester",
      examDate: form.examDate || null,
      topics: form.topics ? form.topics.split(",").map((t) => t.trim()).filter(Boolean) : [],
      createdAt: new Date().toISOString(),
    };
    setSubjects([...subjects, newSubject]);
    setForm({ name: "", semester: "", examDate: "", topics: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (file.name.match(/\.(pdf|docx|txt)$/i)) {
        const newSubject = {
          id: Date.now().toString() + Math.random(),
          name: file.name.replace(/\.(pdf|docx|txt)$/i, ""),
          semester: "Current Semester",
          examDate: null,
          topics: [],
          createdAt: new Date().toISOString(),
        };
        setSubjects((prev) => [...prev, newSubject]);
      }
    });
  };

  return (
    <div className="page-enter space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-color">Semester Syllabus</h1>
          <p className="text-muted-color font-body text-sm mt-1">Track your subjects and upcoming exams</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <span>+</span> Add Subject
        </button>
      </div>

      {showForm && (
        <div className="card p-6 border-2 border-primary-light">
          <h2 className="font-display text-lg font-semibold text-text-color mb-4">Add New Subject</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Subject Name *</label>
                <input
                  className="input-field"
                  placeholder="e.g. Calculus II"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Semester</label>
                <input
                  className="input-field"
                  placeholder="e.g. Fall 2024"
                  value={form.semester}
                  onChange={(e) => setForm({ ...form, semester: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Exam Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={form.examDate}
                  onChange={(e) => setForm({ ...form, examDate: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Topics (comma separated)</label>
                <input
                  className="input-field"
                  placeholder="e.g. Derivatives, Integrals, Limits"
                  value={form.topics}
                  onChange={(e) => setForm({ ...form, topics: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">Add Subject</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
          dragOver ? "border-primary-color bg-primary-light/20" : "border-border-color bg-surface-color"
        }`}
      >
        <span className="text-3xl block mb-2">📄</span>
        <p className="font-body text-sm text-muted-color">Drop syllabus files here (.pdf, .docx, .txt)</p>
        <p className="text-xs text-muted-color mt-1">They'll be added as subjects automatically</p>
      </div>

      {subjects.length === 0 ? (
        <div className="card p-12 text-center">
          <span className="text-5xl block mb-4">📚</span>
          <h3 className="font-display text-xl font-semibold text-text-color mb-2">No subjects yet</h3>
          <p className="text-muted-color font-body">Add your first subject to get started!</p>
        </div>
      ) : (
        Object.entries(grouped).map(([semester, semSubjects]) => (
          <div key={semester}>
            <h2 className="font-display text-xl font-semibold text-text-color mb-4 flex items-center gap-2">
              <span className="text-primary-color">📂</span> {semester}
              <span className="text-sm text-muted-color font-body font-normal">({semSubjects.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {semSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onDelete={handleDelete}
                  onClick={onSubjectClick}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
