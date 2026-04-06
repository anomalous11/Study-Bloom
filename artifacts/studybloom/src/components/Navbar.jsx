import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onMenuToggle, username, onLogout }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar h-16 flex items-center justify-between px-4 md:px-6 border-b border-border-color shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl hover:bg-hover-color transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="font-display text-xl font-bold text-primary-color">StudyBloom</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-color font-body">
          <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
        </div>

        {username && (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-surface-color rounded-xl px-3 py-1.5">
              <span className="text-sm">👤</span>
              <span className="font-body text-sm font-medium text-text-color">{username}</span>
            </div>
            <button
              onClick={onLogout}
              title="Switch user"
              className="p-2 rounded-xl hover:bg-hover-color transition-colors text-muted-color hover:text-text-color"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-hover-color transition-all duration-300 text-lg"
          aria-label="Toggle theme"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
