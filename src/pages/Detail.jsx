import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { hotCollections, marketCollections, homeCollections, tradingNotices } from '../mock/data';
import { IconBack, IconShare, IconChevronDown, IconChevronUp } from '../components/base/Icons';
import './Detail.scss';

// 图片比例映射
const ratioClassMap = {
  '1:1': 'ratio-1-1',
  '3:4': 'ratio-3-4',
  '4:3': 'ratio-4-3',
  '16:9': 'ratio-16-9',
};

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('detail');
  const [descExpanded, setDescExpanded] = useState(false);
  const [noticeExpanded, setNoticeExpanded] = useState(false);

  // 从 location.state 获取传递的数据，或从 mock 数据中查找
  let item = location.state?.item;

  if (!item) {
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
  const isDirectSale = item.saleType === 'direct';
  const isSoldOut = item.status === 'soldout';
  const isEnded = item.status === 'ended';

  const getButtonText = () => {
    if (isSoldOut || isEnded) return '兑换结束';
    if (isDirectSale) return '立即购买';
    return '立即兑换';
  };

  return (
    <div className="detail-page">
      {/* 顶部导航栏 */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IconBack size={20} />
        </button>
        <h1 className="header-title">{item.name}</h1>
        <div className="header-placeholder"></div>
      </div>

      {/* Tab导航 */}
      <div className="detail-tabs">
        <button
          className={`tab-item ${activeTab === 'detail' ? 'active' : ''}`}
          onClick={() => setActiveTab('detail')}
        >
          作品详情
        </button>
        <button
          className={`tab-item ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => setActiveTab('notice')}
        >
          作品公告
        </button>
      </div>

      {/* 主内容区 */}
      <div className="detail-content">
        {activeTab === 'detail' ? (
          <>
            {/* 藏品图片 */}
            <div className={`detail-image-wrapper ${ratioClass}`}>
              <img src={item.image} alt={item.name} className="detail-image" />
              <div className="watermark">
                <span className="watermark-icon">©</span>
                <span>umx.art</span>
              </div>
            </div>

            {/* VIP版税惠品标签 */}
            {item.vipRoyalty && (
              <div className="vip-tag">VIP版税惠品</div>
            )}

            {/* 标题区域 */}
            <div className="detail-title-section">
              <div className="title-row">
                <span className={`type-badge ${isDirectSale ? 'direct' : 'compose'}`}>
                  {item.typeLabel || item.type}
                </span>
                <h2 className="detail-name">{item.name}</h2>
                <button className="share-btn">
                  <IconShare size={20} />
                </button>
              </div>

              {/* 价格 - 仅直卖显示 */}
              {isDirectSale && item.price && (
                <div className="price-display">
                  ¥{item.price.toFixed(2)}
                </div>
              )}

              {/* 创作者和发行方 */}
              <div className="creator-info">
                <div className="info-row">
                  <span className="label">创作者：</span>
                  <span className="value">{item.creator}</span>
                </div>
                <div className="info-row">
                  <span className="label">发行方：</span>
                  <span className="value highlight">{item.issuer || '热卖专区'}</span>
                </div>
              </div>
            </div>

            {/* 区块链信息卡片 */}
            <div className="blockchain-card">
              <div className="blockchain-row">
                <span className="blockchain-label">合约地址</span>
                <span className="blockchain-value address">{item.contractAddress}</span>
              </div>
              <div className="blockchain-row">
                <span className="blockchain-label">
                  <span className="bsn-logo">BSN</span>
                </span>
                <span className="blockchain-value"></span>
              </div>
              <div className="blockchain-row">
                <span className="blockchain-label">版税比例</span>
                <span className="blockchain-value">{item.royaltyRate || '0%'}</span>
              </div>
              <div className="blockchain-row">
                <span className="blockchain-label">总发行量</span>
                <span className="blockchain-value">{item.issueCount}</span>
              </div>
              <div className="blockchain-row">
                <span className="blockchain-label">已售数量</span>
                <span className="blockchain-value">{item.soldCount || 0}</span>
              </div>
              <div className="blockchain-row">
                <span className="blockchain-label">开售时段</span>
                <span className="blockchain-value">{item.salePeriod || '---'}</span>
              </div>
            </div>

            {/* 前往寄售市场链接 */}
            {!isDirectSale && (
              <div className="market-link-wrapper">
                <a className="market-link" onClick={() => navigate('/market')}>
                  前往寄售市场
                </a>
              </div>
            )}

            {/* 作品详情描述 */}
            <div className="section-card">
              <div className="section-title">作品详情描述</div>
              <div className="section-divider"></div>
              <div className={`section-content ${descExpanded ? 'expanded' : ''}`}>
                <p className="description-text highlight">{item.description}</p>
              </div>
              {item.description && item.description.length > 50 && (
                <button
                  className="expand-btn"
                  onClick={() => setDescExpanded(!descExpanded)}
                >
                  {descExpanded ? '收起' : '查看更多'}
                  {descExpanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
                </button>
              )}
            </div>

            {/* 交易须知 */}
            <div className="section-card">
              <div className="section-title">交易须知</div>
              <div className="section-divider"></div>
              <div className={`section-content notice-content ${noticeExpanded ? 'expanded' : ''}`}>
                <ol className="notice-list">
                  {tradingNotices.map((notice, index) => (
                    <li key={index}>{notice}</li>
                  ))}
                </ol>
              </div>
              <button
                className="expand-btn"
                onClick={() => setNoticeExpanded(!noticeExpanded)}
              >
                {noticeExpanded ? '收起' : '查看更多'}
                {noticeExpanded ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
              </button>
            </div>
          </>
        ) : (
          <div className="notice-tab-content">
            <div className="empty-notice">
              <p>暂无公告</p>
            </div>
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      <div className="detail-footer">
        <button
          className={`action-btn primary ${isSoldOut || isEnded ? 'disabled' : ''}`}
          disabled={isSoldOut || isEnded}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
