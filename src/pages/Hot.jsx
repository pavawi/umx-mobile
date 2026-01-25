import { useState } from 'react';
import USearch from '../components/base/USearch';
import UFilterTabs from '../components/base/UFilterTabs';
import CollectionCard from '../components/business/CollectionCard';
import { hotCategories, hotCollections, searchHistory, hotSearches } from '../mock/data';
import './Hot.scss';

export default function Hot() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
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

  const filteredCollections = activeCategory === 'all'
    ? hotCollections
    : hotCollections.filter((_, index) => index % 2 === (activeCategory === 'ushare' ? 0 : 1));

  return (
    <div className="page-container hot-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1>热卖</h1>
      </div>

      {/* 搜索框 🆕 */}
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
      <div className="filter-tabs">
        <UFilterTabs
          tabs={hotCategories}
          value={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* 藏品列表 */}
      <div className="collection-grid">
        {filteredCollections.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            variant="hot"
            onClick={(item) => console.log('Card clicked:', item)}
          />
        ))}
      </div>
    </div>
  );
}
