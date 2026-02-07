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
  hotCollections
} from '../mock/data';
import './Home.scss';

export default function Home() {
  const [activeTab, setActiveTab] = useState('hot');
  const navigate = useNavigate();

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

      {/* 藏品区域 */}
      <div className="collection-section">
        {/* Tab切换 - 使用下划线样式 */}
        <div className="home-tabs">
          <UFilterTabs
            tabs={homeTabs}
            value={activeTab}
            onChange={setActiveTab}
            scrollable={true}
            variant="underline"
          />
        </div>
      </div>

      {/* 藏品列表 */}
      <div
        className="collection-grid"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {(activeTab === 'hot' ? hotCollections : homeCollections).map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            variant="home"
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
