import './ActivitySection.scss';

// 活动图标配置 - 匹配设计稿颜色
const iconConfig = {
  competition: { color: '#D4AF37', icon: 'star' },      // 金色星星
  treasure: { color: '#F59E0B', icon: 'compass' },      // 橙色指南针
  chest: { color: '#3B82F6', icon: 'box' },             // 蓝色宝箱
  pearl: { color: '#EC4899', icon: 'gem' },             // 粉色宝石
  library: { color: '#8B5CF6', icon: 'grid' },          // 紫色网格
  upool: { color: '#D4AF37', icon: 'u', isText: true }, // 金色U字
};

// Lucide 风格图标
function ActivityIcon({ type }) {
  const config = iconConfig[type] || iconConfig.treasure;

  if (config.isText) {
    return <span className="activity-icon__text" style={{ color: config.color }}>U</span>;
  }

  const icons = {
    star: (
      <svg viewBox="0 0 24 24" fill={config.color} stroke="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    compass: (
      <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={config.color}/>
      </svg>
    ),
    box: (
      <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    gem: (
      <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="6 3 18 3 22 9 12 22 2 9 6 3"/>
        <line x1="12" y1="22" x2="12" y2="9"/>
        <line x1="2" y1="9" x2="22" y2="9"/>
        <line x1="6" y1="3" x2="10" y2="9"/>
        <line x1="18" y1="3" x2="14" y2="9"/>
      </svg>
    ),
    grid: (
      <svg viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  };

  return icons[config.icon] || icons.compass;
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
            className="activity-item"
            onClick={() => handleClick(item)}
          >
            <div className="activity-card">
              {item.status === 'ended' && (
                <span className="activity-badge">{item.statusText || '已结束'}</span>
              )}
              <div className="activity-icon">
                <ActivityIcon type={item.type} />
              </div>
            </div>
            <span className="activity-title">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
