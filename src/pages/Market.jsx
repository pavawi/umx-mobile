import { useState } from 'react';
import USearch from '../components/base/USearch';
import UFilterTabs from '../components/base/UFilterTabs';
import CollectionCard from '../components/business/CollectionCard';
import {
  marketCategories,
  sortOptions,
  yearFilters,
  marketCollections,
  searchHistory
} from '../mock/data';
import './Market.scss';

export default function Market() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('latest');
  const [activeYear, setActiveYear] = useState('all');
  const [history, setHistory] = useState(searchHistory);

  const handleSearch = (keyword) => {
    console.log('Search:', keyword);
    if (keyword && !history.includes(keyword)) {
      setHistory([keyword, ...history.slice(0, 9)]);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // 模拟筛选
  let filteredCollections = [...marketCollections];
  if (activeSort === 'price_asc') {
    filteredCollections.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price_desc') {
    filteredCollections.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="page-container market-page">
      {/* 页面标题 - 改名为"藏品库" */}
      <div className="page-header">
        <h1>藏品库</h1>
      </div>

      {/* 搜索框 */}
      <div className="search-wrapper">
        <USearch
          placeholder="搜索藏品名称"
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={handleSearch}
          history={history}
          onClearHistory={handleClearHistory}
          onSelectHistory={(item) => {
            setSearchKeyword(item);
            handleSearch(item);
          }}
        />
      </div>

      {/* 分类筛选 */}
      <div className="filter-section">
        <UFilterTabs
          tabs={marketCategories}
          value={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* 排序和年份筛选 */}
      <div className="sub-filters">
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
        <div className="year-select">
          <select
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
          >
            {yearFilters.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 藏品列表 */}
      <div className="collection-grid">
        {filteredCollections.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            variant="market"
            onClick={(item) => console.log('Card clicked:', item)}
          />
        ))}
      </div>
    </div>
  );
}
