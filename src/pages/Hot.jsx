import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import USearch from '../components/base/USearch';
import CollectionCard from '../components/business/CollectionCard';
import CollectionListItem from '../components/business/CollectionListItem';
import CategoryFolder from '../components/business/CategoryFolder';
import HomeHeader from '../components/layout/HomeHeader';
import { IconSearch, IconFilter, IconSortDown, IconSortUp, IconBack, IconChevronDown, IconChevronUp } from '../components/base/Icons';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useSearchHistory from '../hooks/useSearchHistory';
import { hotCollections, searchHistory as defaultHistory, categoryFolders } from '../mock/data';
import './Hot.scss';

// 排序选项 - 匹配设计: 时间/价格
const sortOptions = [
  { value: 'time', label: '时间' },
  { value: 'price', label: '价格' },
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
  const [activeSort, setActiveSort] = useState('time');
  const [sortDirection, setSortDirection] = useState({ time: 'desc', price: 'desc' });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // 文件夹分类选中
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

  const handleSortClick = (sortKey) => {
    if (activeSort === sortKey) {
      // 切换排序方向
      setSortDirection(prev => ({
        ...prev,
        [sortKey]: prev[sortKey] === 'desc' ? 'asc' : 'desc'
      }));
    } else {
      setActiveSort(sortKey);
    }
  };

  // 排序后的藏品列表
  const sortedCollections = useMemo(() => {
    let sorted = [...hotCollections];

    if (activeSort === 'price') {
      sorted.sort((a, b) => {
        const diff = (a.price || 0) - (b.price || 0);
        return sortDirection.price === 'asc' ? diff : -diff;
      });
    } else if (activeSort === 'time') {
      // 模拟时间排序（使用 id 作为时间代理）
      sorted.sort((a, b) => {
        const diff = a.id - b.id;
        return sortDirection.time === 'asc' ? diff : -diff;
      });
    }

    return sorted;
  }, [activeSort, sortDirection]);

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
      {/* Header: 复用 HomeHeader 组件 */}
      <HomeHeader
        onSearchClick={() => setIsSearching(true)}
        searchContent={showSearchResults ? (
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
        ) : null}
      />

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
      ) : selectedCategory ? (
        /* 分类藏品列表视图 */
        <>
          <div className="category-list-header">
            <button className="back-btn" onClick={() => setSelectedCategory(null)}>
              <IconBack size={20} />
            </button>
            <h2>{selectedCategory.name}</h2>
            <span className="category-count">{selectedCategory.onSaleCount}在售</span>
          </div>

          {/* 排序栏 */}
          <div className="sort-filter-bar">
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className={`sort-item ${activeSort === option.value ? 'active' : ''}`}
                onClick={() => handleSortClick(option.value)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSortClick(option.value)}
                role="button"
                tabIndex={0}
              >
                <span className="sort-label">{option.label}</span>
                <div className="sort-arrows">
                  <IconChevronUp
                    size={12}
                    className={`arrow-icon ${activeSort === option.value && sortDirection[option.value] === 'asc' ? 'active' : ''}`}
                  />
                  <IconChevronDown
                    size={12}
                    className={`arrow-icon ${activeSort === option.value && sortDirection[option.value] === 'desc' ? 'active' : ''}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 藏品列表 */}
          <div className="collection-grid">
            {sortedCollections.map((item) => (
              <div key={item.id} className="collection-card-wrapper">
                <CollectionCard
                  item={item}
                  variant="hot"
                  onClick={handleCardClick}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        /* 默认视图 - 文件夹分类 */
        <CategoryFolder
          folders={categoryFolders}
          onFolderClick={(folder) => setSelectedCategory(folder)}
        />
      )}
    </div>
  );
}
