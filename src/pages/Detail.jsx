import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { hotCollections, marketCollections, homeCollections } from '../mock/data';
import { IconBack, IconHeart, IconShare, IconCopy, IconCheck, IconBlockchain } from '../components/base/Icons';
import './Detail.scss';

// 图片比例映射
const ratioClassMap = {
  '1:1': 'ratio-1-1',
  '3:4': 'ratio-3-4',
  '4:3': 'ratio-4-3',
  '16:9': 'ratio-16-9',
};

const statusTextMap = {
  selling: '首发在售',
  presale: '预售中',
  soldout: '已售罄'
};

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // 从 location.state 获取传递的数据，或从 mock 数据中查找
  let item = location.state?.item;

  if (!item) {
    // 尝试从所有数据源中查找
    item = hotCollections.find(c => c.id === id) ||
           marketCollections.find(c => c.id === id) ||
           homeCollections.find(c => c.id === id);
  }

  if (!item) {
    return (
      <div className="detail-page">
        <div className="detail-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <IconBack size={20} />
          </button>
          <h1 className="header-title">藏品详情</h1>
          <div className="header-placeholder"></div>
        </div>
        <div className="detail-empty">
          <p>藏品未找到</p>
          <button onClick={() => navigate(-1)}>返回</button>
        </div>
      </div>
    );
  }

  const ratioClass = ratioClassMap[item.imageRatio] || 'ratio-1-1';

  const handleCopyAddress = async () => {
    if (item.contractAddress) {
      try {
        await navigator.clipboard.writeText(item.contractAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  return (
    <div className="detail-page">
      {/* 顶部导航栏 */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IconBack size={20} />
        </button>
        <h1 className="header-title">藏品详情</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* 主内容区 */}
      <div className="detail-content">
        {/* 艺术品展示区 - Gallery风格 */}
        <div className="artwork-showcase">
          <div className="artwork-frame">
            <div className={`detail-image-wrapper ${ratioClass}`}>
              <img src={item.image} alt={item.name} className="detail-image" />
            </div>
          </div>
          {/* 标签浮层 */}
          <div className="artwork-badges">
            {item.status && (
              <div className={`detail-status status--${item.status}`}>
                {statusTextMap[item.status] || ''}
              </div>
            )}
            {item.type && (
              <div className="detail-type-badge">{item.type}</div>
            )}
          </div>
          {/* 展品信息栏 */}
          <div className="artwork-info-bar">
            <div className="info-item">
              <span className="info-label">比例</span>
              <span className="info-value">{item.imageRatio || '1:1'}</span>
            </div>
            {item.creator && (
              <div className="info-item">
                <span className="info-label">创作者</span>
                <span className="info-value">{item.creator}</span>
              </div>
            )}
            {item.issueCount && (
              <div className="info-item">
                <span className="info-label">限量</span>
                <span className="info-value">{item.issueCount}份</span>
              </div>
            )}
          </div>
        </div>

        {/* 藏品基本信息 */}
        <div className="detail-info">
          <h2 className="detail-name">{item.name}</h2>

          {/* 创作者信息 */}
          {item.creator && (
            <div className="detail-creator">
              {item.creatorAvatar && (
                <img src={item.creatorAvatar} alt={item.creator} className="creator-avatar" />
              )}
              <span className="creator-name">{item.creator}</span>
              <span className="creator-label">创作者</span>
            </div>
          )}

          {/* 价格信息 */}
          <div className="detail-price-section">
            <div className="price-row">
              <span className="price-label">价格</span>
              <span className="price-value">¥{item.price || '---'}</span>
            </div>
            {item.issueCount && (
              <div className="info-row">
                <span className="info-label">发行份数</span>
                <span className="info-value">{item.issueCount}份</span>
              </div>
            )}
            {item.total && (
              <div className="info-row">
                <span className="info-label">限量</span>
                <span className="info-value">{item.total}份</span>
              </div>
            )}
            {item.onSale !== undefined && (
              <div className="info-row">
                <span className="info-label">在售/流通</span>
                <span className="info-value">{item.onSale}/{item.total}</span>
              </div>
            )}
          </div>
        </div>

        {/* 藏品描述 */}
        {item.description && (
          <div className="detail-section">
            <h3 className="section-title">藏品介绍</h3>
            <p className="detail-description">{item.description}</p>
          </div>
        )}

        {/* 区块链信息 */}
        <div className="detail-section">
          <h3 className="section-title">
            <IconBlockchain size={16} color="var(--color-primary)" />
            <span>链上信息</span>
          </h3>
          <div className="blockchain-info">
            {item.blockchain && (
              <div className="blockchain-row">
                <span className="blockchain-label">区块链</span>
                <span className="blockchain-value">
                  <span className="chain-tag">{item.blockchain}</span>
                </span>
              </div>
            )}
            {item.contractAddress && (
              <div className="blockchain-row">
                <span className="blockchain-label">合约地址</span>
                <div className="address-wrapper">
                  <span className="blockchain-value address">{formatAddress(item.contractAddress)}</span>
                  <button className="copy-btn" onClick={handleCopyAddress}>
                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                    <span>{copied ? '已复制' : '复制'}</span>
                  </button>
                </div>
              </div>
            )}
            {item.tokenId && (
              <div className="blockchain-row">
                <span className="blockchain-label">Token ID</span>
                <span className="token-id">#{item.tokenId}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 底部操作栏 */}
      <div className="detail-footer">
        <button className="action-btn secondary">
          <IconHeart size={18} />
          <span>收藏</span>
        </button>
        <button className="action-btn secondary">
          <IconShare size={18} />
          <span>分享</span>
        </button>
        <button
          className={`action-btn primary ${item.status === 'soldout' ? 'disabled' : ''}`}
          disabled={item.status === 'soldout'}
        >
          {item.status === 'soldout' ? '已售罄' : item.status === 'presale' ? '预约购买' : '立即购买'}
        </button>
      </div>
    </div>
  );
}
