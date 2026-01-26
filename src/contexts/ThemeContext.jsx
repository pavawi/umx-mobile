import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// 主题类型: 'light' | 'dark' | 'system'
const THEME_KEY = 'umx-theme-preference';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 优先读取本地存储
    const saved = localStorage.getItem(THEME_KEY);
    return saved || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState('light');

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
  }, [theme]);

  // 应用主题到 DOM
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }

    // 同时更新 meta theme-color 适配移动端状态栏
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#1F2937' : '#FFFFFF'
      );
    }
  }, [theme, resolvedTheme]);

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const setThemeMode = (mode) => {
    if (['light', 'dark', 'system'].includes(mode)) {
      setTheme(mode);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,           // 用户选择的主题 ('light' | 'dark' | 'system')
        resolvedTheme,   // 实际应用的主题 ('light' | 'dark')
        toggleTheme,     // 切换主题
        setTheme: setThemeMode, // 设置指定主题
        isDark: resolvedTheme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
