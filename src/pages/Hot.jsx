import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import USearch from '../components/base/USearch';
import UFilterTabs from '../components/base/UFilterTabs';
import CollectionCard from '../components/business/CollectionCard';
import CollectionListItem from '../components/business/CollectionListItem';
import { IconSearch, IconFilter, IconSortDown, IconSortUp, IconAdd, IconBack, IconCheckCircle } from '../components/base/Icons';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useSearchHistory from '../hooks/useSearchHistory';
import { hotCategories, hotCollections, searchHistory as defaultHistory, myFollowList } from '../mock/data';
import './Hot.scss';

// 顶部Tab选项
const topTabs = [
  { value: 'shoufa', label: '首发' },
  { value: 'jishou', label: '寄售' },
];

// 排序选项
const sortOptions = [
  { value: 'hot', label: '热门' },
  { value: 'price_asc', label: '价格' },
  { value: 'onsale', label: '在售排序' },
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
  const [isSearching, setIsSearching] = useState(false);
  const [activeTopTab, setActiveTopTab] = useState('shoufa');
  const [showMyFollow, setShowMyFollow] = useState(false);
  const navigate = useNavigate();

  // 搜索防抖
  const debouncedKeyword = useDebouncedValue(searchKeyword, 300);

  // 搜索历史（持久化）
  const { history, addHistory, clearHistory } = useSearchHistory(defaultHistory);

  const handleCardClick = useCallback((item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  }, [navigate]);

  const handleSearch = (keyword) => {
    console.log('Search:', keyword);
    addHistory(keyword);
    setIsSearching(!!keyword);
  };

  const handleClearHistory = () => {
    clearHistory();
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

  const handleMyFollowClick = () => {
    setShowMyFollow(!showMyFollow);
  };

  // 分类筛选
  const categoryFilteredCollections = useMemo(() => {
    if (activeCategory === 'all') return hotCollections;
    return hotCollections.filter((_, index) => index % 2 === (activeCategory === 'ushare' ? 0 : 1));
  }, [activeCategory]);

  // 排序后的藏品列表
  const sortedCollections = useMemo(() => {
    let sorted = [...categoryFilteredCollections];

    if (activeSort === 'price_asc') {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (activeSort === 'onsale') {
      sorted.sort((a, b) => (b.onSale || 0) - (a.onSale || 0));
    }
    // 默认热门排序按在售数量

    return sorted;
  }, [categoryFilteredCollections, activeSort]);

  // 搜索过滤（使用防抖后的关键词）
  const searchResults = useMemo(() => {
    if (!debouncedKeyword.trim()) return [];

    const filtered = hotCollections.filter(item =>
      fuzzyMatch(item.name, debouncedKeyword) ||
      fuzzyMatch(item.creator, debouncedKeyword) ||
      fuzzyMatch(item.type, debouncedKeyword) ||
      fuzzyMatch(item.typeLabel, debouncedKeyword)
    );

    // 排序
    if (activeSort === 'price_asc') {
      return [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    // 默认按热门（在售数量）
    return [...filtered].sort((a, b) => (b.onSale || 0) - (a.onSale || 0));
  }, [debouncedKeyword, activeSort]);

  // 是否显示搜索结果视图
  const showSearchResults = isSearching && searchKeyword.trim();

  return (
    <div className="page-container hot-page">
      {/* 顶部导航：首发/寄售 Tab 或 搜索框 */}
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
            <button className="cancel-btn" onClick={handleCancelSearch} aria-label="取消搜索">取消</button>
          </div>
        ) : (
          <>
            {/* 首发/寄售 Tab切换 - 点击变为搜索框 */}
            <div className="top-tabs-wrapper">
              <div className="top-tabs">
                {topTabs.map((tab) => (
                  <button
                    key={tab.value}
                    className={`top-tab ${activeTopTab === tab.value ? 'active' : ''}`}
                    onClick={() => setActiveTopTab(tab.value)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* 搜索图标 - 点击展开搜索框 */}
              <div
                className="search-trigger"
                onClick={() => setIsSearching(true)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsSearching(true)}
                role="button"
                tabIndex={0}
                aria-label="打开搜索"
              >
                <IconSearch size={20} />
              </div>
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
                    <IconSortDown size={12} className="sort-icon" />
                  )}
                </button>
              ))}
            </div>
            <div
              className="filter-icon"
              role="button"
              tabIndex={0}
              aria-label="筛选选项"
            >
              <IconFilter size={18} />
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
      ) : showMyFollow ? (
        /* 我的关注视图 - 小图列表展示 */
        <div className="my-follow-view">
          {/* 顶部：我的关注标题 */}
          <div className="my-follow-header">
            <button className="back-btn" onClick={() => setShowMyFollow(false)}>
              <IconBack size={20} />
            </button>
            <h2>我的关注</h2>
          </div>

          {/* 关注列表 - 小图展示 */}
          <div className="follow-list">
            {myFollowList.map((item) => (
              <div key={item.id} className="follow-item" onClick={() => handleCardClick(item)}>
                <div className="follow-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="follow-item-info">
                  <div className="follow-item-name">{item.name}</div>
                  <div className="follow-item-code">{item.code}</div>
                </div>
                <div className="follow-item-stats">
                  <div className="stat-value">{item.onSale !== null ? item.onSale : '--'}</div>
                  <div className="stat-value">{item.total !== null ? item.total : '--'}</div>
                </div>
                <button className="follow-item-action">
                  <IconCheckCircle size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 默认网格视图 */
        <>
          {/* 分类筛选 - 左侧增加我的关注入口 */}
          <div className="filter-section">
            <div className="filter-row">
              <button className="my-follow-btn" onClick={handleMyFollowClick}>
                <IconAdd size={14} />
                <span>我的关注</span>
              </button>
              <div className="filter-tabs-wrapper">
                <UFilterTabs
                  tabs={hotCategories}
                  value={activeCategory}
                  onChange={setActiveCategory}
                />
              </div>
            </div>
          </div>

          {/* 排序筛选栏 - 新增 */}
          <div className="sort-filter-bar">
            <div className="sort-options">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`sort-btn ${activeSort === option.value ? 'active' : ''}`}
                  onClick={() => setActiveSort(option.value)}
                >
                  {option.label}
                  {option.value === 'price_asc' && (
                    <IconSortUp size={12} className="sort-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 藏品列表 */}
          <div className="collection-grid">
            {sortedCollections.map((item) => (
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
