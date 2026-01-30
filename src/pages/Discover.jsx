import { useNavigate } from 'react-router-dom';
import ActivitySection from '../components/business/ActivitySection';
import FeatureGrid from '../components/business/FeatureGrid';
import { IconSearch, IconBell } from '../components/base/Icons';
import { activityEntries, featureGridItems } from '../mock/data';
import './Discover.scss';

export default function Discover() {
  const navigate = useNavigate();

  return (
    <div className="page-container discover-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-logo">UMX</div>
        <div
          className="header-search"
          onClick={() => navigate('/market')}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/market')}
          role="button"
          tabIndex={0}
          aria-label="搜索"
        >
          <IconSearch size={16} className="search-icon" />
          <span className="search-placeholder">搜索藏品、艺术家</span>
        </div>
        <div className="header-notify">
          <IconBell size={22} />
        </div>
      </div>

      {/* 活动中心 */}
      <div className="discover-section">
        <div className="section-header">
          <span className="section-title">活动中心</span>
        </div>
        <ActivitySection
          items={activityEntries}
          onItemClick={(item) => navigate(item.link)}
        />
      </div>

      {/* 运营推荐 */}
      <div className="discover-section">
        <div className="section-header">
          <span className="section-title">精选推荐</span>
        </div>
        <FeatureGrid
          items={featureGridItems}
          onItemClick={(item) => navigate(item.link)}
        />
      </div>

      {/* 推荐横幅 */}
      <div className="discover-section">
        <div className="section-header">
          <span className="section-title">热门专题</span>
        </div>
        <div className="discover-topics">
          <div className="topic-card topic-card--purple" onClick={() => navigate('/market')}>
            <div className="topic-card__content">
              <span className="topic-card__title">数字艺术精选</span>
              <span className="topic-card__desc">探索顶级数字艺术家作品</span>
            </div>
            <div className="topic-card__badge">HOT</div>
          </div>
          <div className="topic-card topic-card--blue" onClick={() => navigate('/market')}>
            <div className="topic-card__content">
              <span className="topic-card__title">新人专区</span>
              <span className="topic-card__desc">精选入门级藏品推荐</span>
            </div>
            <div className="topic-card__badge">NEW</div>
          </div>
          <div className="topic-card topic-card--green" onClick={() => navigate('/market')}>
            <div className="topic-card__content">
              <span className="topic-card__title">社区共创</span>
              <span className="topic-card__desc">参与社区创作赢取奖励</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
