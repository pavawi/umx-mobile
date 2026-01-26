import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.scss';

// 太阳图标
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// 月亮图标
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// 系统图标
function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const themeLabels = {
  light: '浅色',
  dark: '深色',
  system: '跟随系统',
};

export default function ThemeToggle({ variant = 'icon' }) {
  const { theme, toggleTheme, setTheme, isDark } = useTheme();

  const renderIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon />;
      case 'dark':
        return <MoonIcon />;
      default:
        return <SystemIcon />;
    }
  };

  // 图标按钮模式
  if (variant === 'icon') {
    return (
      <button
        className="theme-toggle theme-toggle--icon"
        onClick={toggleTheme}
        aria-label={`切换主题，当前: ${themeLabels[theme]}`}
        title={themeLabels[theme]}
      >
        {renderIcon()}
      </button>
    );
  }

  // 分段选择器模式
  if (variant === 'segmented') {
    return (
      <div className="theme-toggle theme-toggle--segmented">
        <button
          className={`segment ${theme === 'light' ? 'is-active' : ''}`}
          onClick={() => setTheme('light')}
        >
          <SunIcon />
          <span>浅色</span>
        </button>
        <button
          className={`segment ${theme === 'dark' ? 'is-active' : ''}`}
          onClick={() => setTheme('dark')}
        >
          <MoonIcon />
          <span>深色</span>
        </button>
        <button
          className={`segment ${theme === 'system' ? 'is-active' : ''}`}
          onClick={() => setTheme('system')}
        >
          <SystemIcon />
          <span>自动</span>
        </button>
      </div>
    );
  }

  // 列表项模式（用于设置页）
  return (
    <div className="theme-toggle theme-toggle--list">
      <span className="label">主题模式</span>
      <div className="options">
        {['light', 'dark', 'system'].map((mode) => (
          <button
            key={mode}
            className={`option ${theme === mode ? 'is-active' : ''}`}
            onClick={() => setTheme(mode)}
          >
            {mode === 'light' && <SunIcon />}
            {mode === 'dark' && <MoonIcon />}
            {mode === 'system' && <SystemIcon />}
            <span>{themeLabels[mode]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
