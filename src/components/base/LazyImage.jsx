import { useState, useRef, useEffect } from 'react';
import './LazyImage.scss';

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholder = null,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image ${className}`}>
      {!isLoaded && (
        <div className="lazy-image__placeholder">
          {placeholder || <div className="lazy-image__skeleton" />}
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt || '图片'}
          className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}
