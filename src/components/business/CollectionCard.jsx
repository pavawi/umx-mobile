import { memo } from 'react';
import LazyImage from '../base/LazyImage';
import './CollectionCard.scss';

/**
 * 统一藏品卡片组件
 *
 * variant 变体说明：
 * - 'home': 首页展示 - 显示发行方式标签(内容区) + 发行份数
 * - 'hot': 热卖展示 - 显示价格(较小) + 在售/总数，隐藏发行方式
 * - 'market': 藏品库展示 - 显示价格 + 在售/总数，隐藏发行方式
 */
function CollectionCard({
  item,
  variant = 'home', // 'home' | 'hot' | 'market'
  onClick
}) {
  const handleClick = () => {
    onClick?.(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // 格式化数字（超过1万用万）
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';
    if (num >= 10000) {
      const wan = num / 10000;
      return wan % 1 === 0 ? `${wan}万` : `${wan.toFixed(1)}万`;
    }
    return num.toString();
  };

  // 格式化价格显示
  const formatPrice = (price) => {
    if (price === null || price === undefined) return '--';
    if (price >= 10000) {
      const wan = price / 10000;
      return wan % 1 === 0 ? `${wan}万` : `${wan.toFixed(2)}万`;
    }
    return price.toFixed(2);
  };

  // 是否显示价格（热卖和藏品库）
  const showPrice = variant === 'hot' || variant === 'market';

  // 是否在内容区显示发行方式标签（仅首页）
  const showTypeTagInContent = variant === 'home' && item.typeLabel;

  return (
    <div
      className={`collection-card collection-card--${variant}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${item.name}，创作者 ${item.creator || '未知'}`}
    >
      {/* 藏品图片 */}
      <div className="collection-card__image-wrapper">
        <LazyImage
          src={item.image}
          alt={item.name}
          className="collection-card__image"
        />
      </div>

      {/* 内容区域 */}
      <div className="collection-card__content">
        {/* 第一行：标题 + 作者 */}
        <div className="collection-card__row1">
          <h3 className="collection-card__title">{item.name}</h3>
          {item.creator && (
            <div className="collection-card__author">
              {item.creatorAvatar && (
                <img src={item.creatorAvatar} alt={item.creator} className="author-avatar" />
              )}
              <span>{item.creator}</span>
            </div>
          )}
        </div>

        {/* 第二行：根据变体显示不同内容 */}
        <div className="collection-card__row2">
          {showPrice ? (
            <>
              {/* 热卖/藏品库模式: 价格 + 在售/总数 */}
              {item.price != null ? (
                <div className="collection-card__price-wrap">
                  <span className="price-symbol">¥</span>
                  <span className="price-value">{formatPrice(item.price)}</span>
                </div>
              ) : (
                <div className="collection-card__price-wrap collection-card__price-wrap--empty">
                  <span className="price-value">暂无出售</span>
                </div>
              )}
              <div className="collection-card__sale-info">
                <span className="sale-label">在售</span>
                <span className="sale-count">{formatNumber(item.onSale)}</span>
                <span className="sale-divider">/</span>
                <span className="sale-total">{formatNumber(item.total || item.issueCount)}</span>
              </div>
            </>
          ) : (
            <>
              {/* 首页模式: 发行方式 + 发行份数 */}
              {showTypeTagInContent && (
                <div className={`collection-card__type-label type-label--${item.saleType || 'default'}`}>
                  {item.typeLabel}
                </div>
              )}
              <div className="collection-card__issue-info">
                <span className="issue-label">发行份数</span>
                <span className="issue-value">{formatNumber(item.total || item.issueCount)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CollectionCard);
