import './UButton.scss';

export default function UButton({
  type = 'primary',
  active = false,
  disabled = false,
  children,
  onClick,
  className = '',
  ...props
}) {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`u-button u-button--${type} ${active ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
