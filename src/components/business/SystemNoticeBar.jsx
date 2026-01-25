import { useState, useEffect } from 'react';
import './SystemNoticeBar.scss';

/**
 * 系统通知条 - 用于显示平台通知（系统更新、规则通知等）
 * 与活动通知（NoticeMarquee）区分开
 */
export default function SystemNoticeBar({ notices = [], onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notices.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [notices.length]);

  const currentNotice = notices[currentIndex] || {};

  const handleClick = () => {
    onClick?.(currentNotice);
  };

  if (!notices.length) return null;

  return (
    <div className="system-notice-bar" onClick={handleClick}>
      <div className="system-notice-bar__icon">
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path fill="currentColor" d="M18 11v3.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V11c0-3.31 2.69-6 6-6s6 2.69 6 6zM12 3c-4.41 0-8 3.59-8 8v3.5c0 1.93 1.57 3.5 3.5 3.5h.5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h.5c1.93 0 3.5-1.57 3.5-3.5V11c0-4.41-3.59-8-8-8z"/>
          <circle cx="12" cy="11" r="1.5"/>
        </svg>
      </div>
      <div className="system-notice-bar__content">
        <span className="notice-text">{currentNotice.title}</span>
      </div>
      <div className="system-notice-bar__arrow">
        <svg viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </div>
    </div>
  );
}
