import { useState, useRef, useCallback } from "react";
import { useData } from "../context/DataContext";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 16 }, (_, i) => i + 7); // 7AM - 10PM

const BLOCK_COLORS = [
  { label: "Rose", value: "rose" },
  { label: "Sage", value: "sage" },
  { label: "Amber", value: "amber" },
  { label: "Blue", value: "blue" },
  { label: "Violet", value: "violet" },
];

const COLOR_STYLES = {
  rose: "bg-rose-200 border-rose-400 text-rose-900 dark:bg-rose-900/40 dark:border-rose-600 dark:text-rose-200",
  sage: "bg-green-200 border-green-400 text-green-900 dark:bg-green-900/40 dark:border-green-600 dark:text-green-200",
  amber: "bg-amber-200 border-amber-400 text-amber-900 dark:bg-amber-900/40 dark:border-amber-600 dark:text-amber-200",
  blue: "bg-blue-200 border-blue-400 text-blue-900 dark:bg-blue-900/40 dark:border-blue-600 dark:text-blue-200",
  violet: "bg-violet-200 border-violet-400 text-violet-900 dark:bg-violet-900/40 dark:border-violet-600 dark:text-violet-200",
};

function SlotModal({ slot, subjects, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(
    slot.entry
      ? { subject: slot.entry.subject, topic: slot.entry.topic || "", color: slot.entry.color || "rose" }
      : { subject: subjects[0]?.name || "", topic: "", color: "rose" }
  );

  const handleSave = () => {
    if (!form.subject.trim()) return;
    onSave(slot.day, slot.hour, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-bg-color rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-lg font-semibold text-text-color mb-1">
          {DAYS[slot.day]} {HOURS[slot.hour]}:00
        </h2>
        <p className="text-muted-color text-sm font-body mb-4">{slot.entry ? "Edit" : "Add"} study block</p>
        <div className="space-y-4">
          <div>
            <label className="label">Subject</label>
            {subjects.length > 0 ? (
              <select
                className="input-field"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              >
                {subjects.map((s) => <option key={s.id}>{s.name}</option>)}
                <option value="Other">Other</option>
              </select>
            ) : (
              <input
                className="input-field"
                placeholder="Subject name"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            )}
          </div>
          <div>
            <label className="label">Topic (optional)</label>
            <input
              className="input-field"
              placeholder="What will you study?"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Color</label>
            <div className="flex gap-2">
              {BLOCK_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setForm({ ...form, color: c.value })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    form.color === c.value ? "scale-125 border-text-color" : "border-transparent"
                  } ${COLOR_STYLES[c.value].split(" ")[0]}`}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={handleSave} className="btn-primary flex-1">Save</button>
          {slot.entry && (
            <button
              onClick={() => { onDelete(slot.day, slot.hour); onClose(); }}
              className="px-4 py-2 rounded-xl text-sm font-body text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
            >
              Delete
            </button>
          )}
          <button onClick={onClose} className="btn-ghost">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function Timetable() {
  const { timetable, setTimetable, subjects } = useData();
  const [modal, setModal] = useState(null);

  const getEntry = (day, hour) => timetable[`${day}-${hour}`] || null;

  const handleSlotClick = (day, hour) => {
    setModal({ day, hour, entry: getEntry(day, hour) });
  };

  const handleSave = (day, hour, form) => {
    setTimetable({ ...timetable, [`${day}-${hour}`]: form });
  };

  const handleDelete = (day, hour) => {
    const updated = { ...timetable };
    delete updated[`${day}-${hour}`];
    setTimetable(updated);
  };

  const exportTimetable = () => {
    const lines = ["📅 WEEKLY STUDY TIMETABLE\n"];
    DAYS.forEach((day, di) => {
      const dayEntries = HOURS
        .map((h, hi) => ({ h, entry: getEntry(di, hi) }))
        .filter(({ entry }) => entry);
      if (dayEntries.length > 0) {
        lines.push(`\n${day}:`);
        dayEntries.forEach(({ h, entry }) => {
          lines.push(`  ${h}:00 - ${entry.subject}${entry.topic ? ` (${entry.topic})` : ""}`);
        });
      }
    });
    navigator.clipboard.writeText(lines.join("\n"));
  };

  const filledSlots = Object.keys(timetable).length;

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-color">Study Timetable</h1>
          <p className="text-muted-color font-body text-sm mt-1">
            {filledSlots} blocks scheduled · Click any slot to add a study session
          </p>
        </div>
        <button onClick={exportTimetable} className="btn-ghost flex items-center gap-2 text-sm">
          📋 Export
        </button>
      </div>

      <div className="card overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid gap-px bg-border-color rounded-xl overflow-hidden" style={{ gridTemplateColumns: `5rem repeat(7, 1fr)` }}>
            <div className="bg-surface-color p-2" />
            {DAYS.map((day) => (
              <div key={day} className="bg-surface-color p-2 text-center font-body text-xs font-semibold text-muted-color uppercase tracking-wide">
                {day}
              </div>
            ))}
            {HOURS.map((hour, hi) => (
              <>
                <div key={`h-${hour}`} className="bg-bg-color p-2 text-right text-xs text-muted-color font-body flex items-center justify-end pr-3">
                  {hour < 12 ? `${hour}am` : hour === 12 ? "12pm" : `${hour - 12}pm`}
                </div>
                {DAYS.map((_, di) => {
                  const entry = getEntry(di, hi);
                  return (
                    <button
                      key={`${di}-${hi}`}
                      onClick={() => handleSlotClick(di, hi)}
                      className={`min-h-[2.5rem] p-1 text-left transition-all duration-150 text-xs font-body ${
                        entry
                          ? `border ${COLOR_STYLES[entry.color] || COLOR_STYLES.rose} hover:opacity-90`
                          : "bg-bg-color hover:bg-hover-color"
                      }`}
                    >
                      {entry && (
                        <div className="truncate">
                          <p className="font-semibold truncate">{entry.subject}</p>
                          {entry.topic && <p className="truncate opacity-70">{entry.topic}</p>}
                        </div>
                      )}
                    </button>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {BLOCK_COLORS.map((c) => (
          <span key={c.value} className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${COLOR_STYLES[c.value]}`}>
            <span className={`w-2 h-2 rounded-full ${COLOR_STYLES[c.value].split(" ")[0]}`} />
            {c.label}
          </span>
        ))}
      </div>

      {modal && (
        <SlotModal
          slot={modal}
          subjects={subjects}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
