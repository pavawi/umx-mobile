# UMX 数字藏品平台全面优化实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 全面优化 UMX 移动端项目的稳定性、用户体验、代码质量和功能完整性

**Architecture:** 分四阶段实施，优先修复稳定性问题，然后提升体验、重构代码、增强功能。每个阶段独立可交付。

**Tech Stack:** React 19 + Vite + SCSS + React Router DOM 7

---

## 阶段一：修复稳定性问题

### Task 1: 添加全局错误边界组件

**Files:**
- Create: `src/components/base/ErrorBoundary.jsx`
- Create: `src/components/base/ErrorBoundary.scss`
- Modify: `src/App.jsx`

**Step 1: 创建 ErrorBoundary 组件**

```jsx
// src/components/base/ErrorBoundary.jsx
import { Component } from 'react';
import './ErrorBoundary.scss';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__icon">😵</div>
          <h2 className="error-boundary__title">页面出错了</h2>
          <p className="error-boundary__message">
            {this.props.fallbackMessage || '抱歉，页面加载出现问题'}
          </p>
          <button className="error-boundary__btn" onClick={this.handleRetry}>
            重试
          </button>
          <button
            className="error-boundary__btn error-boundary__btn--secondary"
            onClick={() => window.location.href = '/'}
          >
            返回首页
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Step 2: 创建 ErrorBoundary 样式**

```scss
// src/components/base/ErrorBoundary.scss
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-xl);
  text-align: center;
  background: var(--color-bg-primary);

  &__icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
  }

  &__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }

  &__message {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }

  &__btn {
    width: 100%;
    max-width: 200px;
    padding: var(--spacing-md) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-out);
    background: var(--gradient-primary);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);

    &--secondary {
      background: var(--color-bg-tertiary);
      color: var(--color-text-secondary);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
```

**Step 3: 在 App.jsx 中包裹 ErrorBoundary**

修改 `src/App.jsx`：

```jsx
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/base/ErrorBoundary';
import TabBar from './components/layout/TabBar';
import Home from './pages/Home';
import Hot from './pages/Hot';
import Market from './pages/Market';
import Profile from './pages/Profile';
import Detail from './pages/Detail';
import './styles/global.scss';

function AppContent() {
  const location = useLocation();
  const hideTabBar = location.pathname.startsWith('/detail');

  return (
    <div className="app">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hot" element={<Hot />} />
          <Route path="/market" element={<Market />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </ErrorBoundary>
      {!hideTabBar && <TabBar />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
```

**Step 4: 验证**

Run: `npm run dev`
验证：
1. 访问首页，正常显示
2. 在任意组件中临时添加 `throw new Error('test')` 测试错误边界
3. 确认显示错误页面，点击"重试"可恢复

**Step 5: 提交**

```bash
git add src/components/base/ErrorBoundary.jsx src/components/base/ErrorBoundary.scss src/App.jsx
git commit -m "feat: 添加全局错误边界组件

- 创建 ErrorBoundary 类组件捕获渲染错误
- 提供重试和返回首页功能
- 在 App 中包裹路由内容"
```

---

### Task 2: 优化详情页空状态样式

**Files:**
- Modify: `src/pages/Detail.scss`

**说明:** Detail.jsx 已有空状态处理逻辑（第 26-47 行），但样式需要优化。

**Step 1: 添加空状态样式**

在 `src/pages/Detail.scss` 文件末尾添加：

```scss
// 空状态样式
.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: var(--spacing-xl);
  text-align: center;

  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  button {
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--gradient-primary);
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    cursor: pointer;

    &:active {
      transform: scale(0.98);
    }
  }
}
```

**Step 2: 验证**

Run: `npm run dev`
验证：
1. 直接访问 `/#/detail/invalid-id`
2. 确认显示"藏品未找到"并有返回按钮
3. 点击返回按钮正常工作

**Step 3: 提交**

```bash
git add src/pages/Detail.scss
git commit -m "style: 优化详情页空状态样式"
```

---

## 阶段二：提升用户体验

### Task 3: 添加图片懒加载组件

**Files:**
- Create: `src/components/base/LazyImage.jsx`
- Create: `src/components/base/LazyImage.scss`
- Modify: `src/components/business/CollectionCard.jsx`

**Step 1: 创建 LazyImage 组件**

```jsx
// src/components/base/LazyImage.jsx
import { useState, useRef, useEffect } from 'react';
import './LazyImage.scss';

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholder = null,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image ${className}`}>
      {!isLoaded && (
        <div className="lazy-image__placeholder">
          {placeholder || <div className="lazy-image__skeleton" />}
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image__img ${isLoaded ? 'lazy-image__img--loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}
```

**Step 2: 创建 LazyImage 样式**

```scss
// src/components/base/LazyImage.scss
.lazy-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-tertiary);
  }

  &__skeleton {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-bg-tertiary) 25%,
      var(--color-bg-secondary) 50%,
      var(--color-bg-tertiary) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-out);

    &--loaded {
      opacity: 1;
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

**Step 3: 在 CollectionCard 中使用 LazyImage**

修改 `src/components/business/CollectionCard.jsx`：

```jsx
import LazyImage from '../base/LazyImage';
import './CollectionCard.scss';

const statusTextMap = {
  selling: '首发在售',
  presale: '预售中',
  soldout: '已售罄'
};

export default function CollectionCard({
  item,
  variant = 'default',
  onClick
}) {
  const handleClick = () => {
    onClick?.(item);
  };

  return (
    <div className="collection-card" onClick={handleClick}>
      {item.status && (
        <div className={`collection-card__badge badge--${item.status}`}>
          {statusTextMap[item.status] || ''}
        </div>
      )}

      <div className="collection-card__image-wrapper">
        <LazyImage
          src={item.image}
          alt={item.name}
          className="collection-card__image"
        />
        {item.platform && (
          <div className="collection-card__platform">
            <span className="platform-icon">U</span>
            <span>umx.art</span>
          </div>
        )}
      </div>

      <div className="collection-card__content">
        <div className="collection-card__header">
          {item.type && <span className="collection-card__type">{item.type}</span>}
          <h3 className="collection-card__title">{item.name}</h3>
        </div>

        {item.creator && (
          <div className="collection-card__creator">
            {item.creatorAvatar && (
              <img src={item.creatorAvatar} alt={item.creator} className="creator-avatar" />
            )}
            <span>{item.creator}</span>
          </div>
        )}

        <div className="collection-card__footer">
          {variant === 'market' && (
            <>
              <div className="price-row">
                <span className="label">价格</span>
                <span className="value">¥{item.price}</span>
              </div>
              <div className="stock-row">
                <span className="label">在售/流通</span>
                <span className="value">{item.onSale}/{item.total}</span>
              </div>
              {item.lockedCount !== undefined && (
                <div className="locked-row">
                  <span className="label">锁仓数量</span>
                  <span className="value">{item.lockedCount}</span>
                </div>
              )}
            </>
          )}

          {variant === 'hot' && (
            <>
              <div className="info-row">
                <span className="label">{item.typeLabel || '合成藏品'}</span>
              </div>
              <div className="info-row">
                <span className="label">发行份数</span>
                <span className="value">{item.issueCount}</span>
              </div>
            </>
          )}

          {variant === 'default' && item.total && (
            <div className="limit-badge">限量{item.total}份</div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 4: 验证**

Run: `npm run dev`
验证：
1. 打开首页，滚动藏品列表
2. 观察 Network 面板，确认图片是懒加载的（进入视口才请求）
3. 图片加载时有骨架屏动画

**Step 5: 提交**

```bash
git add src/components/base/LazyImage.jsx src/components/base/LazyImage.scss src/components/business/CollectionCard.jsx
git commit -m "feat: 添加图片懒加载组件

- 创建 LazyImage 组件，使用 IntersectionObserver
- 添加骨架屏加载动画
- 在 CollectionCard 中应用懒加载"
```

---

### Task 4: 添加列表骨架屏组件

**Files:**
- Create: `src/components/base/Skeleton.jsx`
- Create: `src/components/base/Skeleton.scss`
- Create: `src/components/business/CollectionCardSkeleton.jsx`

**Step 1: 创建基础 Skeleton 组件**

```jsx
// src/components/base/Skeleton.jsx
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
```

**Step 2: 创建 Skeleton 样式**

```scss
// src/components/base/Skeleton.scss
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-tertiary) 25%,
    var(--color-bg-secondary) 50%,
    var(--color-bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;

  &--rect {
    border-radius: var(--radius-sm);
  }

  &--circle {
    border-radius: 50%;
  }

  &--text {
    border-radius: var(--radius-xs);
  }
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

**Step 3: 创建 CollectionCardSkeleton**

```jsx
// src/components/business/CollectionCardSkeleton.jsx
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
```

**Step 4: 在 CollectionCard.scss 中添加骨架屏样式**

在 `src/components/business/CollectionCard.scss` 中添加：

```scss
// 骨架屏状态
.collection-card--skeleton {
  pointer-events: none;

  .collection-card__content {
    .skeleton-title {
      margin-top: var(--spacing-xs);
    }
  }

  .collection-card__creator {
    gap: var(--spacing-xs);
  }
}
```

**Step 5: 验证**

Run: `npm run dev`
验证：在需要的地方临时使用 `<CollectionCardSkeleton />` 查看效果

**Step 6: 提交**

```bash
git add src/components/base/Skeleton.jsx src/components/base/Skeleton.scss src/components/business/CollectionCardSkeleton.jsx src/components/business/CollectionCard.scss
git commit -m "feat: 添加骨架屏组件

- 创建通用 Skeleton 组件
- 创建 CollectionCardSkeleton 藏品卡片骨架屏"
```

---

## 阶段三：代码重构

### Task 5: 提取搜索防抖 Hook

**Files:**
- Create: `src/hooks/useDebouncedValue.js`
- Modify: `src/pages/Hot.jsx`

**Step 1: 创建 useDebouncedValue Hook**

```jsx
// src/hooks/useDebouncedValue.js
import { useState, useEffect } from 'react';

export default function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

**Step 2: 在 Hot.jsx 中使用防抖**

修改 `src/pages/Hot.jsx` 顶部导入和搜索逻辑：

```jsx
// 添加导入
import useDebouncedValue from '../hooks/useDebouncedValue';

// 在组件内部，searchKeyword 后添加：
const debouncedKeyword = useDebouncedValue(searchKeyword, 300);

// 修改 searchResults 的 useMemo 依赖，将 searchKeyword 替换为 debouncedKeyword：
const searchResults = useMemo(() => {
  if (!debouncedKeyword.trim()) return [];

  const filtered = hotCollections.filter(item =>
    fuzzyMatch(item.name, debouncedKeyword) ||
    fuzzyMatch(item.creator, debouncedKeyword) ||
    fuzzyMatch(item.type, debouncedKeyword) ||
    fuzzyMatch(item.typeLabel, debouncedKeyword)
  );

  if (activeSort === 'price_asc') {
    return [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
  }

  return [...filtered].sort((a, b) => (b.onSale || 0) - (a.onSale || 0));
}, [debouncedKeyword, activeSort]);
```

**Step 3: 验证**

Run: `npm run dev`
验证：
1. 在热卖页搜索框快速输入多个字符
2. 确认列表不会每次按键都刷新，而是停顿后才过滤

**Step 4: 提交**

```bash
git add src/hooks/useDebouncedValue.js src/pages/Hot.jsx
git commit -m "feat: 添加搜索防抖优化

- 创建 useDebouncedValue Hook
- 在 Hot 页面应用防抖搜索"
```

---

### Task 6: 提取搜索历史 Hook（含持久化）

**Files:**
- Create: `src/hooks/useSearchHistory.js`
- Modify: `src/pages/Hot.jsx`

**Step 1: 创建 useSearchHistory Hook**

```jsx
// src/hooks/useSearchHistory.js
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'umx_search_history';
const MAX_HISTORY = 10;

function getStoredHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // localStorage 不可用时静默失败
  }
}

export default function useSearchHistory(initialHistory = []) {
  const [history, setHistory] = useState(() => {
    const stored = getStoredHistory();
    return stored.length > 0 ? stored : initialHistory;
  });

  const addHistory = useCallback((keyword) => {
    if (!keyword?.trim()) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== keyword);
      const newHistory = [keyword, ...filtered].slice(0, MAX_HISTORY);
      setStoredHistory(newHistory);
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setStoredHistory([]);
  }, []);

  const removeHistoryItem = useCallback((keyword) => {
    setHistory((prev) => {
      const newHistory = prev.filter((item) => item !== keyword);
      setStoredHistory(newHistory);
      return newHistory;
    });
  }, []);

  return {
    history,
    addHistory,
    clearHistory,
    removeHistoryItem,
  };
}
```

**Step 2: 在 Hot.jsx 中使用 useSearchHistory**

修改 `src/pages/Hot.jsx`：

```jsx
// 替换 searchHistory 导入和 useState
import useSearchHistory from '../hooks/useSearchHistory';
import { searchHistory as defaultHistory } from '../mock/data';

// 在组件内，替换 history 相关的 useState：
const { history, addHistory, clearHistory } = useSearchHistory(defaultHistory);

// 修改 handleSearch：
const handleSearch = (keyword) => {
  console.log('Search:', keyword);
  addHistory(keyword);
  setIsSearching(!!keyword);
};

// 修改 handleClearHistory：
const handleClearHistory = () => {
  clearHistory();
};

// 删除原来的 setHistory 调用
```

**Step 3: 验证**

Run: `npm run dev`
验证：
1. 搜索一个关键词
2. 刷新页面，确认搜索历史仍然保留
3. 清空历史，刷新后历史为空

**Step 4: 提交**

```bash
git add src/hooks/useSearchHistory.js src/pages/Hot.jsx
git commit -m "feat: 搜索历史持久化

- 创建 useSearchHistory Hook
- 使用 localStorage 存储搜索历史
- 最多保留 10 条记录"
```

---

### Task 7: SVG 图标统一管理

**Files:**
- Modify: `src/components/base/Icons.jsx`
- Modify: `src/pages/Hot.jsx`

**Step 1: 在 Icons.jsx 中添加缺失的图标**

在 `src/components/base/Icons.jsx` 中添加：

```jsx
// 搜索图标
export function IconSearch({ size = 24, color = 'currentColor', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        fill={color}
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      />
    </svg>
  );
}

// 筛选图标
export function IconFilter({ size = 24, color = 'currentColor', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        fill={color}
        d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
      />
    </svg>
  );
}

// 排序箭头（向下）
export function IconSortDown({ size = 24, color = 'currentColor', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path fill={color} d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}

// 排序箭头（向上）
export function IconSortUp({ size = 24, color = 'currentColor', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path fill={color} d="M7 14l5-5 5 5H7z" />
    </svg>
  );
}

// 添加图标
export function IconAdd({ size = 24, color = 'currentColor', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path fill={color} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}

// 勾选图标
export function IconCheck({ size = 24, color = 'currentColor', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        fill={color}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>
  );
}
```

**Step 2: 在 Hot.jsx 中使用图标组件**

修改 `src/pages/Hot.jsx`，替换内联 SVG：

```jsx
// 添加导入
import { IconSearch, IconFilter, IconSortDown, IconSortUp, IconAdd, IconCheck, IconBack } from '../components/base/Icons';

// 替换所有内联 SVG 为组件调用
// 例如：
// 搜索图标
<IconSearch size={20} />

// 筛选图标
<IconFilter size={18} />

// 排序箭头
<IconSortDown size={12} className="sort-icon" />
<IconSortUp size={12} className="sort-icon" />

// 添加图标
<IconAdd size={14} />

// 返回图标
<IconBack size={20} />

// 勾选图标
<IconCheck size={16} />
```

**Step 3: 验证**

Run: `npm run dev`
验证：热卖页所有图标正常显示

**Step 4: 提交**

```bash
git add src/components/base/Icons.jsx src/pages/Hot.jsx
git commit -m "refactor: 统一 SVG 图标管理

- 在 Icons.jsx 中添加缺失图标
- Hot.jsx 使用图标组件替换内联 SVG"
```

---

### Task 8: 为 CollectionCard 添加 React.memo

**Files:**
- Modify: `src/components/business/CollectionCard.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Hot.jsx`

**Step 1: 为 CollectionCard 添加 memo**

修改 `src/components/business/CollectionCard.jsx`：

```jsx
import { memo } from 'react';
import LazyImage from '../base/LazyImage';
import './CollectionCard.scss';

// ... 组件代码保持不变 ...

// 文件末尾，修改导出：
export default memo(CollectionCard);
```

**Step 2: 在 Home.jsx 中使用 useCallback**

修改 `src/pages/Home.jsx`：

```jsx
import { useState, useCallback } from 'react';

// 修改 handleCardClick：
const handleCardClick = useCallback((item) => {
  navigate(`/detail/${item.id}`, { state: { item } });
}, [navigate]);
```

**Step 3: 在 Hot.jsx 中使用 useCallback**

修改 `src/pages/Hot.jsx`：

```jsx
import { useState, useMemo, useCallback } from 'react';

// 修改 handleCardClick：
const handleCardClick = useCallback((item) => {
  navigate(`/detail/${item.id}`, { state: { item } });
}, [navigate]);
```

**Step 4: 验证**

Run: `npm run dev`
验证：使用 React DevTools 的 Profiler 确认卡片组件不会在状态变化时全部重渲染

**Step 5: 提交**

```bash
git add src/components/business/CollectionCard.jsx src/pages/Home.jsx src/pages/Hot.jsx
git commit -m "perf: 添加 CollectionCard memo 优化

- CollectionCard 使用 React.memo
- 父组件使用 useCallback 稳定回调"
```

---

### Task 9: 拆分 Hot.jsx 组件（可选大任务）

**说明:** 这是一个较大的重构任务，可根据时间安排选择执行。

**Files:**
- Create: `src/pages/Hot/index.jsx`
- Create: `src/pages/Hot/HotGridView.jsx`
- Create: `src/pages/Hot/HotSearchView.jsx`
- Create: `src/pages/Hot/MyFollowView.jsx`
- Create: `src/pages/Hot/useHotFilters.js`
- Create: `src/pages/Hot/Hot.scss`
- Delete: `src/pages/Hot.jsx`
- Delete: `src/pages/Hot.scss`
- Modify: `src/App.jsx`

**Step 1: 创建目录和主文件**

```bash
mkdir -p src/pages/Hot
```

**Step 2-6:** 将组件拆分为独立文件（详细代码略，按照单一职责原则拆分）

**验证:** 功能与拆分前一致

**提交:**

```bash
git add src/pages/Hot/
git rm src/pages/Hot.jsx src/pages/Hot.scss
git add src/App.jsx
git commit -m "refactor: 拆分 Hot 页面组件

- 提取 HotGridView 默认网格视图
- 提取 HotSearchView 搜索结果视图
- 提取 MyFollowView 我的关注视图
- 提取 useHotFilters Hook"
```

---

## 阶段四：功能增强

### Task 10: 集成轮播组件库

**Files:**
- Modify: `package.json`（安装 embla-carousel-react）
- Modify: `src/components/business/BannerSwiper.jsx`
- Modify: `src/components/business/BannerSwiper.scss`

**Step 1: 安装依赖**

```bash
npm install embla-carousel-react embla-carousel-autoplay
```

**Step 2: 重写 BannerSwiper 组件**

```jsx
// src/components/business/BannerSwiper.jsx
import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './BannerSwiper.scss';

export default function BannerSwiper({ banners, onBannerClick }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const handleClick = useCallback((banner) => {
    onBannerClick?.(banner);
  }, [onBannerClick]);

  if (!banners?.length) return null;

  return (
    <div className="banner-swiper">
      <div className="banner-swiper__viewport" ref={emblaRef}>
        <div className="banner-swiper__container">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="banner-swiper__slide"
              onClick={() => handleClick(banner)}
            >
              <img src={banner.image} alt={banner.title} />
            </div>
          ))}
        </div>
      </div>
      <div className="banner-swiper__dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className="banner-swiper__dot"
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
```

**Step 3: 更新样式**

```scss
// src/components/business/BannerSwiper.scss
.banner-swiper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;

  &__viewport {
    overflow: hidden;
  }

  &__container {
    display: flex;
  }

  &__slide {
    flex: 0 0 100%;
    min-width: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__dots {
    position: absolute;
    bottom: var(--spacing-sm);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: var(--spacing-xs);
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all var(--duration-fast) var(--ease-out);

    &.is-active {
      width: 16px;
      border-radius: 3px;
      background: var(--color-primary);
    }
  }
}
```

**Step 4: 验证**

Run: `npm run dev`
验证：
1. 首页轮播自动播放
2. 支持手势滑动
3. 指示器同步更新

**Step 5: 提交**

```bash
git add package.json package-lock.json src/components/business/BannerSwiper.jsx src/components/business/BannerSwiper.scss
git commit -m "feat: 集成 Embla Carousel 轮播组件

- 安装 embla-carousel-react 和 autoplay 插件
- 实现自动轮播、手势滑动、循环播放
- 添加指示器"
```

---

### Task 11: 添加无障碍支持

**Files:**
- Modify: `src/components/business/CollectionCard.jsx`
- Modify: `src/components/base/LazyImage.jsx`
- Modify: `src/pages/Hot.jsx`

**Step 1: 为 CollectionCard 添加 ARIA**

```jsx
// 修改 CollectionCard 的根元素：
<div
  className="collection-card"
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabIndex={0}
  aria-label={`${item.name}，创作者 ${item.creator || '未知'}`}
>
```

**Step 2: 为 LazyImage 添加 alt 处理**

```jsx
// LazyImage 组件确保 alt 属性传递给 img
<img
  src={src}
  alt={alt || '图片'}
  // ...
/>
```

**Step 3: 为 Hot.jsx 按钮添加 aria-label**

```jsx
// 搜索触发按钮
<div
  className="search-trigger"
  onClick={() => setIsSearching(true)}
  role="button"
  tabIndex={0}
  aria-label="打开搜索"
>

// 取消按钮
<button className="cancel-btn" onClick={handleCancelSearch} aria-label="取消搜索">
  取消
</button>
```

**Step 4: 验证**

使用屏幕阅读器或浏览器无障碍检查工具验证

**Step 5: 提交**

```bash
git add src/components/business/CollectionCard.jsx src/components/base/LazyImage.jsx src/pages/Hot.jsx
git commit -m "a11y: 添加无障碍支持

- CollectionCard 添加 role、tabIndex、aria-label
- LazyImage 确保 alt 属性
- Hot 页面按钮添加 aria-label"
```

---

### Task 12-14: 进阶优化（可选）

以下任务为进阶优化，可根据需要选择实施：

**Task 12: 虚拟滚动**
- 安装 `@tanstack/react-virtual`
- 在藏品列表中应用虚拟滚动

**Task 13: 图片优化组件**
- 创建 ImageOptimized 组件
- 支持 srcset、WebP 格式检测

**Task 14: 全局状态管理**
- 安装 Zustand
- 创建 useUserStore、useCollectionStore

---

## 验证清单

每个阶段完成后，执行以下验证：

### 阶段一完成验证
- [ ] 访问不存在的详情页显示友好提示
- [ ] 组件报错时显示错误边界而非白屏

### 阶段二完成验证
- [ ] 图片懒加载正常工作
- [ ] 图片加载时显示骨架屏动画

### 阶段三完成验证
- [ ] 搜索有 300ms 防抖
- [ ] 搜索历史刷新后保留
- [ ] 图标正常显示
- [ ] 列表滚动性能流畅

### 阶段四完成验证
- [ ] 轮播自动播放、手势滑动正常
- [ ] 键盘可访问藏品卡片

---

## 总结

**总任务数:** 14 个
**预估工作量:**
- 阶段一：2 个任务
- 阶段二：2 个任务
- 阶段三：5 个任务
- 阶段四：5 个任务

**建议执行顺序:** 按阶段顺序执行，每个阶段完成后验证并提交 PR。

---

*计划创建时间: 2026-01-26*
