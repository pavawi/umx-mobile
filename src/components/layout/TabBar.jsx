import { useLocation, useNavigate } from 'react-router-dom';
import './TabBar.scss';

// 使用设计系统变量中的颜色
const PRIMARY_COLOR = '#D4AF37'; // var(--color-primary)
const INACTIVE_COLOR = '#9CA3AF'; // var(--color-text-tertiary)

const tabs = [
  {
    path: '/',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path fill={active ? PRIMARY_COLOR : INACTIVE_COLOR} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    label: '首页'
  },
  {
    path: '/hot',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path fill={active ? PRIMARY_COLOR : INACTIVE_COLOR} d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
      </svg>
    ),
    label: '热卖'
  },
  {
    path: '/market',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path fill={active ? PRIMARY_COLOR : INACTIVE_COLOR} d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
      </svg>
    ),
    label: '藏品库'
  },
  {
    path: '/profile',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path fill={active ? PRIMARY_COLOR : INACTIVE_COLOR} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
            {tab.icon(active)}
            <span>{tab.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
