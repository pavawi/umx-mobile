import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/layout/HomeHeader';
import BannerSwiper from '../components/business/BannerSwiper';
import SystemNoticeBar from '../components/business/SystemNoticeBar';
import NoticeMarquee from '../components/business/NoticeMarquee';
import FeatureGrid from '../components/business/FeatureGrid';
import CollectionCard from '../components/business/CollectionCard';
import UFilterTabs from '../components/base/UFilterTabs';
import {
  banners,
  systemNotices,
  activityNotices,
  featureGridItems,
  homeTabs,
  homeCollections,
  hotCollections
} from '../mock/data';
import './Home.scss';

// 快捷入口图标
const QuickEntryIcons = {
  ucard: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="2"/>
      <path d="M7 8V6a5 5 0 0 1 10 0v2"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  ),
  udou: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z"/>
      <path d="M2 9h20"/>
      <path d="M12 22V9"/>
    </svg>
  ),
  compose: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  notice: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
};

// 快捷入口数据
const quickEntries = [
  { id: '1', icon: 'ucard', title: 'U卡商城', link: '/ucard' },
  { id: '2', icon: 'udou', title: 'U豆兑换', link: '/udou' },
  { id: '3', icon: 'compose', title: '热门合成', link: '/compose' },
  { id: '4', icon: 'notice', title: '官方公告', link: '/notice' },
];

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

      {/* 活动通知 - 跑马灯 */}
      <NoticeMarquee
        notices={activityNotices}
        onClick={(notice) => navigate(notice.link || '/notice')}
      />

      {/* 快捷入口 */}
      <div className="quick-entries">
        {quickEntries.map((entry) => (
          <div
            key={entry.id}
            className="entry-item"
            onClick={() => navigate(entry.link)}
          >
            <span className="entry-icon">{QuickEntryIcons[entry.icon]}</span>
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

      {/* 运营推荐位 - 宫格入口 */}
      <FeatureGrid
        items={featureGridItems}
        onItemClick={(item) => navigate(item.link)}
      />

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
