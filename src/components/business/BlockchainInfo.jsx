import { useState } from 'react';
import './BlockchainInfo.scss';

export default function BlockchainInfo({ user, onSettings }) {
  const [copied, setCopied] = useState(false);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(user.chainAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="blockchain-info">
      {/* 用户基本信息 */}
      <div className="user-header">
        <img src={user.avatar} alt={user.nickname} className="user-avatar" />
        <div className="user-meta">
          <div className="user-name">
            {user.nickname}
            {user.verified && <span className="verified-badge">已实名授权</span>}
          </div>
          <div className="user-id">UID: {user.uid}</div>
        </div>
        <button className="btn-settings" onClick={onSettings}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </button>
      </div>

      {/* 区块链地址 */}
      <div className="chain-address">
        <div className="address-label">
          <span className="chain-logo">BSN</span>
          <span>BSN链地址</span>
        </div>
        <div className="address-value">
          <span className="address">{formatAddress(user.chainAddress)}</span>
          <button className="btn-copy" onClick={copyAddress}>
            {copied ? (
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 资产估值 */}
      <div className="asset-valuation">
        <div className="valuation-header">
          <span className="label">资产估值</span>
          <span className="hint">
            <svg viewBox="0 0 24 24" width="12" height="12">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            计算说明
          </span>
        </div>
        <div className="valuation-value">
          <span className="currency">¥</span>
          <span className="amount">{formatAmount(user.assetValue)}</span>
        </div>
        <div className="valuation-detail">
          <span>藏品 {user.collectionCount} 件</span>
          <span className="divider">|</span>
          <span>退市 {user.delistedCount} 件</span>
        </div>
      </div>
    </div>
  );
}
