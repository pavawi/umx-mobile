import { useLocation, useNavigate } from 'react-router-dom';
import './TabBar.scss';

const PRIMARY_COLOR = '#D4AF37';
const INACTIVE_COLOR = '#9CA3AF';

const tabs = [
  {
    path: '/',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={active ? PRIMARY_COLOR : INACTIVE_COLOR}>
        <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z"/>
      </svg>
    ),
    label: '首页'
  },
  {
    path: '/discover',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={active ? PRIMARY_COLOR : INACTIVE_COLOR}>
        <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/>
      </svg>
    ),
    label: '发现'
  },
  {
    path: '/market',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={active ? PRIMARY_COLOR : INACTIVE_COLOR}>
        <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
      </svg>
    ),
    label: '市场'
  },
  {
    path: '/profile',
    icon: (active) => (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={active ? PRIMARY_COLOR : INACTIVE_COLOR}>
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
            {tab.icon(active)}
            <span style={{ color: active ? PRIMARY_COLOR : INACTIVE_COLOR }}>{tab.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
