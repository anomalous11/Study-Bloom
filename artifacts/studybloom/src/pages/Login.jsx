import { useState } from "react";

const WELCOME_MESSAGES = [
  "Welcome back, scholar! 🌸",
  "Ready to bloom today? 🌻",
  "Your study space awaits 📚",
  "Let's make today count 🍅",
  "Knowledge grows here 🌿",
];

function BotanicalCorner() {
  return (
    <svg
      width="220" height="220" viewBox="0 0 220 220" fill="none"
      className="absolute bottom-0 right-0 opacity-20 pointer-events-none"
    >
      <ellipse cx="160" cy="140" rx="45" ry="22" transform="rotate(-25 160 140)" fill="#b5c9a0" />
      <ellipse cx="185" cy="165" rx="38" ry="18" transform="rotate(18 185 165)" fill="#8fad78" />
      <ellipse cx="140" cy="175" rx="32" ry="15" transform="rotate(-55 140 175)" fill="#b5c9a0" />
      <ellipse cx="175" cy="195" rx="35" ry="16" transform="rotate(38 175 195)" fill="#73956b" />
      <circle cx="200" cy="120" r="14" fill="#d4847c" />
      <circle cx="212" cy="133" r="9" fill="#e8a09a" />
      <circle cx="188" cy="110" r="11" fill="#d4847c" />
      <path d="M120 220 Q148 165 180 140" stroke="#73956b" strokeWidth="2" fill="none" />
      <path d="M130 220 Q162 180 200 145" stroke="#8fad78" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function TopFloral() {
  return (
    <svg
      width="160" height="160" viewBox="0 0 160 160" fill="none"
      className="absolute top-0 left-0 opacity-15 pointer-events-none"
    >
      <ellipse cx="40" cy="60" rx="35" ry="16" transform="rotate(30 40 60)" fill="#b5c9a0" />
      <ellipse cx="20" cy="80" rx="28" ry="13" transform="rotate(-20 20 80)" fill="#8fad78" />
      <circle cx="15" cy="40" r="12" fill="#d4847c" />
      <circle cx="5" cy="52" r="8" fill="#e8a09a" />
      <path d="M0 0 Q30 50 60 80" stroke="#73956b" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const welcome = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Please enter your name to continue.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onLogin(trimmed);
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FAF7F2 0%, #F0E8DF 40%, #E8F0E5 100%)" }}
    >
      <TopFloral />

      <div className="w-full max-w-md relative z-10">
        <div
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(232, 221, 208, 0.8)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(193,125,116,0.1)",
          }}
        >
          <BotanicalCorner />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">🌸</div>
              <h1
                className="font-display text-3xl font-bold mb-1"
                style={{ color: "#3B2F2F" }}
              >
                StudyBloom
              </h1>
              <p className="font-body text-sm" style={{ color: "#8B7265" }}>
                {welcome}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block font-body text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#8B7265" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Emma, Alex, Jordan…"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }}
                  autoFocus
                  maxLength={30}
                  style={{
                    width: "100%",
                    background: "#FAF7F2",
                    border: error ? "1.5px solid #e87070" : "1.5px solid #E8DDD0",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    color: "#3B2F2F",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9375rem",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C17D74";
                    e.target.style.boxShadow = "0 0 0 3px rgba(193,125,116,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? "#e87070" : "#E8DDD0";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {error && (
                  <p className="font-body text-xs mt-1.5" style={{ color: "#e87070" }}>{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  background: isLoading ? "#D4A09A" : "#C17D74",
                  color: "white",
                  border: "none",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s, transform 0.1s, box-shadow 0.2s",
                  boxShadow: "0 4px 12px rgba(193,125,116,0.3)",
                }}
                onMouseEnter={(e) => { if (!isLoading) e.target.style.background = "#9E5E57"; }}
                onMouseLeave={(e) => { if (!isLoading) e.target.style.background = "#C17D74"; }}
              >
                {isLoading ? "Opening your space…" : "Enter My Study Space →"}
              </button>
            </form>

            <p
              className="text-center font-body text-xs mt-5 leading-relaxed"
              style={{ color: "#8B7265" }}
            >
              Your data is saved privately to your name on this device.<br />
              Each person gets their own separate space. 🌿
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-0 right-0 text-center font-body text-xs"
        style={{ color: "#B89E92" }}
      >
        StudyBloom — bloom where you study 🌸
      </div>
    </div>
  );
}
