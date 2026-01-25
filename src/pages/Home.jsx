import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerSwiper from '../components/business/BannerSwiper';
import NoticeMarquee from '../components/business/NoticeMarquee';
import RecommendBanner from '../components/business/RecommendBanner';
import CollectionCard from '../components/business/CollectionCard';
import UFilterTabs from '../components/base/UFilterTabs';
import {
  banners,
  systemNotices,
  quickEntries,
  recommendBanners,
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

  return (
    <div className="page-container home-page">
      {/* 轮播Banner */}
      <div className="home-banner">
        <BannerSwiper banners={banners} />
      </div>

      {/* 系统通知喇叭 🆕 */}
      <NoticeMarquee
        notices={systemNotices}
        onClick={(notice) => console.log('Notice clicked:', notice)}
      />

      {/* 活动入口 */}
      <div className="quick-entries">
        {quickEntries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <span className="entry-icon">{entry.icon}</span>
            <span className="entry-title">{entry.title}</span>
          </div>
        ))}
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

      {/* 运营推荐位 🆕 */}
      <div className="recommend-section">
        <RecommendBanner
          banner={recommendBanners[0]}
          onClick={(banner) => console.log('Banner clicked:', banner)}
        />
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
