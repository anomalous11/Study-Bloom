import { useState, useEffect, useRef, useCallback } from "react";
import { useData } from "../context/DataContext";

const BREAK_QUOTES = [
  "Rest is not idleness — it's part of the process.",
  "You've earned this break. Breathe deeply.",
  "A rested mind learns better. You're doing great!",
  "Stretch, hydrate, and reset. You've got this.",
  "Every break is a step toward better focus.",
  "Rest now, bloom later. 🌸",
  "Great thinkers take great breaks.",
  "Your brain is consolidating everything you just learned!",
];

function playBell() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);
  } catch (e) {}
}

function CircularTimer({ timeLeft, totalTime, mode }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const strokeDashoffset = circumference * (1 - progress);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const modeColor = mode === "focus"
    ? "#c27b73"
    : mode === "short"
    ? "#73956b"
    : "#8b7dbf";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="220" className="-rotate-90">
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-surface-color"
        />
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke={modeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-5xl font-bold text-text-color tabular-nums">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </span>
        <span className="font-body text-sm text-muted-color mt-1 capitalize">
          {mode === "focus" ? "Focus Time" : mode === "short" ? "Short Break" : "Long Break"}
        </span>
      </div>
    </div>
  );
}

export default function Pomodoro() {
  const { pomodoroStats, setPomodoroStats } = useData();

  const [settings, setSettings] = useState({ focus: 25, short: 5, long: 15 });
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [breakQuote] = useState(() => BREAK_QUOTES[Math.floor(Math.random() * BREAK_QUOTES.length)]);

  const intervalRef = useRef(null);

  const totalTime = mode === "focus"
    ? settings.focus * 60
    : mode === "short"
    ? settings.short * 60
    : settings.long * 60;

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    setIsRunning(false);
    const t = newMode === "focus" ? settings.focus : newMode === "short" ? settings.short : settings.long;
    setTimeLeft(t * 60);
  }, [settings]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            playBell();
            setIsRunning(false);
            if (mode === "focus") {
              const newCount = sessionCount + 1;
              setSessionCount(newCount);
              const today = new Date().toISOString().split("T")[0];
              setPomodoroStats((prev) => ({
                sessionsToday: prev.lastDate === today ? prev.sessionsToday + 1 : 1,
                totalSessions: (prev.totalSessions || 0) + 1,
                lastDate: today,
              }));
              if (newCount % 4 === 0) {
                switchMode("long");
              } else {
                switchMode("short");
              }
            } else {
              switchMode("focus");
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, sessionCount, settings, switchMode, setPomodoroStats]);

  const handleReset = () => {
    setIsRunning(false);
    const t = mode === "focus" ? settings.focus : mode === "short" ? settings.short : settings.long;
    setTimeLeft(t * 60);
  };

  const applySettings = (newSettings) => {
    setSettings(newSettings);
    setIsRunning(false);
    const t = mode === "focus" ? newSettings.focus : mode === "short" ? newSettings.short : newSettings.long;
    setTimeLeft(t * 60);
    setShowSettings(false);
  };

  const todaySessions = pomodoroStats.lastDate === new Date().toISOString().split("T")[0]
    ? pomodoroStats.sessionsToday || 0
    : 0;

  return (
    <div className="page-enter space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-color">Pomodoro Timer</h1>
          <p className="text-muted-color font-body text-sm mt-1">Focus in intervals, bloom with results</p>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="btn-ghost text-sm">
          ⚙️ Settings
        </button>
      </div>

      {showSettings && (
        <SettingsPanel settings={settings} onApply={applySettings} onClose={() => setShowSettings(false)} />
      )}

      <div className="card p-8 flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {["focus", "short", "long"].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all ${
                mode === m ? "bg-primary-color text-white shadow-md" : "bg-surface-color text-muted-color hover:bg-hover-color"
              }`}
            >
              {m === "focus" ? "Focus" : m === "short" ? "Short Break" : "Long Break"}
            </button>
          ))}
        </div>

        <CircularTimer timeLeft={timeLeft} totalTime={totalTime} mode={mode} />

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-primary px-8 py-3 text-base"
          >
            {isRunning ? "⏸ Pause" : "▶ Start"}
          </button>
          <button onClick={handleReset} className="btn-ghost">
            ↺ Reset
          </button>
        </div>

        {mode !== "focus" && (
          <div className="card p-4 text-center bg-surface-color border-0 max-w-xs">
            <p className="font-display text-sm italic text-text-color">{breakQuote}</p>
          </div>
        )}
      </div>

      <div className="card p-5">
        <h2 className="font-display text-base font-semibold text-text-color mb-3">Today's Sessions</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: Math.max(todaySessions, 8) }, (_, i) => (
            <span key={i} className={`text-2xl transition-all duration-300 ${i < todaySessions ? "opacity-100" : "opacity-20"}`}>
              🍅
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-color font-body mt-2">
          {todaySessions} session{todaySessions !== 1 ? "s" : ""} today · {pomodoroStats.totalSessions || 0} total
        </p>
      </div>
    </div>
  );
}

function SettingsPanel({ settings, onApply, onClose }) {
  const [local, setLocal] = useState(settings);
  return (
    <div className="card p-5 border-2 border-primary-light">
      <h2 className="font-display text-lg font-semibold text-text-color mb-4">Timer Settings</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { key: "focus", label: "Focus (min)" },
          { key: "short", label: "Short Break" },
          { key: "long", label: "Long Break" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="label">{label}</label>
            <input
              type="number"
              min="1"
              max="60"
              className="input-field"
              value={local[key]}
              onChange={(e) => setLocal({ ...local, [key]: Number(e.target.value) })}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={() => onApply(local)} className="btn-primary">Apply</button>
        <button onClick={onClose} className="btn-ghost">Cancel</button>
      </div>
    </div>
  );
}
