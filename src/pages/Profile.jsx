import { useState } from 'react';
import { userInfo } from '../mock/data';
import './Profile.scss';

// 菜单配置 - 匹配设计稿
const menuGroups = [
  {
    id: 'group1',
    items: [
      { icon: 'wallet', label: '钱包', color: '#D4AF37', path: '/wallet' },
      { icon: 'history', label: '交易历史', color: '#6366F1', path: '/history' },
      { icon: 'layers', label: '出售签发', color: '#10B981', path: '/sell' },
      { icon: 'chart', label: '资产记录', color: '#0EA5E9', path: '/assets' },
    ],
  },
  {
    id: 'group2',
    items: [
      { icon: 'bookmark', label: '我的藏品', color: '#F97316', path: '/collections' },
      { icon: 'badge', label: 'UMX资质', color: '#D4AF37', path: '/qualification' },
      { icon: 'phone', label: '联系我们', color: '#A855F7', path: '/contact' },
      { icon: 'bell', label: '官方公告', color: '#EF4444', path: '/announcement' },
    ],
  },
  {
    id: 'group3',
    items: [
      { icon: 'globe', label: '社区', color: '#22C55E', path: '/community' },
      { icon: 'world', label: '圆域', color: '#3B82F6', path: '/yuanyu' },
      { icon: 'settings', label: '设置', color: '#6B7280', path: '/settings' },
    ],
  },
];

// Material 风格图标
const MenuIcon = ({ name, color }) => {
  const icons = {
    wallet: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    history: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>
      </svg>
    ),
    bookmark: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
      </svg>
    ),
    badge: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M17 10.43V2H7v8.43c0 .35.18.68.49.86l4.18 2.51-.99 2.34-3.41.29 2.59 2.24L9.07 22 12 20.23 14.93 22l-.79-3.33 2.59-2.24-3.41-.29-.99-2.34 4.18-2.51c.31-.18.49-.51.49-.86z"/>
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    world: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill={color}>
        <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

export default function Profile() {
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const formatAddress = (address) => {
    if (!address) return '';
    return `0x${address.slice(2, 10)}...${address.slice(-8)}`;
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'uid') {
        setCopiedUid(true);
        setTimeout(() => setCopiedUid(false), 2000);
      } else {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="page-container profile-page">
      {/* 用户卡片 - 匹配设计稿 */}
      <div className="user-card">
        {/* 用户头部 */}
        <div className="user-header">
          <div className="avatar-wrapper">
            <img src={userInfo.avatar} alt={userInfo.nickname} className="avatar" />
          </div>
          <div className="user-meta">
            <div className="name-row">
              <span className="user-name">{userInfo.nickname}</span>
              {userInfo.verified && (
                <span className="verified-badge">已实名授权</span>
              )}
            </div>
            <div className="uid-row">
              <span className="uid-text">UID: {userInfo.uid}</span>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(userInfo.uid, 'uid')}
              >
                {copiedUid ? (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 数字身份地址 */}
        <div className="chain-address">
          <div className="address-row">
            <span className="address-text">数字身份：{formatAddress(userInfo.chainAddress)}</span>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(userInfo.chainAddress, 'address')}
            >
              {copiedAddress ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 资产估值 */}
        <div className="asset-section">
          <div className="asset-header">
            <span className="asset-label">资产估值</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#9CA3AF">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
          <div className="asset-value">
            <span className="currency">¥</span>
            <span className="amount">{formatAmount(userInfo.assetValue)}</span>
          </div>
        </div>
      </div>

      {/* 邀请好友卡片 */}
      <div className="invite-card">
        <div className="invite-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#FFFFFF">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
          </svg>
        </div>
        <div className="invite-text">
          <span className="invite-title">邀请好友得奖励</span>
          <span className="invite-desc">每邀请1位好友可获得 50 U贝</span>
        </div>
        <button className="invite-btn">立即邀请</button>
      </div>

      {/* 功能菜单组 */}
      {menuGroups.map((group) => (
        <div key={group.id} className="menu-group">
          <div className="menu-grid">
            {group.items.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={() => console.log('Menu clicked:', item.path)}
              >
                <div className="icon-wrap">
                  <MenuIcon name={item.icon} color={item.color} />
                </div>
                <span className="menu-label">{item.label}</span>
              </div>
            ))}
            {/* 填充空白占位 */}
            {group.items.length < 4 && Array(4 - group.items.length).fill(null).map((_, i) => (
              <div key={`placeholder-${i}`} className="menu-item placeholder" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
