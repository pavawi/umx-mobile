import { useState, useEffect, useRef } from 'react';
import './BannerSwiper.scss';

export default function BannerSwiper({ banners = [], autoplay = true, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoplay || banners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, banners.length, interval]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (!banners.length) return null;

  return (
    <div className="banner-swiper">
      <div
        className="banner-swiper__track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner.id || index} className="banner-swiper__slide">
            <img src={banner.image} alt={banner.title} />
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <div className="banner-swiper__dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'is-active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
