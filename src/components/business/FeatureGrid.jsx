import { useNavigate } from 'react-router-dom';
import './FeatureGrid.scss';

/**
 * 运营推荐位 - 2x2宫格布局
 * 用于展示热门推荐、活动入口、U卡/U豆售卖等运营位
 */
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
      {/* 左侧大图 */}
      <div
        className="feature-grid__main"
        onClick={() => handleClick(items[0])}
      >
        <img src={items[0].image} alt={items[0].title} />
        {items[0].badge && <span className="badge">{items[0].badge}</span>}
        <div className="overlay">
          <span className="title">{items[0].title}</span>
          {items[0].subtitle && <span className="subtitle">{items[0].subtitle}</span>}
        </div>
      </div>

      {/* 右侧入口列表 */}
      <div className="feature-grid__side">
        {items.slice(1, 4).map((item) => (
          <div
            key={item.id}
            className="feature-item"
            onClick={() => handleClick(item)}
          >
            <div className="item-icon" style={{ background: item.iconBg || '#F5F5F5' }}>
              {item.icon ? (
                typeof item.icon === 'string' ? (
                  <img src={item.icon} alt="" />
                ) : (
                  item.icon
                )
              ) : item.image ? (
                <img src={item.image} alt="" className="icon-img" />
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              )}
            </div>
            <div className="item-info">
              <span className="item-title">{item.title}</span>
              {item.subtitle && <span className="item-subtitle">{item.subtitle}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
