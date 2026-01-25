import { useState, useEffect, useRef } from 'react';
import './USearch.scss';

export default function USearch({
  placeholder = '搜索藏品',
  value = '',
  onChange,
  onSearch,
  suggestions = [],
  history = [],
  onClearHistory,
  onSelectSuggestion,
  onSelectHistory
}) {
  const [keyword, setKeyword] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setKeyword(value);
  }, [value]);

  const handleInput = (e) => {
    const val = e.target.value;
    setKeyword(val);
    onChange?.(val);
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      onSearch?.(keyword.trim());
      setShowDropdown(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setKeyword('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleSelectSuggestion = (item) => {
    setKeyword(item.name || item);
    onSelectSuggestion?.(item);
    setShowDropdown(false);
  };

  const handleSelectHistory = (item) => {
    setKeyword(item);
    onSelectHistory?.(item);
    setShowDropdown(false);
  };

  return (
    <div className="u-search">
      <div className="u-search__input-wrapper">
        <svg className="icon-search" viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          placeholder={placeholder}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {keyword && (
          <button className="btn-clear" onClick={handleClear}>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        )}
        <button className="btn-search" onClick={handleSearch}>搜索</button>
      </div>

      {showDropdown && (suggestions.length > 0 || history.length > 0) && (
        <div className="u-search__dropdown">
          {suggestions.length > 0 ? (
            <>
              <div className="dropdown-title">搜索建议</div>
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  {item.name || item}
                </div>
              ))}
            </>
          ) : history.length > 0 ? (
            <>
              <div className="dropdown-title">
                搜索历史
                <span className="clear-history" onClick={onClearHistory}>清空</span>
              </div>
              {history.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSelectHistory(item)}
                >
                  {item}
                </div>
              ))}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
