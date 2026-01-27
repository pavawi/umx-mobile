import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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

// 格式化价格
const formatPrice = (price) => {
  if (price === null || price === undefined) return null;
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// 格式化数量
const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('zh-CN').format(num);
};

// 复制到剪贴板
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const heroRef = useRef(null);

  // 从 URL 读取 tab 状态，默认为 detail
  const activeTab = searchParams.get('tab') || 'detail';
  const [descExpanded, setDescExpanded] = useState(false);
  const [noticeExpanded, setNoticeExpanded] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 从 location.state 获取传递的数据，或从 mock 数据中查找
  const item = useMemo(() => {
    if (location.state?.item) return location.state.item;
    return hotCollections.find(c => c.id === id) ||
           marketCollections.find(c => c.id === id) ||
           homeCollections.find(c => c.id === id);
  }, [id, location.state]);

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tab 切换处理 - 同步到 URL
  const handleTabChange = useCallback((tab) => {
    setSearchParams({ tab }, { replace: true });
  }, [setSearchParams]);

  // 复制合约地址
  const handleCopyAddress = useCallback(async () => {
    if (!item?.contractAddress) return;
    const success = await copyToClipboard(item.contractAddress);
    if (success) {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  }, [item?.contractAddress]);

  // 分享功能
  const handleShare = useCallback(async () => {
    if (!item) return;
    const shareData = {
      title: item.name,
      text: item.description || `查看数字藏品：${item.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard(window.location.href);
      }
    } catch {
      // 用户取消分享或不支持
    }
  }, [item]);

  // 处理返回
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 图片加载完成
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // 空状态
  if (!item) {
    return (
      <div className="detail-page">
        <header className={`detail-header ${scrolled ? 'scrolled' : ''}`}>
          <button
            className="header-btn"
            onClick={handleBack}
            aria-label="返回上一页"
          >
            <IconBack size={20} aria-hidden="true" />
          </button>
          <h1 className="header-title">藏品详情</h1>
          <div className="header-placeholder" aria-hidden="true" />
        </header>
        <main className="detail-empty" role="status">
          <div className="empty-visual">
            <div className="empty-icon">
              <svg viewBox="0 0 80 80" width="80" height="80">
                <defs>
                  <linearGradient id="emptyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <circle cx="40" cy="40" r="36" fill="url(#emptyGrad)" />
                <path d="M28 32h24M28 40h16M28 48h20" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>
            <p className="empty-text">藏品未找到</p>
            <button className="empty-btn" onClick={handleBack}>
              <span>返回</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  const ratioClass = ratioClassMap[item.imageRatio] || 'ratio-1-1';
  const isDirectSale = item.saleType === 'direct';
  const isSoldOut = item.status === 'soldout';
  const isEnded = item.status === 'ended';
  const isDisabled = isSoldOut || isEnded;

  const getButtonText = () => {
    if (isSoldOut || isEnded) return '兑换结束';
    if (isDirectSale) return '立即购买';
    return '立即兑换';
  };

  const formattedPrice = formatPrice(item.price);

  // 计算进度百分比
  const progressPercent = item.issueCount ? Math.round((item.soldCount / item.issueCount) * 100) : 0;

  return (
    <div className="detail-page">
      {/* 顶部导航栏 - 透明渐变 */}
      <header className={`detail-header ${scrolled ? 'scrolled' : ''}`}>
        <button
          className="header-btn"
          onClick={handleBack}
          aria-label="返回上一页"
        >
          <IconBack size={20} aria-hidden="true" />
        </button>
        <h1 className={`header-title ${scrolled ? 'visible' : ''}`}>{item.name}</h1>
        <button
          className="header-btn"
          onClick={handleShare}
          aria-label="分享此藏品"
        >
          <IconShare size={20} aria-hidden="true" />
        </button>
      </header>

      {/* 主内容区 */}
      <main className="detail-main">
        {/* Hero 区域 - 沉浸式图片展示 */}
        <section className="detail-hero" ref={heroRef}>
          {/* 背景模糊层 */}
          <div
            className="hero-backdrop"
            style={{ backgroundImage: `url(${item.image})` }}
            aria-hidden="true"
          />

          {/* 主图容器 */}
          <figure className={`hero-image-container ${ratioClass}`}>
            <div className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
              <img
                src={item.image}
                alt={`${item.name} - ${item.creator || '未知'}创作`}
                className="hero-image"
                onLoad={handleImageLoad}
                loading="eager"
                fetchpriority="high"
              />
              {/* 骨架屏 */}
              {!imageLoaded && (
                <div className="image-skeleton" aria-hidden="true">
                  <div className="skeleton-shimmer" />
                </div>
              )}
            </div>

          </figure>
        </section>

        {/* Tab 导航 */}
        <nav className="detail-tabs" role="tablist" aria-label="藏品信息分类">
          <div className="tabs-container">
            <button
              role="tab"
              className={`tab-item ${activeTab === 'detail' ? 'active' : ''}`}
              onClick={() => handleTabChange('detail')}
              aria-selected={activeTab === 'detail'}
            >
              <span className="tab-text">作品详情</span>
              <span className="tab-indicator" />
            </button>
            <button
              role="tab"
              className={`tab-item ${activeTab === 'notice' ? 'active' : ''}`}
              onClick={() => handleTabChange('notice')}
              aria-selected={activeTab === 'notice'}
            >
              <span className="tab-text">作品公告</span>
              <span className="tab-indicator" />
            </button>
          </div>
        </nav>

        {/* 内容面板 */}
        <div className="detail-content">
          {activeTab === 'detail' ? (
            <article className="content-panel">
              {/* 主信息卡片 */}
              <section className="info-card main-card">
                {/* 标签区 */}
                <div className="card-tags">
                  <span className={`tag tag--type ${isDirectSale ? 'tag--direct' : 'tag--compose'}`}>
                    <span className="tag-dot" />
                    {item.typeLabel || item.type}
                  </span>
                  {item.vipRoyalty && (
                    <span className="tag tag--vip">
                      <svg viewBox="0 0 16 16" width="12" height="12">
                        <path fill="currentColor" d="M8 1l2 5h5l-4 3.5 1.5 5.5L8 12l-4.5 3 1.5-5.5L1 6h5z"/>
                      </svg>
                      VIP版税
                    </span>
                  )}
                  {item.status === 'selling' && (
                    <span className="tag tag--status tag--selling">
                      <span className="status-pulse" />
                      热卖中
                    </span>
                  )}
                  {isSoldOut && (
                    <span className="tag tag--status tag--soldout">已售罄</span>
                  )}
                </div>

                {/* 标题 */}
                <h1 className="card-title">{item.name}</h1>

                {/* 创作者信息 */}
                <div className="creator-info">
                  <div className="creator-row">
                    <span className="creator-label">创作者</span>
                    <span className="creator-value">{item.creator || '未知'}</span>
                  </div>
                  <div className="creator-row">
                    <span className="creator-label">发行方</span>
                    <span className="creator-value highlight">{item.issuer || 'UMX平台'}</span>
                  </div>
                </div>

                {/* 价格展示 */}
                {isDirectSale && formattedPrice && (
                  <div className="price-display">
                    <span className="price-label">当前价格</span>
                    <div className="price-amount">
                      <span className="currency">¥</span>
                      <span className="value">{formattedPrice}</span>
                    </div>
                  </div>
                )}

                {/* 发行进度 */}
                <div className="issue-progress">
                  <div className="progress-header">
                    <span className="progress-label">发行进度</span>
                    <span className="progress-numbers">
                      <span className="sold">{formatNumber(item.soldCount)}</span>
                      <span className="divider">/</span>
                      <span className="total">{formatNumber(item.issueCount)}</span>
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                    <div className="progress-glow" style={{ left: `${progressPercent}%` }} />
                  </div>
                  <span className="progress-percent">{progressPercent}%</span>
                </div>
              </section>

              {/* 区块链信息卡片 */}
              <section className="info-card blockchain-card">
                <div className="card-header">
                  <div className="header-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.18 7 12 9.82 5.82 7 12 4.18zM5 8.82l6 3.33v6.67l-6-3.33V8.82zm14 0v6.67l-6 3.33v-6.67l6-3.33z"/>
                    </svg>
                  </div>
                  <h3 className="header-title">链上信息</h3>
                  <div className="chain-badge">
                    <span className="chain-name">BSN</span>
                  </div>
                </div>

                <div className="blockchain-grid">
                  <div className="blockchain-item">
                    <span className="item-label">合约地址</span>
                    <div className="item-value address-value">
                      <code className="address-text">{item.contractAddress}</code>
                      <button
                        className={`copy-btn ${copiedAddress ? 'copied' : ''}`}
                        onClick={handleCopyAddress}
                        aria-label={copiedAddress ? '已复制' : '复制合约地址'}
                      >
                        {copiedAddress ? (
                          <svg viewBox="0 0 20 20" width="16" height="16">
                            <path fill="currentColor" d="M7.5 12.5l-3-3 1-1 2 2 5-5 1 1-6 6z"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 20 20" width="16" height="16">
                            <path fill="currentColor" d="M13 3H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2zm0 12H7V5h6v10z"/>
                            <path fill="currentColor" opacity="0.5" d="M3 7v10a2 2 0 002 2h6v-2H5V7H3z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="blockchain-row">
                    <div className="blockchain-item half">
                      <span className="item-label">版税比例</span>
                      <span className="item-value">{item.royaltyRate || '0%'}</span>
                    </div>
                    <div className="blockchain-item half">
                      <span className="item-label">总发行量</span>
                      <span className="item-value numbers">{formatNumber(item.issueCount)}</span>
                    </div>
                  </div>

                  <div className="blockchain-item">
                    <span className="item-label">开售时段</span>
                    <span className="item-value time-value">{item.salePeriod || '---'}</span>
                  </div>
                </div>
              </section>

              {/* 前往寄售市场 */}
              {!isDirectSale && (
                <a href="#/market" className="market-link">
                  <span className="link-text">前往寄售市场</span>
                  <span className="link-arrow">
                    <svg viewBox="0 0 20 20" width="18" height="18">
                      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              )}

              {/* 作品详情 */}
              <section className="info-card description-card">
                <div className="card-header simple">
                  <h3 className="header-title">作品详情</h3>
                </div>
                <div className={`description-content ${descExpanded ? 'expanded' : ''}`}>
                  <p className="description-text">{item.description || '暂无描述'}</p>
                </div>
                {item.description && item.description.length > 50 && (
                  <button
                    className="expand-btn"
                    onClick={() => setDescExpanded(!descExpanded)}
                    aria-expanded={descExpanded}
                  >
                    <span>{descExpanded ? '收起' : '展开全部'}</span>
                    {descExpanded ? (
                      <IconChevronUp size={14} />
                    ) : (
                      <IconChevronDown size={14} />
                    )}
                  </button>
                )}
              </section>

              {/* 交易须知 */}
              <section className="info-card notice-card">
                <div className="card-header simple">
                  <h3 className="header-title">交易须知</h3>
                </div>
                <div className={`notice-content ${noticeExpanded ? 'expanded' : ''}`}>
                  <ol className="notice-list">
                    {tradingNotices.map((notice, index) => (
                      <li key={index}>
                        <span className="notice-index">{index + 1}</span>
                        <span className="notice-text">{notice}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <button
                  className="expand-btn"
                  onClick={() => setNoticeExpanded(!noticeExpanded)}
                  aria-expanded={noticeExpanded}
                >
                  <span>{noticeExpanded ? '收起' : '展开全部'}</span>
                  {noticeExpanded ? (
                    <IconChevronUp size={14} />
                  ) : (
                    <IconChevronDown size={14} />
                  )}
                </button>
              </section>
            </article>
          ) : (
            <article className="content-panel">
              <div className="empty-notice">
                <div className="empty-visual">
                  <svg viewBox="0 0 80 80" width="64" height="64">
                    <defs>
                      <linearGradient id="noticeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <circle cx="40" cy="40" r="32" fill="url(#noticeGrad)" />
                    <path d="M40 24v20M40 50v2" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </div>
                <p className="empty-text">暂无公告</p>
              </div>
            </article>
          )}
        </div>
      </main>

      {/* 底部操作栏 */}
      <footer className="detail-footer">
        <div className="footer-content">
          {/* 价格展示（非直卖时显示在售数量） */}
          <div className="footer-info">
            {isDirectSale && formattedPrice ? (
              <>
                <span className="info-label">价格</span>
                <div className="info-price">
                  <span className="currency">¥</span>
                  <span className="amount">{formattedPrice}</span>
                </div>
              </>
            ) : (
              <>
                <span className="info-label">在售</span>
                <span className="info-count">{formatNumber(item.onSale || 0)}件</span>
              </>
            )}
          </div>

          {/* 操作按钮 */}
          <button
            className={`action-btn ${isDisabled ? 'disabled' : ''}`}
            disabled={isDisabled}
          >
            <span className="btn-text">{getButtonText()}</span>
            {!isDisabled && <span className="btn-shine" />}
          </button>
        </div>
      </footer>
    </div>
  );
}
