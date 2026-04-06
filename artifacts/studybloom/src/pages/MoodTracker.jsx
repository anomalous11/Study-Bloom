import { useState } from "react";
import { useData } from "../context/DataContext";

const MOODS = [
  { key: "exhausted", emoji: "😴", label: "Exhausted", color: "#94a3b8", barColor: "bg-slate-400" },
  { key: "stressed", emoji: "😟", label: "Stressed", color: "#f87171", barColor: "bg-rose-400" },
  { key: "neutral", emoji: "😐", label: "Neutral", color: "#fbbf24", barColor: "bg-amber-400" },
  { key: "good", emoji: "😊", label: "Good", color: "#4ade80", barColor: "bg-green-400" },
  { key: "focused", emoji: "🤩", label: "Focused", color: "#818cf8", barColor: "bg-violet-400" },
];

const MOOD_BG = {
  exhausted: "bg-slate-100 dark:bg-slate-800",
  stressed: "bg-rose-100 dark:bg-rose-900/30",
  neutral: "bg-amber-100 dark:bg-amber-900/30",
  good: "bg-green-100 dark:bg-green-900/30",
  focused: "bg-violet-100 dark:bg-violet-900/30",
};

function CalendarHeatmap({ moods }) {
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });

  const moodMap = moods.reduce((acc, m) => { acc[m.date] = m.mood; return acc; }, {});

  return (
    <div>
      <h3 className="font-display font-semibold text-text-color mb-3">Last 30 Days</h3>
      <div className="flex flex-wrap gap-1.5">
        {days.map((date) => {
          const mood = moodMap[date];
          const moodData = MOODS.find((m) => m.key === mood);
          return (
            <div
              key={date}
              title={`${date}: ${mood || "No entry"}`}
              className={`w-7 h-7 rounded-md transition-all cursor-default ${
                mood ? MOOD_BG[mood] : "bg-surface-color"
              }`}
              style={{ border: mood ? `2px solid ${moodData?.color || "#e5e7eb"}` : "2px solid transparent" }}
            >
              {mood && (
                <span className="text-xs flex items-center justify-center h-full">
                  {moodData?.emoji}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeeklyChart({ moods }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const weekDays = days.map((day, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + mondayOffset + i);
    const dateStr = d.toISOString().split("T")[0];
    const entry = moods.find((m) => m.date === dateStr);
    return { day, date: dateStr, entry };
  });

  const moodScore = { exhausted: 1, stressed: 2, neutral: 3, good: 4, focused: 5 };

  return (
    <div>
      <h3 className="font-display font-semibold text-text-color mb-3">This Week</h3>
      <div className="flex items-end gap-2 h-24">
        {weekDays.map(({ day, entry }) => {
          const score = entry ? moodScore[entry.mood] : 0;
          const moodData = MOODS.find((m) => m.key === entry?.mood);
          const heightPct = score ? (score / 5) * 100 : 0;
          return (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex-1 w-full flex items-end rounded-lg overflow-hidden bg-surface-color relative" style={{ minHeight: "80px" }}>
                {score > 0 && (
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${moodData?.barColor || "bg-gray-300"}`}
                    style={{ height: `${heightPct}%` }}
                    title={entry?.mood}
                  />
                )}
              </div>
              <span className="text-xs text-muted-color font-body">{day}</span>
              {entry && <span className="text-sm">{moodData?.emoji}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MoodTracker() {
  const { moods, setMoods } = useData();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const todayEntry = moods.find((m) => m.date === today);

  const handleSave = () => {
    if (!selectedMood) return;
    const entry = { date: today, mood: selectedMood, note: note.trim(), time: new Date().toISOString() };
    setMoods([...moods.filter((m) => m.date !== today), entry]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setNote("");
  };

  return (
    <div className="page-enter space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl font-bold text-text-color">Mood Tracker</h1>
        <p className="text-muted-color font-body text-sm mt-1">Check in with yourself every day</p>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-text-color mb-2">
          How are you feeling today?
        </h2>
        {todayEntry && !selectedMood && (
          <p className="text-sm text-muted-color font-body mb-3">
            Today: {MOODS.find((m) => m.key === todayEntry.mood)?.emoji} {todayEntry.mood}
            {todayEntry.note && ` · "${todayEntry.note}"`}
          </p>
        )}
        <div className="flex flex-wrap gap-3 mb-5">
          {MOODS.map((mood) => (
            <button
              key={mood.key}
              onClick={() => setSelectedMood(mood.key)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 min-w-[80px] ${
                selectedMood === mood.key
                  ? `${MOOD_BG[mood.key]} border-current`
                  : "border-border-color hover:border-muted-color bg-surface-color"
              }`}
              style={{ borderColor: selectedMood === mood.key ? mood.color : undefined }}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="font-body text-xs text-muted-color">{mood.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="space-y-3">
            <div>
              <label className="label">Add a note (optional)</label>
              <textarea
                className="input-field resize-none"
                rows={2}
                placeholder="What's on your mind?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} className="btn-primary">
                {saved ? "✓ Saved!" : "Save Mood"}
              </button>
              <button onClick={() => { setSelectedMood(null); setNote(""); }} className="btn-ghost">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card p-6">
        <CalendarHeatmap moods={moods} />
      </div>

      <div className="card p-6">
        <WeeklyChart moods={moods} />
      </div>

      {moods.length > 0 && (
        <div className="card p-5">
          <h3 className="font-display font-semibold text-text-color mb-3">Recent Entries</h3>
          <div className="space-y-2">
            {[...moods].reverse().slice(0, 5).map((entry) => {
              const moodData = MOODS.find((m) => m.key === entry.mood);
              return (
                <div key={entry.date} className={`flex items-center gap-3 p-3 rounded-xl ${MOOD_BG[entry.mood]}`}>
                  <span className="text-2xl">{moodData?.emoji}</span>
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-text-color capitalize">{entry.mood}</p>
                    {entry.note && <p className="text-xs text-muted-color">"{entry.note}"</p>}
                  </div>
                  <p className="text-xs text-muted-color font-body flex-shrink-0">
                    {new Date(entry.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
