import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/layout/HomeHeader';
import BannerSwiper from '../components/business/BannerSwiper';
import SystemNoticeBar from '../components/business/SystemNoticeBar';
import FeatureGrid from '../components/business/FeatureGrid';
import HotRankAndActivity from '../components/business/HotRankAndActivity';
import CollectionCard from '../components/business/CollectionCard';
import UFilterTabs from '../components/base/UFilterTabs';
import {
  banners,
  systemNotices,
  appGridItems,
  hotRankItems,
  activityCornerItems,
  homeTabs,
  homeCollections,
  hotCollections,
  auctionCollections,
  printCollections,
  customCollections,
  recordCollections
} from '../mock/data';
import './Home.scss';

export default function Home() {
  const [activeTab, setActiveTab] = useState('hot');
  const navigate = useNavigate();

  // Tab 数据映射
  const tabDataMap = {
    hot: hotCollections,
    auction: auctionCollections,
    print: printCollections,
    custom: customCollections,
    records: recordCollections,
  };
  const currentTabData = tabDataMap[activeTab] || homeCollections;

  const handleCardClick = useCallback((item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  }, [navigate]);

  const handleNoticeClick = () => {
    navigate('/notifications');
  };

  // 左右滑动手势切换 Tab
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      const currentIdx = homeTabs.findIndex(t => t.value === activeTab);
      if (diff < 0 && currentIdx < homeTabs.length - 1) {
        setActiveTab(homeTabs[currentIdx + 1].value);
      } else if (diff > 0 && currentIdx > 0) {
        setActiveTab(homeTabs[currentIdx - 1].value);
      }
    }
  };

  return (
    <div className="page-container home-page">
      {/* 顶部Header - Logo/搜索框/通知 */}
      <HomeHeader
        hasUnreadNotice={systemNotices.some(n => !n.isRead)}
        onNoticeClick={handleNoticeClick}
        onSearchClick={() => navigate('/search')}
      />

      {/* 轮播Banner */}
      <div className="home-banner">
        <BannerSwiper banners={banners} />
      </div>

      {/* 系统通知小喇叭 - 放在Banner下方 */}
      <SystemNoticeBar
        notices={systemNotices}
        onClick={() => navigate('/notifications')}
      />

      {/* 小应用宫格 - 横向滚动入口 */}
      <FeatureGrid
        items={appGridItems}
        onItemClick={(item) => navigate(item.link)}
      />

      {/* 热卖榜 + 活动角 */}
      <HotRankAndActivity
        rankItems={hotRankItems}
        activityItems={activityCornerItems}
        onRankClick={handleCardClick}
        onActivityClick={(item) => navigate(item.link)}
      />

      {/* Tab切换 - sticky 吸顶 */}
      <div className="home-tabs">
        <UFilterTabs
          tabs={homeTabs}
          value={activeTab}
          onChange={setActiveTab}
          scrollable={true}
          variant="underline"
        />
      </div>

      {/* 藏品列表 */}
      <div
        className="collection-grid"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentTabData.length > 0 ? currentTabData.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            variant="home"
            onClick={handleCardClick}
          />
        )) : (
          <div className="empty-tab">
            <p>暂无数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
