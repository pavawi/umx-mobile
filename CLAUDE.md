# CLAUDE.md - UMX 数字藏品平台移动端

> **项目性质声明**: 本项目主要用于**探讨设计和页面样式**，是一个 UI/UX 设计探索项目。当前使用 Mock 数据，专注于视觉呈现、交互体验和设计系统的完善。

## 项目概述

UMX数字藏品平台移动端是一个基于 React 19 + Vite 的移动端 Web 应用，专注于数字藏品（NFT）的展示和交易体验设计。

**线上预览**: https://pavawi.github.io/umx-mobile/

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 19.2.0 |
| 路由 | React Router DOM | 7.13.0 |
| 样式 | SCSS/Sass | 1.97.3 |
| 构建 | Vite | 7.2.4 |
| 代码规范 | ESLint | 9.39.1 |
| 部署 | GitHub Pages | - |

## 目录结构

```
src/
├── pages/                    # 页面组件
│   ├── Home.jsx             # 首页 - 推荐藏品、轮播、活动入口
│   ├── Hot.jsx              # 热卖页 - 首发/寄售、搜索、筛选
│   ├── Market.jsx           # 藏品库 - 市场浏览、高级筛选
│   ├── Detail.jsx           # 详情页 - 藏品详情、区块链信息
│   ├── Profile.jsx          # 我的 - 用户信息、菜单
│   └── *.scss               # 页面对应样式
├── components/
│   ├── layout/              # 布局组件
│   │   ├── TabBar.jsx       # 底部导航栏
│   │   └── HomeHeader.jsx   # 首页头部
│   ├── base/                # 基础UI组件
│   │   ├── USearch.jsx      # 搜索框（带历史/建议）
│   │   ├── UFilterTabs.jsx  # 横向滚动标签
│   │   ├── UButton.jsx      # 按钮
│   │   ├── UTag.jsx         # 标签
│   │   └── Icons.jsx        # SVG图标库
│   └── business/            # 业务组件
│       ├── CollectionCard.jsx      # 藏品卡片
│       ├── CollectionListItem.jsx  # 藏品列表项
│       ├── BannerSwiper.jsx        # 轮播图
│       ├── ActivitySection.jsx     # 活动区
│       ├── FeatureGrid.jsx         # 功能宫格
│       ├── SystemNoticeBar.jsx     # 系统公告
│       ├── NoticeMarquee.jsx       # 滚动通知
│       ├── BlockchainInfo.jsx      # 区块链信息
│       └── RecommendBanner.jsx     # 推荐横幅
├── styles/
│   ├── variables.scss       # 设计系统变量
│   └── global.scss          # 全局样式
├── mock/
│   └── data.js              # Mock数据
├── App.jsx                  # 根组件（路由配置）
└── main.jsx                 # 应用入口
```

## 路由结构

使用 HashRouter，支持 GitHub Pages 部署：

| 路由 | 组件 | 说明 |
|------|------|------|
| `/` | Home | 首页 |
| `/hot` | Hot | 热卖 |
| `/market` | Market | 藏品库 |
| `/profile` | Profile | 我的 |
| `/detail/:id` | Detail | 藏品详情 |

---

# 设计规范与标准

## 核心设计理念

### 1. 品牌调性
- **奢华感**: 金色为主色调，体现数字藏品的稀缺性和价值感
- **现代感**: 简洁的界面设计，注重留白和层次
- **科技感**: 渐变、发光效果体现数字化特性
- **信任感**: 清晰的信息展示，区块链信息透明可查

### 2. 设计原则
- **移动优先**: 所有设计以移动端为首要考虑
- **触控友好**: 足够大的点击区域，明确的触控反馈
- **一致性**: 统一的视觉语言和交互模式
- **可访问性**: 足够的颜色对比度，清晰的信息层级

## 色彩系统

### 品牌色 - 金色系
```scss
--color-primary: #D4AF37;        // 主金色
--color-primary-light: #F4E4BC;  // 浅金色
--color-primary-dark: #A68B4B;   // 深金色
--color-primary-bg: rgba(212, 175, 55, 0.06);  // 金色背景
--color-primary-glow: rgba(212, 175, 55, 0.4); // 金色发光
```

### 品牌渐变
```scss
--gradient-primary: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #D4AF37 50%, #FCF6BA 75%, #BF953F 100%);
--gradient-gold: linear-gradient(135deg, #B8860B 0%, #D4AF37 25%, #FFD700 50%, #D4AF37 75%, #B8860B 100%);
--gradient-gold-shine: linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.3) 50%, transparent 100%);
```

### 运营推荐位渐变
```scss
--gradient-feature-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  // 紫色系
--gradient-feature-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);  // 粉红系
--gradient-feature-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);  // 青蓝系
--gradient-badge: linear-gradient(135deg, #EF4444 0%, #F59E0B 100%);      // 徽章渐变
```

### 辅助色
```scss
--color-secondary: #8B5CF6;  // 紫色
--color-success: #10B981;    // 成功绿
--color-warning: #F59E0B;    // 警告黄
--color-error: #EF4444;      // 错误红
--color-info: #6366F1;       // 信息蓝
```

### 文字色阶
```scss
--color-text-primary: #1F2937;    // 主文字 - 标题、重要信息
--color-text-secondary: #6B7280;  // 次要文字 - 描述、说明
--color-text-tertiary: #9CA3AF;   // 辅助文字 - 时间、标签
--color-text-placeholder: #9CA3AF; // 占位符
--color-text-disabled: #D1D5DB;   // 禁用状态
--color-text-inverse: #FFFFFF;    // 反色文字
```

### 背景色
```scss
--color-bg-primary: #FFFFFF;   // 页面背景
--color-bg-secondary: #F9FAFB; // 次级背景
--color-bg-tertiary: #F3F4F6;  // 三级背景
--color-bg-card: #FFFFFF;      // 卡片背景
```

### 状态色
```scss
--color-status-selling: #EF4444;  // 在售 - 红色
--color-status-presale: #F59E0B;  // 预售 - 橙色
--color-status-soldout: #9CA3AF;  // 售罄 - 灰色
```

### NFT稀有度色
```scss
--color-rarity-legendary: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);  // 传说
--color-rarity-epic: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);       // 史诗
--color-rarity-rare: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);       // 稀有
```

## 字体系统

### 字体族
```scss
--font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
               "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
```

### 字号规范
| 变量 | 大小 | 用途 |
|------|------|------|
| `--font-size-xs` | 10px | 角标、极小标签 |
| `--font-size-sm` | 12px | 辅助文字、时间 |
| `--font-size-base` | 14px | 正文、描述 |
| `--font-size-md` | 15px | 强调正文 |
| `--font-size-lg` | 17px | 小标题、按钮 |
| `--font-size-xl` | 20px | 标题 |
| `--font-size-xxl` | 24px | 大标题 |
| `--font-size-display` | 32px | 展示数字、价格 |

### 字重规范
```scss
--font-weight-normal: 400;    // 正文
--font-weight-medium: 500;    // 强调
--font-weight-semibold: 600;  // 小标题
--font-weight-bold: 700;      // 大标题、价格
```

## 间距系统

基于 4px 为基础单位的间距系统：

```scss
--spacing-xs: 4px;    // 紧凑间距
--spacing-sm: 8px;    // 小间距
--spacing-md: 12px;   // 中等间距
--spacing-base: 16px; // 基础间距
--spacing-lg: 20px;   // 大间距
--spacing-xl: 24px;   // 超大间距
--spacing-xxl: 32px;  // 特大间距

--page-padding: 16px;  // 页面内边距
--section-gap: 20px;   // 区块间距
--card-gap: 12px;      // 卡片间距
```

## 圆角规范

```scss
--radius-xs: 4px;     // 小标签
--radius-sm: 8px;     // 按钮、输入框
--radius-md: 12px;    // 小卡片
--radius-lg: 16px;    // 大卡片（主要使用）
--radius-xl: 20px;    // 弹窗、面板
--radius-full: 9999px; // 圆形、胶囊
```

## 阴影规范

```scss
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);                                    // 极轻阴影
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);     // 轻阴影
--shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);  // 中阴影
--shadow-lg: 0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.06); // 大阴影
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06);  // 卡片阴影
--shadow-card-hover: 0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.1); // 悬浮阴影
--shadow-glow: 0 0 30px rgba(212, 175, 55, 0.2);        // 金色发光
--shadow-glow-strong: 0 0 40px rgba(212, 175, 55, 0.35); // 强金色发光
--shadow-nft: 0 4px 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(212, 175, 55, 0.08); // NFT特效
```

## 动画规范

### 时长
```scss
--duration-fast: 150ms;    // 快速反馈（按钮点击）
--duration-normal: 250ms;  // 常规过渡
--duration-slow: 350ms;    // 较慢过渡（面板展开）
--duration-slower: 500ms;  // 慢速动画（复杂动画）
```

### 缓动函数
```scss
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);       // 出场动画
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);   // 双向动画
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); // 弹性效果
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); // 弹跳效果
```

### 特色动画
```scss
--animation-float: float 3s ease-in-out infinite;       // 悬浮效果
--animation-shimmer: shimmer 2s linear infinite;        // 闪光效果
--animation-pulse-glow: pulse-glow 2s ease-in-out infinite; // 脉冲发光
```

## 移动端适配

### 安全区域
```scss
--safe-area-bottom: env(safe-area-inset-bottom, 0px);  // 底部安全区
--tab-bar-height: 56px;  // 底部导航高度
```

### Viewport 配置
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

---

# 组件设计规范

## CollectionCard 藏品卡片

支持三种变体：
- `default`: 首页展示，显示创作者和基础信息
- `market`: 藏品库展示，显示发行/在售数量
- `hot`: 热卖展示，显示价格和销量

图片比例支持：`1:1`、`3:4`、`4:3`、`16:9`

状态徽章：
- 在售（selling）: 红色背景
- 预售（presale）: 橙色背景
- 售罄（soldout）: 灰色背景

## USearch 搜索组件

特性：
- 搜索历史记录
- 搜索建议
- 实时清除按钮
- 受控/非受控模式

## UFilterTabs 筛选标签

特性：
- 横向滚动
- 选中状态高亮
- 支持胶囊和文字两种样式

---

# 开发规范

## 命名约定

### 文件命名
- 组件: PascalCase（如 `CollectionCard.jsx`）
- 样式: 与组件同名（如 `CollectionCard.scss`）
- 工具函数: camelCase

### CSS 类命名（BEM）
```scss
.collection-card {           // Block
  &__image-wrapper { }       // Element
  &__title { }
  &__badge {
    &--selling { }           // Modifier
    &--presale { }
  }
}
```

### 状态类
```scss
.is-active { }
.is-disabled { }
.is-loading { }
```

## 组件结构

```jsx
import { useState, useMemo } from 'react';
import './ComponentName.scss';

export default function ComponentName({ prop1, prop2, onAction }) {
  // 1. State
  const [state, setState] = useState(initialValue);

  // 2. Computed values
  const computed = useMemo(() => /* ... */, [dependencies]);

  // 3. Event handlers
  const handleClick = () => { /* ... */ };

  // 4. Render
  return (
    <div className="component-name">
      {/* ... */}
    </div>
  );
}
```

## Git 工作流

### 分支命名
- 功能分支: `claude/feature-description-xxxx`
- 修复分支: `claude/fix-description-xxxx`

### 提交信息格式
```
类型: 简短描述

- 详细说明1
- 详细说明2
```

类型：
- `feat`: 新功能
- `fix`: 修复
- `style`: 样式调整
- `refactor`: 重构
- `docs`: 文档
- `chore`: 构建/工具

### 自动化流程
- `claude/*` 分支推送后自动创建 PR
- PR 自动合并到主分支
- 合并后自动部署到 GitHub Pages

---

# AI 助手指南

## 修改代码时的注意事项

1. **优先使用设计变量**: 所有颜色、间距、字号必须使用 `variables.scss` 中定义的变量
2. **遵循 BEM 命名**: 新组件样式必须遵循 BEM 命名规范
3. **移动端优先**: 确保触控区域足够大（最小 44px）
4. **保持一致性**: 参考现有组件的结构和样式

## 常见任务

### 添加新页面
1. 在 `src/pages/` 创建组件文件和样式文件
2. 在 `App.jsx` 添加路由
3. 如需底部导航，更新 `TabBar.jsx`

### 添加新组件
1. 确定组件层级（layout/base/business）
2. 创建组件文件和样式文件
3. 导出供其他组件使用

### 修改设计系统
1. 更新 `src/styles/variables.scss`
2. 确保所有使用旧变量的组件同步更新

## 代码质量要求

- 使用函数式组件和 Hooks
- 避免不必要的重渲染（合理使用 useMemo/useCallback）
- 保持组件单一职责
- 样式与组件文件一一对应

## 构建和测试

```bash
# 开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

---

# 项目状态

## 已完成功能
- [x] 首页 - 轮播、活动入口、推荐藏品
- [x] 热卖页 - 首发/寄售Tab、搜索、筛选、我的关注
- [x] 藏品库 - 分类浏览、排序筛选
- [x] 详情页 - 藏品信息、区块链数据
- [x] 个人中心 - 用户信息、功能菜单
- [x] 设计系统 - 完整的色彩、字体、间距规范

## 待优化项
- [ ] 真实 API 对接
- [ ] 状态管理升级（Context API 或 Zustand）
- [ ] 图片懒加载和优化
- [ ] 骨架屏加载状态
- [ ] 国际化支持

---

*最后更新: 2026-01-26*
