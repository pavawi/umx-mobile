import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import USearch from '../components/base/USearch';
import CollectionCard from '../components/business/CollectionCard';
import CollectionListItem from '../components/business/CollectionListItem';
import {
  IconSearch,
  IconFilter,
  IconSortDown,
  IconSortUp,
  IconBack,
  IconCheckCircle,
  IconBell,
  IconHeart,
  IconCategory,
  IconPalette,
  IconCalendar,
  IconChevronDown,
  IconChevronUp
} from '../components/base/Icons';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useSearchHistory from '../hooks/useSearchHistory';
import {
  hotCollections,
  marketCollections,
  collectionSources,
  yearFilters,
  searchHistory as defaultHistory,
  myFollowList
} from '../mock/data';
import './Market.scss';

// 排序选项
const sortOptions = [
  { value: 'time', label: '时间' },
  { value: 'price', label: '价格' },
];

// 分区选项（首发 Tab 用）
const categoryOptions = [
  { value: 'all', label: '全部分区' },
  { value: 'art', label: '艺术品' },
  { value: 'music', label: '音乐' },
  { value: 'game', label: '游戏' },
  { value: 'sports', label: '体育' },
];

// 模糊搜索
function fuzzyMatch(text, keyword) {
  if (!keyword || !text) return false;
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  if (lowerText.includes(lowerKeyword)) return true;
  let keyIndex = 0;
  for (let i = 0; i < lowerText.length && keyIndex < lowerKeyword.length; i++) {
    if (lowerText[i] === lowerKeyword[keyIndex]) keyIndex++;
  }
  return keyIndex === lowerKeyword.length;
}

export default function Market() {
  // 主 Tab：首发 / 寄售
  const [mainTab, setMainTab] = useState('shoufa');

  // 共享状态
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeSort, setActiveSort] = useState('time');
  const [sortDirection, setSortDirection] = useState({ time: 'desc', price: 'desc' });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // 首发 Tab 状态
  const [showMyFollow, setShowMyFollow] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // 寄售 Tab 状态
  const [activeSource, setActiveSource] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // 搜索
  const debouncedKeyword = useDebouncedValue(searchKeyword, 300);
  const { history, addHistory, clearHistory } = useSearchHistory(defaultHistory);

  const currentSource = collectionSources.find(s => s.value === activeSource) || collectionSources[0];
  const currentYear = yearFilters.find(y => y.value === activeYear) || yearFilters[0];

  const handleCardClick = useCallback((item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  }, [navigate]);

  const handleSearch = (keyword) => {
    addHistory(keyword);
    setIsSearching(!!keyword);
  };

  const handleInputChange = (value) => {
    setSearchKeyword(value);
    setIsSearching(!!value);
  };

  const handleCancelSearch = () => {
    setSearchKeyword('');
    setIsSearching(false);
  };

  const handleSortClick = (sortKey) => {
    if (activeSort === sortKey) {
      setSortDirection(prev => ({
        ...prev,
        [sortKey]: prev[sortKey] === 'desc' ? 'asc' : 'desc'
      }));
    } else {
      setActiveSort(sortKey);
    }
  };

  const toggleSourceDropdown = () => {
    setShowSourceDropdown(!showSourceDropdown);
    setShowYearDropdown(false);
  };

  const toggleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
    setShowSourceDropdown(false);
  };

  // 当前数据源
  const currentCollections = mainTab === 'shoufa' ? hotCollections : marketCollections;

  // 排序
  const sortedCollections = useMemo(() => {
    let sorted = [...currentCollections];
    if (activeSort === 'price') {
      sorted.sort((a, b) => {
        const diff = (a.price || 0) - (b.price || 0);
        return sortDirection.price === 'asc' ? diff : -diff;
      });
    } else if (activeSort === 'time') {
      sorted.sort((a, b) => {
        const diff = (a.id || 0) - (b.id || 0);
        return sortDirection.time === 'asc' ? diff : -diff;
      });
    }
    return sorted;
  }, [currentCollections, activeSort, sortDirection]);

  // 搜索过滤
  const searchResults = useMemo(() => {
    if (!debouncedKeyword.trim()) return [];
    const filtered = currentCollections.filter(item =>
      fuzzyMatch(item.name, debouncedKeyword) ||
      fuzzyMatch(item.creator, debouncedKeyword) ||
      fuzzyMatch(item.type, debouncedKeyword) ||
      fuzzyMatch(item.typeLabel, debouncedKeyword)
    );
    return [...filtered].sort((a, b) => (b.onSale || 0) - (a.onSale || 0));
  }, [debouncedKeyword, currentCollections]);

  const showSearchResults = isSearching && searchKeyword.trim();

  const handleTabSwitch = (tab) => {
    setMainTab(tab);
    setShowMyFollow(false);
    setShowCategoryDropdown(false);
    setShowSourceDropdown(false);
    setShowYearDropdown(false);
  };

  return (
    <div className="page-container market-page">
      {/* Header */}
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
                onClearHistory={clearHistory}
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
            <div className="header-logo">UMX</div>
            <div
              className="header-search"
              onClick={() => setIsSearching(true)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsSearching(true)}
              role="button"
              tabIndex={0}
              aria-label="打开搜索"
            >
              <IconSearch size={16} className="search-icon" />
              <span className="search-placeholder">搜索藏品、艺术家</span>
            </div>
            <div className="header-notify">
              <IconBell size={22} />
            </div>
          </>
        )}
      </div>

      {/* 首发 / 寄售 Tab */}
      {!showSearchResults && !showMyFollow && (
        <div className="main-tabs">
          <button
            className={`main-tab ${mainTab === 'shoufa' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('shoufa')}
          >
            首发
            {mainTab === 'shoufa' && <span className="tab-indicator" />}
          </button>
          <button
            className={`main-tab ${mainTab === 'jishou' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('jishou')}
          >
            寄售
            {mainTab === 'jishou' && <span className="tab-indicator" />}
          </button>
        </div>
      )}

      {showSearchResults ? (
        /* 搜索结果视图 */
        <div className="search-results-view">
          <div className="search-filter-bar">
            <div className="sort-options">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`sort-btn ${activeSort === option.value ? 'active' : ''}`}
                  onClick={() => setActiveSort(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="filter-icon" role="button" tabIndex={0} aria-label="筛选选项">
              <IconFilter size={18} />
            </div>
          </div>
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
        /* 我的关注视图 */
        <div className="my-follow-view">
          <div className="my-follow-header">
            <button className="back-btn" onClick={() => setShowMyFollow(false)}>
              <IconBack size={20} />
            </button>
            <h2>我的关注</h2>
          </div>
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
        /* 默认视图 */
        <>
          {/* 筛选区域 - 首发用分类+关注，寄售用来源+年份 */}
          <div className="filter-section">
            {mainTab === 'shoufa' ? (
              <>
                <button className="my-follow-btn" onClick={() => setShowMyFollow(true)}>
                  <IconHeart size={16} className="btn-icon" filled />
                  <span>我的关注</span>
                </button>
                <div className={`category-selector ${showCategoryDropdown ? 'open' : ''}`}>
                  <IconCategory size={16} className="selector-icon" />
                  <span onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                    {categoryOptions.find(c => c.value === activeCategory)?.label}
                  </span>
                  <IconChevronDown size={18} className="selector-arrow" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} />
                  {showCategoryDropdown && (
                    <div className="category-dropdown show">
                      {categoryOptions.map((cat) => (
                        <div
                          key={cat.value}
                          className={`dropdown-item ${activeCategory === cat.value ? 'active' : ''}`}
                          onClick={() => {
                            setActiveCategory(cat.value);
                            setShowCategoryDropdown(false);
                          }}
                        >
                          {cat.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={`filter-selector ${showSourceDropdown ? 'open' : ''}`}>
                  <IconPalette size={16} className="selector-icon" />
                  <span onClick={toggleSourceDropdown}>{currentSource.label}</span>
                  <IconChevronDown size={18} className="selector-arrow" onClick={toggleSourceDropdown} />
                  {showSourceDropdown && (
                    <div className="filter-dropdown show">
                      {collectionSources.map((source) => (
                        <div
                          key={source.value}
                          className={`dropdown-item ${activeSource === source.value ? 'active' : ''}`}
                          onClick={() => { setActiveSource(source.value); setShowSourceDropdown(false); }}
                        >
                          {source.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={`filter-selector ${showYearDropdown ? 'open' : ''}`}>
                  <IconCalendar size={16} className="selector-icon" />
                  <span onClick={toggleYearDropdown}>{currentYear.label}</span>
                  <IconChevronDown size={18} className="selector-arrow" onClick={toggleYearDropdown} />
                  {showYearDropdown && (
                    <div className="filter-dropdown show">
                      {yearFilters.map((year) => (
                        <div
                          key={year.value}
                          className={`dropdown-item ${activeYear === year.value ? 'active' : ''}`}
                          onClick={() => { setActiveYear(year.value); setShowYearDropdown(false); }}
                        >
                          {year.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
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
                  variant={mainTab === 'shoufa' ? 'hot' : 'market'}
                  onClick={handleCardClick}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
