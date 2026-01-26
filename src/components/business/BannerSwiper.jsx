import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './BannerSwiper.scss';

export default function BannerSwiper({ banners = [], onBannerClick }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const handleClick = useCallback((banner) => {
    onBannerClick?.(banner);
  }, [onBannerClick]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  if (!banners?.length) return null;

  return (
    <div className="banner-swiper">
      <div className="banner-swiper__viewport" ref={emblaRef}>
        <div className="banner-swiper__container">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="banner-swiper__slide"
              onClick={() => handleClick(banner)}
            >
              <img src={banner.image} alt={banner.title} />
            </div>
          ))}
        </div>
      </div>
      {banners.length > 1 && (
        <div className="banner-swiper__dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === selectedIndex ? 'is-active' : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`跳转到第 ${index + 1} 张`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
