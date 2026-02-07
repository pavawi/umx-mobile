import { useNavigate } from 'react-router-dom';
import './HotRankAndActivity.scss';

const activityIcons = {
  auction: (color) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
      <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 5.86 13.95 4c-1.73.46-2.96 1.56-3.76 3.12-.33.61-.48 1.3-.6 1.97-.36 1.78.16 3.28 1.09 4.56-.31-.09-.54-.37-.65-.66-.11-.31-.08-.49-.08-.79-.71.45-1.32 1.11-1.62 1.92-.22.61-.27 1.35-.15 2.01.42 2.35 2.59 4.15 5 4.15 2.76 0 5-2.24 5-5 .04-1.01-.37-2.09-.98-2.89l-.2-.26z"/>
    </svg>
  ),
  compose: (color) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  ),
  decompose: (color) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
    </svg>
  ),
  direct: (color) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
};

const activityColors = {
  auction: '#EF4444',
  compose: '#3B82F6',
  decompose: '#8B5CF6',
  direct: '#10B981',
};

const rankColors = ['#FF6B35', '#FF9F1C', '#FFD166'];

export default function HotRankAndActivity({ rankItems = [], activityItems = [], onRankClick, onActivityClick }) {
  const navigate = useNavigate();
  const hasNewActivity = activityItems.some(item => item.hasNew);

  return (
    <div className="hot-rank-activity">
      {/* 左栏 - 热卖榜 */}
      <div className="hot-rank-activity__rank">
        <div className="section-header">
          <span className="section-title">热卖榜</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#D4AF37">
            <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
          </svg>
        </div>
        <div className="rank-list">
          {rankItems.map((item, index) => (
            <div key={item.id} className="rank-item" onClick={() => onRankClick?.(item)}>
              <span className="rank-number" style={{ background: rankColors[index] }}>{index + 1}</span>
              <div className="rank-thumb">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="rank-info">
                <span className="rank-name">{item.name}</span>
                <span className="rank-heat">{item.heat}人参与</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右栏 - 活动角 */}
      <div className="hot-rank-activity__activity">
        <div className="section-header">
          <span className="section-title">活动角</span>
          {hasNewActivity && <span className="activity-dot" />}
        </div>
        <div className="activity-grid">
          {activityItems.map((item) => (
            <div
              key={item.id}
              className="activity-item"
              onClick={() => onActivityClick?.(item) || navigate(item.link)}
            >
              <div className="activity-icon" style={{ background: `${activityColors[item.icon]}20` }}>
                {activityIcons[item.icon]?.(activityColors[item.icon])}
                {item.hasNew && <span className="item-dot" />}
              </div>
              <span className="activity-title">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
