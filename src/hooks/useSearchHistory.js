import { useState, useCallback } from 'react';

const STORAGE_KEY = 'umx_search_history';
const MAX_HISTORY = 10;

function getStoredHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // localStorage 不可用时静默失败
  }
}

export default function useSearchHistory(initialHistory = []) {
  const [history, setHistory] = useState(() => {
    const stored = getStoredHistory();
    return stored.length > 0 ? stored : initialHistory;
  });

  const addHistory = useCallback((keyword) => {
    if (!keyword?.trim()) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== keyword);
      const newHistory = [keyword, ...filtered].slice(0, MAX_HISTORY);
      setStoredHistory(newHistory);
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setStoredHistory([]);
  }, []);

  const removeHistoryItem = useCallback((keyword) => {
    setHistory((prev) => {
      const newHistory = prev.filter((item) => item !== keyword);
      setStoredHistory(newHistory);
      return newHistory;
    });
  }, []);

  return {
    history,
    addHistory,
    clearHistory,
    removeHistoryItem,
  };
}
