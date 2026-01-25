import BlockchainInfo from '../components/business/BlockchainInfo';
import { userInfo, profileMenus } from '../mock/data';
import './Profile.scss';

export default function Profile() {
  return (
    <div className="page-container profile-page">
      {/* 区块链信息卡片 - 替代原虚拟人展示 🆕 */}
      <BlockchainInfo
        user={userInfo}
        onSettings={() => console.log('Settings clicked')}
      />

      {/* 圆域积分土地兑换 */}
      <div className="feature-banner">
        <div className="banner-content">
          <span className="banner-icon">🌍</span>
          <span className="banner-text">圆域积分土地兑换</span>
        </div>
        <div className="banner-action">
          前往
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </div>
      </div>

      {/* 功能菜单 */}
      {profileMenus.map((group, groupIndex) => (
        <div key={groupIndex} className="menu-group">
          {group.title && <div className="group-title">{group.title}</div>}
          <div className="menu-grid">
            {group.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="menu-item"
                onClick={() => console.log('Menu clicked:', item.path)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
