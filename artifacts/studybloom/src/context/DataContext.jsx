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

export function DataProvider({ children }) {
  const [subjects, setSubjects] = useLocalStorage("studybloom-subjects", []);
  const [todos, setTodos] = useLocalStorage("studybloom-todos", []);
  const [timetable, setTimetable] = useLocalStorage("studybloom-timetable", {});
  const [moods, setMoods] = useLocalStorage("studybloom-moods", []);
  const [pomodoroStats, setPomodoroStats] = useLocalStorage("studybloom-pomodoro", {
    sessionsToday: 0,
    totalSessions: 0,
    lastDate: null,
  });

  return (
    <DataContext.Provider
      value={{
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
