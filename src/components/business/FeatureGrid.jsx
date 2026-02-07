import { useNavigate } from 'react-router-dom';
import './FeatureGrid.scss';

const iconMap = {
  market: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
      <path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"/>
    </svg>
  ),
  pearl: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
    </svg>
  ),
  chest: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  upool: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
      <circle cx="12" cy="12" r="10"/>
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">U</text>
    </svg>
  ),
  library: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
      <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
    </svg>
  ),
  artrace: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
  ),
  community: (color) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),
};

export default function FeatureGrid({ items = [], onItemClick }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else if (item.link) {
      navigate(item.link);
    }
  };

  if (!items.length) return null;

  return (
    <div className="feature-grid">
      <div className="feature-grid__scroll">
        {items.map((item) => (
          <div
            key={item.id}
            className="feature-grid__item"
            onClick={() => handleClick(item)}
          >
            <div className="item-icon" style={{ background: `${item.color}15` }}>
              {iconMap[item.icon]?.(item.color) || iconMap.market(item.color)}
              {item.hasNew && <span className="new-dot" />}
            </div>
            <span className="item-title">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
