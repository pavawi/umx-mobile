import './Skeleton.scss';

export default function Skeleton({
  width,
  height,
  borderRadius,
  className = '',
  variant = 'rect', // 'rect' | 'circle' | 'text'
}) {
  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
    borderRadius: borderRadius || (variant === 'circle' ? '50%' : undefined),
  };

  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`}
      style={style}
    />
  );
}
