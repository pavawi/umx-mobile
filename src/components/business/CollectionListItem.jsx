import './CollectionListItem.scss';

// 稀有度等级颜色映射
const rarityColorMap = {
  'SSR': '#FF6B35',
  'SR': '#8B5CF6',
  'N': '#6B7280',
  '琢贝区': '#D4AF37',
  '精选区': '#3B82F6',
  '新品区': '#10B981',
  '限量区': '#EF4444',
  '合成': '#F59E0B',
  '活动': '#EC4899',
};

// 格式化价格
function formatPrice(price) {
  if (!price || price === 0) return '--';
  if (price >= 10000) {
    return `¥${(price / 10000).toFixed(1)}万`;
  }
  return `¥${price}`;
}

export default function CollectionListItem({
  item,
  onClick,
  keyword = ''
}) {
  const handleClick = () => {
    onClick?.(item);
  };

  // 高亮匹配的关键词
  const highlightKeyword = (text) => {
    if (!keyword || !text) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const rarityColor = rarityColorMap[item.type] || rarityColorMap[item.typeLabel] || '#6B7280';

  return (
    <div className="collection-list-item" onClick={handleClick}>
      {/* 藏品缩略图 */}
      <div className="collection-list-item__image">
        <img src={item.image} alt={item.name} />
      </div>

      {/* 藏品信息 */}
      <div className="collection-list-item__info">
        <div className="collection-list-item__header">
          {(item.type || item.typeLabel) && (
            <span
              className="collection-list-item__badge"
              style={{ backgroundColor: rarityColor }}
            >
              {item.type || item.typeLabel}
            </span>
          )}
          <h3 className="collection-list-item__title">
            {highlightKeyword(item.name)}
          </h3>
        </div>
        {item.creator && (
          <p className="collection-list-item__creator">{item.creator}</p>
        )}
      </div>

      {/* 价格和在售信息 */}
      <div className="collection-list-item__right">
        <span className="collection-list-item__price">
          {formatPrice(item.price)}
          <span className="suffix">起</span>
        </span>
        <span className="collection-list-item__stock">
          在售 {item.onSale ?? item.issueCount ?? 0}
        </span>
      </div>
    </div>
  );
}
