import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function DataProvider({ children, username }) {
  // All keys are namespaced by username — each person gets their own data
  const prefix = `studybloom-${username}`;

  const [subjects, setSubjects] = useLocalStorage(`${prefix}-subjects`, []);
  const [todos, setTodos] = useLocalStorage(`${prefix}-todos`, []);
  const [timetable, setTimetable] = useLocalStorage(`${prefix}-timetable`, {});
  const [moods, setMoods] = useLocalStorage(`${prefix}-moods`, []);
  const [pomodoroStats, setPomodoroStats] = useLocalStorage(`${prefix}-pomodoro`, {
    sessionsToday: 0,
    totalSessions: 0,
    lastDate: null,
  });

  return (
    <DataContext.Provider
      value={{
        username,
        subjects, setSubjects,
        todos, setTodos,
        timetable, setTimetable,
        moods, setMoods,
        pomodoroStats, setPomodoroStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
