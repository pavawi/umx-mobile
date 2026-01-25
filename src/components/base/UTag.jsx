import './UTag.scss';

export default function UTag({
  type = 'status',
  status = '',
  variant = '',
  children
}) {
  const className = `u-tag u-tag--${type} ${status || variant}`;

  return (
    <span className={className}>
      {children}
    </span>
  );
}
