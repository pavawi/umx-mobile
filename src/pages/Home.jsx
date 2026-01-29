import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/layout/HomeHeader';
import BannerSwiper from '../components/business/BannerSwiper';
import SystemNoticeBar from '../components/business/SystemNoticeBar';
import FeatureGrid from '../components/business/FeatureGrid';
import ActivitySection from '../components/business/ActivitySection';
import CollectionCard from '../components/business/CollectionCard';
import UFilterTabs from '../components/base/UFilterTabs';
import {
  banners,
  systemNotices,
  featureGridItems,
  activityEntries,
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
        onClick={(notice) => navigate('/notifications')}
      />

      {/* 活动中心入口 */}
      <ActivitySection
        items={activityEntries}
        onItemClick={(item) => navigate(item.link)}
      />

      {/* 运营推荐位 - 宫格入口 */}
      <FeatureGrid
        items={featureGridItems}
        onItemClick={(item) => navigate(item.link)}
      />

      {/* 藏品区域 */}
      <div className="collection-section">
        {/* Tab切换 - 使用下划线样式 */}
        <div className="home-tabs">
          <UFilterTabs
            tabs={homeTabs}
            value={activeTab}
            onChange={setActiveTab}
            scrollable={false}
            variant="underline"
          />
        </div>
      </div>

      {/* 藏品列表 */}
      <div className="collection-grid">
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
