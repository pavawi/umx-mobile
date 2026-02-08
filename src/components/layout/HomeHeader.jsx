import './HomeHeader.scss';

/**
 * 统一页面头部组件
 *
 * 默认模式：Logo + 搜索框占位 + 通知图标
 * 搜索模式：传入 searchContent 替代默认内容
 */
export default function HomeHeader({
  hasUnreadNotice = false,
  onNoticeClick,
  onSearchClick,
  searchContent,
}) {
  return (
    <div className="home-header">
      {searchContent ? (
        searchContent
      ) : (
        <>
          {/* Logo */}
          <div className="home-header__logo">
            <img src={`${import.meta.env.BASE_URL}img/黑色logo.png`} alt="UMX" className="logo-img" />
          </div>

          {/* 搜索框 */}
          <div className="home-header__search" onClick={onSearchClick} role="button" tabIndex={0}>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span className="placeholder">搜索藏品、艺术家</span>
          </div>

          {/* 通知图标 */}
          <div className="home-header__notice" onClick={onNoticeClick}>
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
            </svg>
            {hasUnreadNotice && <span className="notice-dot"></span>}
          </div>
        </>
      )}
    </div>
  );
}
