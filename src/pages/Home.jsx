import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/layout/HomeHeader';
import BannerSwiper from '../components/business/BannerSwiper';
import SystemNoticeBar from '../components/business/SystemNoticeBar';
import FeatureGrid from '../components/business/FeatureGrid';
import CollectionCard from '../components/business/CollectionCard';
import UFilterTabs from '../components/base/UFilterTabs';
import {
  banners,
  systemNotices,
  featureGridItems,
  homeTabs,
  homeCollections,
  hotCollections
} from '../mock/data';
import './Home.scss';

export default function Home() {
  const [activeTab, setActiveTab] = useState('hot');
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/detail/${item.id}`, { state: { item } });
  };

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

      {/* 系统通知小喇叭 - 平台通知 */}
      <SystemNoticeBar
        notices={systemNotices}
        onClick={(notice) => navigate('/notifications')}
      />

      {/* 轮播Banner */}
      <div className="home-banner">
        <BannerSwiper banners={banners} />
      </div>

      {/* 运营推荐位 - 宫格入口 */}
      <FeatureGrid
        items={featureGridItems}
        onItemClick={(item) => navigate(item.link)}
      />

      {/* 藏品区域 */}
      <div className="collection-section">
        <div className="section-header">
          <span className="section-title">精选藏品</span>
          <span className="section-more">
            查看更多
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
        </div>

        {/* Tab切换 */}
        <div className="home-tabs">
          <UFilterTabs
            tabs={homeTabs}
            value={activeTab}
            onChange={setActiveTab}
            scrollable={false}
          />
        </div>
      </div>

      {/* 藏品列表 */}
      <div className="collection-grid">
        {(activeTab === 'hot' ? hotCollections : homeCollections).map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            variant={activeTab === 'hot' ? 'hot' : 'default'}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
