import { useState, useEffect } from 'react';
import './NoticeMarquee.scss';

export default function NoticeMarquee({ notices = [], onClick }) {
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
    <div className="notice-marquee" onClick={handleClick}>
      <div className="notice-marquee__icon">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
      </div>
      <div className="notice-marquee__content">
        <div className="marquee-text">{currentNotice.title}</div>
      </div>
      <div className="notice-marquee__indicator">
        <span className="dot"></span>
        <span className="text">更多</span>
        <svg viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </div>
    </div>
  );
}
