import './ActivitySection.scss';

// 活动图标组件
function ActivityIcon({ type }) {
  const icons = {
    competition: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
      </svg>
    ),
    treasure: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" fill="currentColor"/>
        <path d="M12 3L8 7H16L12 3Z" fill="currentColor"/>
        <circle cx="12" cy="14" r="3" fill="white" opacity="0.5"/>
      </svg>
    ),
    chest: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="12" rx="2" fill="currentColor"/>
        <path d="M3 10H21V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V10Z" fill="currentColor" opacity="0.7"/>
        <circle cx="12" cy="14" r="2" fill="white" opacity="0.5"/>
      </svg>
    ),
    pearl: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" fill="currentColor"/>
        <circle cx="10" cy="10" r="2" fill="white" opacity="0.5"/>
      </svg>
    ),
    library: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6H20V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6Z" fill="currentColor"/>
        <path d="M4 6V4C4 2.9 4.9 2 6 2H18C19.1 2 20 2.9 20 4V6H4Z" fill="currentColor" opacity="0.7"/>
        <rect x="7" y="9" width="4" height="6" rx="1" fill="white" opacity="0.5"/>
        <rect x="13" y="9" width="4" height="6" rx="1" fill="white" opacity="0.5"/>
      </svg>
    ),
    upool: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="currentColor"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">U</text>
      </svg>
    ),
  };

  return icons[type] || icons.treasure;
}

export default function ActivitySection({ items = [], onItemClick }) {
  if (!items.length) return null;

  const handleClick = (item) => {
    onItemClick?.(item);
  };

  return (
    <div className="activity-section">
      <div className="activity-scroll">
        {items.map((item) => (
          <div
            key={item.id}
            className={`activity-card activity-card--${item.type}`}
            onClick={() => handleClick(item)}
          >
            {item.status === 'ended' && (
              <span className="activity-badge">{item.statusText || '已结束'}</span>
            )}
            <div className="activity-icon">
              <ActivityIcon type={item.type} />
            </div>
            <span className="activity-title">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
