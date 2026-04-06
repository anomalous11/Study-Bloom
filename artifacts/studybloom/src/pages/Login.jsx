import { useState } from "react";
import { createAccount, verifyLogin } from "../utils/auth";

function BotanicalCorner() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none"
      className="absolute bottom-0 right-0 opacity-[0.15] pointer-events-none">
      <ellipse cx="150" cy="130" rx="45" ry="22" transform="rotate(-25 150 130)" fill="#b5c9a0" />
      <ellipse cx="175" cy="155" rx="38" ry="18" transform="rotate(18 175 155)" fill="#8fad78" />
      <ellipse cx="130" cy="165" rx="32" ry="15" transform="rotate(-55 130 165)" fill="#b5c9a0" />
      <ellipse cx="165" cy="185" rx="35" ry="16" transform="rotate(38 165 185)" fill="#73956b" />
      <circle cx="190" cy="110" r="14" fill="#d4847c" />
      <circle cx="200" cy="124" r="9" fill="#e8a09a" />
      <circle cx="178" cy="100" r="11" fill="#d4847c" />
      <path d="M110 200 Q138 155 170 130" stroke="#73956b" strokeWidth="2" fill="none" />
    </svg>
  );
}

function TopFloral() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none"
      className="absolute top-0 left-0 opacity-[0.12] pointer-events-none">
      <ellipse cx="35" cy="55" rx="35" ry="16" transform="rotate(30 35 55)" fill="#b5c9a0" />
      <ellipse cx="15" cy="70" rx="28" ry="13" transform="rotate(-20 15 70)" fill="#8fad78" />
      <circle cx="12" cy="32" r="12" fill="#d4847c" />
      <circle cx="2" cy="44" r="8" fill="#e8a09a" />
      <path d="M0 0 Q28 45 55 72" stroke="#73956b" strokeWidth="2" fill="none" />
    </svg>
  );
}

const inputStyle = {
  width: "100%",
  background: "#FAF7F2",
  border: "1.5px solid #E8DDD0",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  color: "#3B2F2F",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.9375rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function Input({ type = "text", placeholder, value, onChange, autoFocus, hasError, autoComplete }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      style={{ ...inputStyle, borderColor: hasError ? "#e87070" : "#E8DDD0" }}
      onFocus={(e) => {
        e.target.style.borderColor = "#C17D74";
        e.target.style.boxShadow = "0 0 0 3px rgba(193,125,116,0.12)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = hasError ? "#e87070" : "#E8DDD0";
        e.target.style.boxShadow = "none";
      }}
    />
  );
}

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError("");
  };

  const switchMode = (m) => {
    setMode(m);
    setForm({ username: "", password: "", confirmPassword: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = form;

    if (!username.trim()) return setError("Username is required.");
    if (username.trim().length < 3) return setError("Username must be at least 3 characters.");
    if (!password) return setError("Password is required.");

    if (mode === "signup") {
      if (password.length < 6) return setError("Password must be at least 6 characters.");
      if (password !== confirmPassword) return setError("Passwords don't match.");
    }

    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const result = await createAccount(username.trim(), password);
        if (!result.success) {
          setError(result.error);
          setLoading(false);
          return;
        }
        onLogin(username.trim());
      } else {
        const result = await verifyLogin(username.trim(), password);
        if (!result.success) {
          setError(result.error);
          setLoading(false);
          return;
        }
        onLogin(result.displayName);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(232,221,208,0.8)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(193,125,116,0.1)",
          }}
        >
          <BotanicalCorner />

          <div className="relative z-10">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🌸</div>
              <h1 className="font-display text-3xl font-bold" style={{ color: "#3B2F2F" }}>
                StudyBloom
              </h1>
              <p className="font-body text-sm mt-1" style={{ color: "#8B7265" }}>
                Your personal study sanctuary
              </p>
            </div>

            {/* Tab switcher */}
            <div
              className="flex rounded-xl p-1 mb-6"
              style={{ background: "#F4EEE5" }}
            >
              {["signin", "signup"].map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className="flex-1 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200"
                  style={{
                    background: mode === m ? "#FFFFFF" : "transparent",
                    color: mode === m ? "#3B2F2F" : "#8B7265",
                    boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {m === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: "#8B7265" }}>
                  Username
                </label>
                <Input
                  placeholder={mode === "signup" ? "Choose a unique username" : "Enter your username"}
                  value={form.username}
                  onChange={set("username")}
                  autoFocus
                  autoComplete="username"
                  hasError={!!error && error.toLowerCase().includes("username")}
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: "#8B7265" }}>
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === "signup" ? "Create a password (min 6 chars)" : "Enter your password"}
                    value={form.password}
                    onChange={set("password")}
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    hasError={!!error && (error.toLowerCase().includes("password") || error.toLowerCase().includes("incorrect"))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={{
                      position: "absolute", right: "0.75rem", top: "50%",
                      transform: "translateY(-50%)", background: "none",
                      border: "none", cursor: "pointer", color: "#8B7265",
                      fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif",
                      padding: "0.25rem",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-widest mb-1.5"
                    style={{ color: "#8B7265" }}>
                    Confirm Password
                  </label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                    autoComplete="new-password"
                    hasError={!!error && error.toLowerCase().includes("match")}
                  />
                </div>
              )}

              {error && (
                <div
                  className="flex items-start gap-2 rounded-xl p-3"
                  style={{ background: "#FEF0EE", border: "1px solid #FACAC3" }}
                >
                  <span style={{ fontSize: "0.875rem" }}>⚠️</span>
                  <p className="font-body text-sm" style={{ color: "#C0392B" }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "#D4A09A" : "#C17D74",
                  color: "white",
                  border: "none",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s, transform 0.1s, box-shadow 0.2s",
                  boxShadow: "0 4px 12px rgba(193,125,116,0.25)",
                  marginTop: "0.5rem",
                }}
                onMouseEnter={(e) => { if (!loading) e.target.style.background = "#9E5E57"; }}
                onMouseLeave={(e) => { if (!loading) e.target.style.background = "#C17D74"; }}
              >
                {loading
                  ? "Please wait…"
                  : mode === "signin"
                  ? "Sign In →"
                  : "Create My Account →"}
              </button>
            </form>

            <p className="text-center font-body text-xs mt-5" style={{ color: "#8B7265", lineHeight: "1.6" }}>
              {mode === "signin"
                ? <>Don't have an account?{" "}
                    <button onClick={() => switchMode("signup")}
                      style={{ color: "#C17D74", background: "none", border: "none",
                        cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem" }}>
                      Create one free
                    </button>
                  </>
                : <>Already have an account?{" "}
                    <button onClick={() => switchMode("signin")}
                      style={{ color: "#C17D74", background: "none", border: "none",
                        cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem" }}>
                      Sign in
                    </button>
                  </>
              }
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-0 right-0 text-center font-body text-xs"
        style={{ color: "#C4B4AA" }}>
        StudyBloom — bloom where you study 🌸
      </div>
    </div>
  );
}
