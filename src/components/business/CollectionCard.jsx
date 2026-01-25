import './CollectionCard.scss';

const statusTextMap = {
  selling: '首发在售',
  presale: '预售中',
  soldout: '已售罄'
};

export default function CollectionCard({
  item,
  variant = 'default', // 'default' | 'market' | 'hot'
  onClick
}) {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <div className="collection-card" onClick={handleClick}>
      {/* 状态标签 */}
      {item.status && (
        <div className={`collection-card__badge badge--${item.status}`}>
          {statusTextMap[item.status] || ''}
        </div>
      )}

      {/* 藏品图片 */}
      <div className="collection-card__image-wrapper">
        <img src={item.image} alt={item.name} className="collection-card__image" />
        {item.platform && (
          <div className="collection-card__platform">
            <span className="platform-icon">U</span>
            <span>umx.art</span>
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="collection-card__content">
        {/* 类型标签 + 名称 */}
        <div className="collection-card__header">
          {item.type && <span className="collection-card__type">{item.type}</span>}
          <h3 className="collection-card__title">{item.name}</h3>
        </div>

        {/* 创作者 */}
        {item.creator && (
          <div className="collection-card__creator">
            {item.creatorAvatar && (
              <img src={item.creatorAvatar} alt={item.creator} className="creator-avatar" />
            )}
            <span>{item.creator}</span>
          </div>
        )}

        {/* 底部信息 */}
        <div className="collection-card__footer">
          {variant === 'market' && (
            <>
              <div className="price-row">
                <span className="label">价格</span>
                <span className="value">¥{item.price}</span>
              </div>
              <div className="stock-row">
                <span className="label">在售/流通</span>
                <span className="value">{item.onSale}/{item.total}</span>
              </div>
            </>
          )}

          {variant === 'hot' && (
            <>
              <div className="info-row">
                <span className="label">{item.typeLabel || '合成藏品'}</span>
              </div>
              <div className="info-row">
                <span className="label">发行份数</span>
                <span className="value">{item.issueCount}</span>
              </div>
            </>
          )}

          {variant === 'default' && item.total && (
            <div className="limit-badge">限量{item.total}份</div>
          )}
        </div>
      </div>
    </div>
  );
}
