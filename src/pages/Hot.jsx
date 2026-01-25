import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import USearch from '../components/base/USearch';
import UFilterTabs from '../components/base/UFilterTabs';
import CollectionCard from '../components/business/CollectionCard';
import CollectionListItem from '../components/business/CollectionListItem';
import { hotCategories, hotCollections, searchHistory } from '../mock/data';
import './Hot.scss';

// 排序选项
const sortOptions = [
  { value: 'hot', label: '热门' },
  { value: 'price_asc', label: '价格' },
];

// 模糊搜索函数 - 支持拼音首字母和中文
function fuzzyMatch(text, keyword) {
  if (!keyword || !text) return false;
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  // 直接包含匹配
  if (lowerText.includes(lowerKeyword)) return true;

  // 字符分散匹配（如"勇直前"匹配"勇往直前"）
  let keyIndex = 0;
  for (let i = 0; i < lowerText.length && keyIndex < lowerKeyword.length; i++) {
    if (lowerText[i] === lowerKeyword[keyIndex]) {
      keyIndex++;
    }
  }
  return keyIndex === lowerKeyword.length;
}

export default function Hot() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('hot');
  const [history, setHistory] = useState(searchHistory);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  };

  const handleSearch = (keyword) => {
    console.log('Search:', keyword);
    if (keyword && !history.includes(keyword)) {
      setHistory([keyword, ...history.slice(0, 9)]);
    }
    setIsSearching(!!keyword);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleInputChange = (value) => {
    setSearchKeyword(value);
    // 实时搜索
    setIsSearching(!!value);
  };

  const handleCancelSearch = () => {
    setSearchKeyword('');
    setIsSearching(false);
  };

  // 分类筛选
  const categoryFilteredCollections = useMemo(() => {
    if (activeCategory === 'all') return hotCollections;
    return hotCollections.filter((_, index) => index % 2 === (activeCategory === 'ushare' ? 0 : 1));
  }, [activeCategory]);

  // 搜索过滤
  const searchResults = useMemo(() => {
    if (!searchKeyword.trim()) return [];

    const filtered = hotCollections.filter(item =>
      fuzzyMatch(item.name, searchKeyword) ||
      fuzzyMatch(item.creator, searchKeyword) ||
      fuzzyMatch(item.type, searchKeyword) ||
      fuzzyMatch(item.typeLabel, searchKeyword)
    );

    // 排序
    if (activeSort === 'price_asc') {
      return [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    // 默认按热门（在售数量）
    return [...filtered].sort((a, b) => (b.onSale || 0) - (a.onSale || 0));
  }, [searchKeyword, activeSort]);

  // 是否显示搜索结果视图
  const showSearchResults = isSearching && searchKeyword.trim();

  return (
    <div className="page-container hot-page">
      {/* 页面标题和搜索框 */}
      <div className="page-header">
        {showSearchResults ? (
          <div className="search-header">
            <div className="search-input-wrapper">
              <USearch
                placeholder="搜索藏品名称"
                value={searchKeyword}
                onChange={handleInputChange}
                onSearch={handleSearch}
                history={history}
                onClearHistory={handleClearHistory}
                onSelectHistory={(item) => {
                  setSearchKeyword(item);
                  handleSearch(item);
                }}
              />
            </div>
            <button className="cancel-btn" onClick={handleCancelSearch}>取消</button>
          </div>
        ) : (
          <>
            <h1>热卖</h1>
            {/* 搜索框 */}
            <div className="search-wrapper">
              <USearch
                placeholder="搜索藏品名称"
                value={searchKeyword}
                onChange={handleInputChange}
                onSearch={handleSearch}
                history={history}
                onClearHistory={handleClearHistory}
                onSelectHistory={(item) => {
                  setSearchKeyword(item);
                  handleSearch(item);
                }}
              />
            </div>
          </>
        )}
      </div>

      {showSearchResults ? (
        /* 搜索结果视图 */
        <div className="search-results-view">
          {/* 排序筛选栏 */}
          <div className="search-filter-bar">
            <div className="sort-options">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`sort-btn ${activeSort === option.value ? 'active' : ''}`}
                  onClick={() => setActiveSort(option.value)}
                >
                  {option.label}
                  {option.value === 'price_asc' && (
                    <svg className="sort-icon" viewBox="0 0 24 24" width="12" height="12">
                      <path fill="currentColor" d="M7 10l5 5 5-5H7z"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <div className="filter-icon">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              </svg>
            </div>
          </div>

          {/* 搜索结果列表 */}
          <div className="search-results-list">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <CollectionListItem
                  key={item.id}
                  item={item}
                  keyword={searchKeyword}
                  onClick={handleCardClick}
                />
              ))
            ) : (
              <div className="empty-results">
                <p>未找到相关藏品</p>
                <span>试试其他关键词</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 默认网格视图 */
        <>
          {/* 分类筛选 */}
          <div className="filter-tabs">
            <UFilterTabs
              tabs={hotCategories}
              value={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* 藏品列表 */}
          <div className="collection-grid">
            {categoryFilteredCollections.map((item) => (
              <CollectionCard
                key={item.id}
                item={item}
                variant="hot"
                onClick={handleCardClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
