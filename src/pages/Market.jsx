import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import USearch from '../components/base/USearch';
import CollectionCard from '../components/business/CollectionCard';
import {
  IconSearch,
  IconBell,
  IconPalette,
  IconCalendar,
  IconChevronDown,
  IconChevronUp
} from '../components/base/Icons';
import {
  collectionSources,
  yearFilters,
  marketCollections,
  searchHistory as defaultHistory
} from '../mock/data';
import './Market.scss';

// 排序选项 - 匹配设计: 时间/价格
const sortOptions = [
  { value: 'time', label: '时间' },
  { value: 'price', label: '价格' },
];

export default function Market() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeSort, setActiveSort] = useState('time');
  const [sortDirection, setSortDirection] = useState({ time: 'desc', price: 'desc' });
  const [isSearching, setIsSearching] = useState(false);
  const [activeSource, setActiveSource] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [history, setHistory] = useState(defaultHistory);
  const navigate = useNavigate();

  const handleCardClick = useCallback((item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  }, [navigate]);

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

  const handleSourceSelect = (value) => {
    setActiveSource(value);
    setShowSourceDropdown(false);
  };

  const handleYearSelect = (value) => {
    setActiveYear(value);
    setShowYearDropdown(false);
  };

  // 关闭其他下拉
  const toggleSourceDropdown = () => {
    setShowSourceDropdown(!showSourceDropdown);
    setShowYearDropdown(false);
  };

  const toggleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
    setShowSourceDropdown(false);
  };

  const currentSource = collectionSources.find(s => s.value === activeSource) || collectionSources[0];
  const currentYear = yearFilters.find(y => y.value === activeYear) || yearFilters[0];

  // 排序后的藏品列表
  const sortedCollections = useMemo(() => {
    let sorted = [...marketCollections];

    if (activeSort === 'price') {
      sorted.sort((a, b) => {
        const diff = (a.price || 0) - (b.price || 0);
        return sortDirection.price === 'asc' ? diff : -diff;
      });
    } else if (activeSort === 'time') {
      // 模拟时间排序（使用数组顺序作为时间代理）
      if (sortDirection.time === 'asc') {
        sorted.reverse();
      }
    }

    return sorted;
  }, [activeSort, sortDirection]);

  return (
    <div className="page-container market-page">
      {/* Header: Logo + 搜索框 + 通知 - 匹配设计稿 */}
      <div className="page-header">
        {isSearching ? (
          <div className="search-header">
            <div className="search-input-wrapper">
              <USearch
                placeholder="搜索藏品、艺术家"
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

      {/* 筛选区域 - 来源选择器 + 年份选择器 */}
      <div className="filter-section">
        {/* 来源选择器 */}
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
                  onClick={() => handleSourceSelect(source.value)}
                >
                  {source.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 年份选择器 */}
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
                  onClick={() => handleYearSelect(year.value)}
                >
                  {year.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 排序栏 - 时间/价格 */}
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

      {/* 瀑布流藏品列表 */}
      <div className="collection-grid">
        {sortedCollections.map((item) => (
          <div key={item.id} className="collection-card-wrapper">
            <CollectionCard
              item={item}
              variant="market"
              showPrice={true}
              onClick={handleCardClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
