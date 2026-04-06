import { useLocation } from "wouter";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: "🏡" },
  { path: "/syllabus", label: "Syllabus", icon: "📚" },
  { path: "/resources", label: "Resources", icon: "✨" },
  { path: "/todo", label: "To-Do", icon: "✅" },
  { path: "/timetable", label: "Timetable", icon: "📅" },
  { path: "/pomodoro", label: "Pomodoro", icon: "🍅" },
  { path: "/mood", label: "Mood", icon: "🌈" },
];

function NavItem({ path, label, icon, isActive, onClick }) {
  const [, navigate] = useLocation();
  return (
    <button
      onClick={() => { navigate(path); onClick?.(); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-body text-sm font-medium ${
        isActive
          ? "bg-primary-color text-white shadow-md"
          : "text-text-color hover:bg-hover-color"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function Sidebar({ currentPath, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <aside
        className={`sidebar fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 border-r border-border-color flex flex-col py-4 px-3 gap-1 transition-transform duration-300 overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-auto md:w-64 md:flex`}
      >
        <div className="mb-4 px-2">
          <p className="text-xs font-body text-muted-color uppercase tracking-widest font-semibold">Navigation</p>
        </div>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            {...item}
            isActive={currentPath === item.path}
            onClick={onClose}
          />
        ))}
        <div className="mt-auto pt-4 px-2">
          <div className="floral-border rounded-xl p-3 text-center">
            <span className="text-2xl">🌺</span>
            <p className="text-xs text-muted-color font-body mt-1">Keep blooming!</p>
          </div>
        </div>
      </aside>
    </>
  );
}
