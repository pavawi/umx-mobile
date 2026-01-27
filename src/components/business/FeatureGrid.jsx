import { useNavigate } from 'react-router-dom';
import './FeatureGrid.scss';

// 图标组件
const IconStore = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M4 7h16v2H4V7zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
    <path d="M2 4h20v3H2V4zm0 17h20v-3H2v3z"/>
  </svg>
);

const IconTrending = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const defaultIcons = [IconStore, IconTrending, IconUsers];
const defaultGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
];

/**
 * 运营推荐位 - 左侧大卡 + 右侧三小卡布局
 * 匹配设计稿样式
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

  const mainItem = items[0];
  const sideItems = items.slice(1, 4);

  return (
    <div className="feature-grid">
      {/* 左侧大卡 - 纯色渐变背景 */}
      <div
        className="feature-grid__main"
        onClick={() => handleClick(mainItem)}
        style={{ background: mainItem.bgGradient || 'linear-gradient(135deg, #2D1B4E 0%, #1a1a2e 100%)' }}
      >
        {mainItem.badge && (
          <span className="badge">{mainItem.badge}</span>
        )}
        <div className="main-content">
          <span className="title">{mainItem.title}</span>
          {mainItem.subtitle && <span className="subtitle">{mainItem.subtitle}</span>}
        </div>
      </div>

      {/* 右侧入口列表 */}
      <div className="feature-grid__side">
        {sideItems.map((item, index) => {
          const IconComponent = defaultIcons[index] || IconStore;
          const gradient = item.iconBg || defaultGradients[index];

          return (
            <div
              key={item.id}
              className="feature-item"
              onClick={() => handleClick(item)}
            >
              <div className="item-icon" style={{ background: gradient }}>
                {item.icon ? (
                  typeof item.icon === 'string' ? (
                    <img src={item.icon} alt="" />
                  ) : (
                    item.icon
                  )
                ) : (
                  <IconComponent />
                )}
              </div>
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                {item.subtitle && <span className="item-subtitle">{item.subtitle}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
