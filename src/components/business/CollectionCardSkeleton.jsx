import Skeleton from '../base/Skeleton';
import './CollectionCard.scss';

export default function CollectionCardSkeleton() {
  return (
    <div className="collection-card collection-card--skeleton">
      <div className="collection-card__image-wrapper">
        <Skeleton width="100%" height="100%" />
      </div>
      <div className="collection-card__content">
        <div className="collection-card__header">
          <Skeleton width="40px" height="18px" borderRadius="4px" />
          <Skeleton width="80%" height="20px" className="skeleton-title" />
        </div>
        <div className="collection-card__creator">
          <Skeleton variant="circle" width="20px" height="20px" />
          <Skeleton width="60px" height="14px" />
        </div>
        <div className="collection-card__footer">
          <Skeleton width="100%" height="16px" />
        </div>
      </div>
    </div>
  );
}
