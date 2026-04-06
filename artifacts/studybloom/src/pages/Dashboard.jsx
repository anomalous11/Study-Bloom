import { useData } from "../context/DataContext";
import { getDailyQuote } from "../utils/quotes";
import { useLocation } from "wouter";

function BotanicalSVG() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="opacity-30 dark:opacity-20 absolute right-0 top-0 pointer-events-none">
      <ellipse cx="120" cy="60" rx="35" ry="20" transform="rotate(-30 120 60)" fill="#b5c9a0" />
      <ellipse cx="140" cy="80" rx="30" ry="15" transform="rotate(20 140 80)" fill="#8fad78" />
      <ellipse cx="100" cy="90" rx="25" ry="12" transform="rotate(-60 100 90)" fill="#b5c9a0" />
      <ellipse cx="130" cy="110" rx="28" ry="13" transform="rotate(40 130 110)" fill="#73956b" />
      <circle cx="155" cy="45" r="12" fill="#d4847c" />
      <circle cx="165" cy="55" r="8" fill="#e8a09a" />
      <circle cx="145" cy="35" r="9" fill="#d4847c" />
      <path d="M90 160 Q110 100 140 80" stroke="#73956b" strokeWidth="2" fill="none" />
      <path d="M95 170 Q120 130 155 90" stroke="#8fad78" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`card p-4 flex items-center gap-4 hover-lift`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-muted-color text-xs font-body">{label}</p>
        <p className="font-display text-2xl font-bold text-text-color">{value}</p>
      </div>
    </div>
  );
}

function UpcomingExams({ subjects }) {
  const upcoming = subjects
    .filter((s) => s.examDate)
    .map((s) => ({ ...s, daysLeft: Math.ceil((new Date(s.examDate) - new Date()) / (1000 * 60 * 60 * 24)) }))
    .filter((s) => s.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 3);

  if (upcoming.length === 0) {
    return (
      <div className="text-center py-6 text-muted-color font-body text-sm">
        <span className="text-2xl block mb-2">📅</span>
        No upcoming exams. Add subjects in Syllabus!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {upcoming.map((s) => (
        <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-color">
          <div>
            <p className="font-body font-semibold text-text-color text-sm">{s.name}</p>
            <p className="text-muted-color text-xs">{s.semester}</p>
          </div>
          <div className="text-right">
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
              s.daysLeft <= 3 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
              s.daysLeft <= 7 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
              "bg-sage-100 text-sage-700 dark:bg-green-900/30 dark:text-green-300"
            }`}>
              {s.daysLeft === 0 ? "Today!" : `${s.daysLeft}d left`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TodayTasks({ todos, subjects }) {
  const today = new Date().toISOString().split("T")[0];
  const todayTasks = todos
    .filter((t) => t.dueDate === today && !t.completed)
    .slice(0, 4);

  if (todayTasks.length === 0) {
    return (
      <div className="text-center py-6 text-muted-color font-body text-sm">
        <span className="text-2xl block mb-2">✅</span>
        No tasks due today! You're all caught up.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todayTasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-color">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
            task.priority === "High" ? "bg-rose-400" :
            task.priority === "Medium" ? "bg-amber-400" : "bg-sage-400"
          }`} />
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm text-text-color truncate">{task.name}</p>
            <p className="text-xs text-muted-color">{subjects.find((s) => s.id === task.subjectId)?.name || "General"}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-lg flex-shrink-0 ${
            task.priority === "High" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" :
            task.priority === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          }`}>{task.priority}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { subjects, todos, moods, pomodoroStats } = useData();
  const quote = getDailyQuote();
  const [, navigate] = useLocation();

  const completedTodos = todos.filter((t) => t.completed).length;
  const totalTodos = todos.length;
  const completionPct = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const today = new Date().toISOString().split("T")[0];
  const todayMood = moods.find((m) => m.date === today);
  const moodEmojis = { exhausted: "😴", stressed: "😟", neutral: "😐", good: "😊", focused: "🤩" };

  return (
    <div className="page-enter space-y-6 max-w-5xl">
      <div className="hero-gradient relative rounded-2xl p-6 md:p-8 overflow-hidden">
        <BotanicalSVG />
        <div className="relative z-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-dark mb-2">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}! 🌸
          </h1>
          <p className="text-muted-color font-body text-base max-w-md">
            Ready to make today bloom? Here's your overview.
          </p>
        </div>
      </div>

      <div className="card p-4 md:p-6 border-l-4 border-primary-color">
        <p className="font-display text-lg italic text-text-color leading-relaxed">"{quote.text}"</p>
        <p className="text-muted-color text-sm font-body mt-2">— {quote.author}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="📚" label="Subjects" value={subjects.length} color="bg-rose-50 dark:bg-rose-900/20" />
        <StatCard icon="✅" label="Tasks Done" value={`${completionPct}%`} color="bg-sage-50 dark:bg-green-900/20" />
        <StatCard icon="🍅" label="Focus Sessions" value={pomodoroStats.totalSessions || 0} color="bg-amber-50 dark:bg-amber-900/20" />
        <StatCard icon={todayMood ? moodEmojis[todayMood.mood] : "🌟"} label="Today's Mood" value={todayMood ? todayMood.mood : "Check in!"} color="bg-blue-50 dark:bg-blue-900/20" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-text-color">Today's Tasks</h2>
            <button
              onClick={() => navigate("/todo")}
              className="text-xs text-primary-color hover:text-primary-dark font-body transition-colors"
            >
              View all →
            </button>
          </div>
          <TodayTasks todos={todos} subjects={subjects} />
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-text-color">Upcoming Exams</h2>
            <button
              onClick={() => navigate("/syllabus")}
              className="text-xs text-primary-color hover:text-primary-dark font-body transition-colors"
            >
              View all →
            </button>
          </div>
          <UpcomingExams subjects={subjects} />
        </div>
      </div>

      {totalTodos > 0 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold text-text-color">Overall Progress</h2>
            <span className="font-body text-sm text-muted-color">{completedTodos}/{totalTodos} tasks</span>
          </div>
          <div className="progress-bar-bg rounded-full h-4 overflow-hidden">
            <div
              className="progress-bar h-full rounded-full transition-all duration-700"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-color font-body mt-2">{completionPct}% complete — keep going! 🌻</p>
        </div>
      )}
    </div>
  );
}
