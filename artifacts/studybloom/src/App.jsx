import { useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Syllabus from "./pages/Syllabus";
import Resources from "./pages/Resources";
import TodoList from "./pages/TodoList";
import Timetable from "./pages/Timetable";
import Pomodoro from "./pages/Pomodoro";
import MoodTracker from "./pages/MoodTracker";

function AppContent({ username, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, navigate] = useLocation();
  const [resourceSubject, setResourceSubject] = useState(null);

  const handleSubjectClick = (subject) => {
    setResourceSubject(subject);
    navigate("/resources");
  };

  return (
    <div className="min-h-screen bg-bg-color text-text-color transition-colors duration-300">
      <Navbar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        username={username}
        onLogout={onLogout}
      />
      <div className="flex">
        <Sidebar
          currentPath={location}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/syllabus">
              <Syllabus onSubjectClick={handleSubjectClick} />
            </Route>
            <Route path="/resources">
              <Resources
                initialSubject={resourceSubject}
                onClearSubject={() => setResourceSubject(null)}
              />
            </Route>
            <Route path="/todo" component={TodoList} />
            <Route path="/timetable" component={Timetable} />
            <Route path="/pomodoro" component={Pomodoro} />
            <Route path="/mood" component={MoodTracker} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  // Session-only login — cleared when the page is closed/refreshed
  const [username, setUsername] = useState(() => {
    return sessionStorage.getItem("studybloom-user") || null;
  });

  const handleLogin = (name) => {
    sessionStorage.setItem("studybloom-user", name);
    setUsername(name);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("studybloom-user");
    setUsername(null);
  };

  if (!username) {
    return (
      <ThemeProvider>
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <DataProvider username={username}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppContent username={username} onLogout={handleLogout} />
        </WouterRouter>
      </DataProvider>
    </ThemeProvider>
  );
}
