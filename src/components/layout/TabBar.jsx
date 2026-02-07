import { useLocation, useNavigate } from 'react-router-dom';
import './TabBar.scss';

// Material Symbols Rounded 风格图标 - 使用 currentColor 继承 CSS 颜色
const tabs = [
  {
    path: '/',
    icon: () => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z"/>
      </svg>
    ),
    label: '首页'
  },
  {
    path: '/market',
    icon: () => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/>
      </svg>
    ),
    label: '市场'
  },
  {
    path: '/profile',
    icon: () => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
    label: '个人中心'
  }
];

export default function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        return (
          <div
            key={tab.path}
            className={`tab-bar__item ${active ? 'is-active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.icon()}
            <span>{tab.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
