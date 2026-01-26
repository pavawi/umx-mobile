import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import USearch from '../components/base/USearch';
import UFilterTabs from '../components/base/UFilterTabs';
import CollectionCard from '../components/business/CollectionCard';
import {
  marketCategories,
  sortOptions,
  yearFilters,
  marketCollections,
  searchHistory,
  collectionSources
} from '../mock/data';
import './Market.scss';

export default function Market() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('latest');
  const [activeYear, setActiveYear] = useState('all');
  const [activeSource, setActiveSource] = useState('all');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [history, setHistory] = useState(searchHistory);
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  };

  const handleSearch = (keyword) => {
    console.log('Search:', keyword);
    if (keyword && !history.includes(keyword)) {
      setHistory([keyword, ...history.slice(0, 9)]);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleSourceSelect = (value) => {
    setActiveSource(value);
    setShowSourceDropdown(false);
  };

  const currentSource = collectionSources.find(s => s.value === activeSource) || collectionSources[0];

  // 模拟筛选
  let filteredCollections = [...marketCollections];
  if (activeSort === 'price_asc') {
    filteredCollections.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price_desc') {
    filteredCollections.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="page-container market-page">
      {/* 搜索框 */}
      <div className="search-wrapper">
        <USearch
          placeholder="搜索作品名称"
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={handleSearch}
          history={history}
          onClearHistory={handleClearHistory}
          onSelectHistory={(item) => {
            setSearchKeyword(item);
            handleSearch(item);
          }}
          compact
        />
      </div>

      {/* 排序选项 */}
      <div className="sort-section">
        <div className="sort-tabs">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              className={`sort-btn ${activeSort === opt.value ? 'is-active' : ''}`}
              onClick={() => setActiveSort(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 来源选择器 + 分类筛选 */}
      <div className="filter-row">
        <div className="source-selector">
          <button
            className="source-btn"
            onClick={() => setShowSourceDropdown(!showSourceDropdown)}
          >
            <span>{currentSource.label}</span>
            <svg className={`dropdown-arrow ${showSourceDropdown ? 'is-open' : ''}`} viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          {showSourceDropdown && (
            <div className="source-dropdown">
              {collectionSources.map((source) => (
                <div
                  key={source.value}
                  className={`source-option ${activeSource === source.value ? 'is-active' : ''}`}
                  onClick={() => handleSourceSelect(source.value)}
                >
                  {source.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="category-tabs">
          <UFilterTabs
            tabs={marketCategories}
            value={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      {/* 年份筛选 - 横向标签 */}
      <div className="year-filter-section">
        <div className="year-pills">
          {yearFilters.map((year) => (
            <button
              key={year.value}
              className={`year-pill ${activeYear === year.value ? 'is-active' : ''}`}
              onClick={() => setActiveYear(year.value)}
            >
              {year.label}
            </button>
          ))}
        </div>
      </div>

      {/* 藏品列表 */}
      <div className="collection-grid">
        {filteredCollections.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            variant="market"
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
