import './UFilterTabs.scss';

export default function UFilterTabs({
  tabs = [],
  value,
  onChange,
  scrollable = true
}) {
  return (
    <div className={`u-filter-tabs ${scrollable ? 'is-scrollable' : ''}`}>
      <div className="u-filter-tabs__wrapper">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`u-filter-tabs__item ${value === tab.value ? 'is-active' : ''}`}
            onClick={() => onChange?.(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
