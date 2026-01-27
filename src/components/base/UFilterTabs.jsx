import './UFilterTabs.scss';

export default function UFilterTabs({
  tabs = [],
  value,
  onChange,
  scrollable = true,
  variant = 'pill' // 'pill' | 'underline'
}) {
  return (
    <div className={`u-filter-tabs ${scrollable ? 'is-scrollable' : ''} u-filter-tabs--${variant}`}>
      <div className="u-filter-tabs__wrapper">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`u-filter-tabs__item ${value === tab.value ? 'is-active' : ''}`}
            onClick={() => onChange?.(tab.value)}
          >
            <span className="u-filter-tabs__label">{tab.label}</span>
            {variant === 'underline' && value === tab.value && (
              <span className="u-filter-tabs__indicator" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
