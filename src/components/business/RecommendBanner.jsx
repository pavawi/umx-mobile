import './RecommendBanner.scss';

export default function RecommendBanner({ banner, onClick }) {
  const handleClick = () => {
    onClick?.(banner);
  };

  return (
    <div className="recommend-banner" onClick={handleClick}>
      <img src={banner.image} alt={banner.title} className="banner-image" />
      {banner.badge && <div className="banner-badge">{banner.badge}</div>}
    </div>
  );
}
