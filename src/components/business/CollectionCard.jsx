import { memo } from 'react';
import LazyImage from '../base/LazyImage';
import './CollectionCard.scss';

const statusTextMap = {
  selling: '首发在售',
  presale: '预售中',
  soldout: '已售罄'
};

function CollectionCard({
  item,
  variant = 'default', // 'default' | 'market' | 'hot'
  showPrice = false, // 是否显示价格和在售信息（热卖页专用）
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

  // 格式化价格显示
  const formatPrice = (price) => {
    if (price === null || price === undefined) return null;
    return `¥${price.toLocaleString()}`;
  };

  // 格式化数字（超过1000用万）
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';
    if (num >= 10000) {
      const wan = num / 10000;
      // 如果是整数万，不显示小数
      return wan % 1 === 0 ? `${wan}万` : `${wan.toFixed(1)}万`;
    }
    return num.toString();
  };

  // 格式化价格（超过1000用万）
  const formatPriceWithUnit = (price) => {
    if (price === null || price === undefined) return '0';
    if (price >= 10000) {
      const wan = price / 10000;
      return wan % 1 === 0 ? `${wan}万` : `${wan.toFixed(2)}万`;
    }
    return price.toFixed(2);
  };

  return (
    <div
      className="collection-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${item.name}，创作者 ${item.creator || '未知'}`}
    >
      {/* 藏品图片 */}
      <div className="collection-card__image-wrapper">
        {/* 状态标签（左上角） */}
        {item.status && (
          <div className={`collection-card__badge badge--${item.status}`}>
            {statusTextMap[item.status] || ''}
          </div>
        )}

        {/* 发行方式标签（右上角） */}
        {item.typeLabel && (
          <div className={`collection-card__type-tag type-tag--${item.saleType || 'default'}`}>
            {item.typeLabel}
          </div>
        )}

        <LazyImage
          src={item.image}
          alt={item.name}
          className="collection-card__image"
        />
      </div>

      {/* 内容区域 - 匹配设计稿布局 */}
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

        {/* 第二行：价格/类型 + 在售信息 */}
        <div className="collection-card__row2">
          {showPrice ? (
            <>
              {/* 显示价格模式: 价格 + 在售/总数 */}
              <div className="collection-card__price-wrap">
                <span className="price-symbol">¥</span>
                <span className="price-value">{formatPriceWithUnit(item.price)}</span>
              </div>
              <div className="collection-card__sale-info">
                <span className="sale-label">在售</span>
                <span className="sale-count">{formatNumber(item.onSale)}</span>
                <span className="sale-divider">/</span>
                <span className="sale-total">{formatNumber(item.total || item.issueCount)}</span>
              </div>
            </>
          ) : (
            <>
              {/* 默认模式: 发行份数 */}
              <div className="collection-card__right">
                {variant === 'market' && item.price !== undefined && (
                  <span className="price">{formatPrice(item.price)}</span>
                )}
                {(variant === 'hot' || variant === 'default') && (
                  <div className="stats">
                    <span className="stats-label">发行份数</span>
                    <span className="stats-value">{item.total || item.issueCount}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CollectionCard);
