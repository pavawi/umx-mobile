import './CategoryFolder.scss';

export default function CategoryFolder({ folders = [], onFolderClick }) {
  if (!folders.length) return null;

  return (
    <div className="category-folder-grid">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className={`category-folder ${folder.isSpecial ? 'category-folder--special' : ''}`}
          onClick={() => onFolderClick?.(folder)}
        >
          <div className="category-folder__cover">
            <img src={folder.cover} alt={folder.name} />
            {folder.isSpecial && (
              <div className="special-badge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#EF4444">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            )}
          </div>
          <div className="category-folder__info">
            <span className="folder-name">{folder.name}</span>
            <div className="folder-meta">
              <span className="folder-total">{folder.totalCount}件</span>
              {folder.onSaleCount > 0 && (
                <span className="folder-sale">{folder.onSaleCount}在售</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
