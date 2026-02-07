import { useState, useEffect } from 'react';
import './SystemNoticeBar.scss';

export default function SystemNoticeBar({ notices = [], onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (notices.length <= 1) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notices.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, [notices.length]);

  if (!notices.length) return null;

  const currentNotice = notices[currentIndex];
  const hasUnread = notices.some(n => !n.isRead);

  return (
    <div className="system-notice-bar" onClick={() => onClick?.(currentNotice)}>
      <div className="system-notice-bar__icon">
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
        {hasUnread && <span className="notice-dot" />}
      </div>
      <div className="system-notice-bar__content">
        <div className={`notice-text ${isAnimating ? 'slide-up' : ''}`}>
          {currentNotice.title}
        </div>
      </div>
      <div className="system-notice-bar__arrow">
        <svg viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </div>
    </div>
  );
}
