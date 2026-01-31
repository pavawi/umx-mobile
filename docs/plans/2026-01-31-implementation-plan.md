# UMX 产品设计评审 - 具体修改方案

> 基于 `2026-01-31-product-design-review.md` 评审意见，针对当前代码库的逐项实施方案。

**基准分支**: main
**日期**: 2026-01-31

---

## 一、P0 优先级（必须做）

### 1. 首页改为策展式信息流

**涉及文件**:
- `src/pages/Home.jsx` (91行，需大幅重构)
- `src/pages/Home.scss`
- `src/components/business/HeroCollection.jsx` (新增)
- `src/components/business/HeroCollection.scss` (新增)
- `src/components/business/CuratedSection.jsx` (新增)
- `src/components/business/CuratedSection.scss` (新增)

**具体修改**:

#### 1.1 新增 Hero 藏品组件 `HeroCollection.jsx`
- 占据首屏 65vh 高度，全宽展示一件精选藏品大图
- 底部叠加半透明渐变遮罩，上方显示藏品名称、创作者、价格
- 支持自动轮播（6s 间隔），底部指示点
- 点击跳转详情页
```
结构：
<div class="hero-collection" style="height: 65vh">
  <img src={item.image} class="hero-collection__image" />
  <div class="hero-collection__overlay">
    <span class="hero-collection__creator">创作者名</span>
    <h2 class="hero-collection__title">藏品名称</h2>
    <span class="hero-collection__price">¥ 299.00</span>
  </div>
  <div class="hero-collection__dots">...</div>
</div>
```

#### 1.2 新增策展区块组件 `CuratedSection.jsx`
- 接收 props: `title`, `subtitle`, `items`, `layout`（"scroll" | "featured"）
- `scroll` 模式：标题 + 横向滚动卡片列表 + "查看更多"箭头
- `featured` 模式：标题 + 一张大卡片（跨两列）+ 两张小卡片
```
结构：
<section class="curated-section">
  <div class="curated-section__header">
    <h3>{title}</h3>
    <span class="curated-section__more">查看更多 →</span>
  </div>
  <div class="curated-section__content curated-section__content--scroll">
    {items.map(item => <CollectionCard />)}
  </div>
</section>
```

#### 1.3 重构 `Home.jsx`
- **删除**: `UFilterTabs`（热卖/推荐 Tab 切换）、`SystemNoticeBar`、2列等宽网格
- **保留**: `HomeHeader`
- **新结构**:
```
HomeHeader
HeroCollection（精选藏品大图，65vh）
CuratedSection title="本周新品" layout="scroll"（横向滚动）
CuratedSection title="即将售罄" layout="featured"（1大+2小）
CuratedSection title="艺术家聚焦" layout="scroll"（横向滚动）
ActivitySection（保留，下移）
```

- 从 mock 数据中取不同子集作为各区块内容
- `SystemNoticeBar` 逻辑合并到 `HomeHeader` 的通知铃铛小红点

#### 1.4 样式修改 `Home.scss`
- 删除 `.home-tabs`、`.collection-grid`（2列等宽）相关样式
- 新增 `.curated-section` 横向滚动样式：`overflow-x: auto; scroll-snap-type: x mandatory;`
- 新增 `.curated-section__content--featured` 网格：`grid-template: "big big" "small1 small2"`

---

### 2. 页面共享元素过渡动画

**涉及文件**:
- `src/App.jsx` (43行)
- `src/styles/global.scss`
- `src/styles/transitions.scss` (新增)
- `src/pages/Detail.jsx` (入场动画)
- `src/components/business/CollectionCard.jsx` (出场动画标记)

**具体修改**:

#### 2.1 使用 View Transitions API（渐进增强方案）
由于 React Router 7 支持 `document.startViewTransition`，采用此方案：

- **`App.jsx`**: 在路由切换时包裹 `startViewTransition`
```jsx
// 在 navigate 时使用
const navigateWithTransition = (to, options) => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      navigate(to, options);
    });
  } else {
    navigate(to, options);
  }
};
```

- **`CollectionCard.jsx`**: 给卡片图片添加 `view-transition-name`
```jsx
<img style={{ viewTransitionName: `collection-${item.id}` }} />
```

- **`Detail.jsx`**: Hero 图片添加匹配的 `view-transition-name`
```jsx
<img style={{ viewTransitionName: `collection-${id}` }} />
```

#### 2.2 新增 `transitions.scss`
```scss
// 共享元素过渡
::view-transition-old(collection-*),
::view-transition-new(collection-*) {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

// 页面默认过渡
::view-transition-old(root) {
  animation: fade-out 200ms ease-out;
}
::view-transition-new(root) {
  animation: fade-in 200ms ease-in;
}
```

#### 2.3 降级方案
- 不支持 View Transitions API 的浏览器直接硬切（当前行为），无感降级
- 可选：用 CSS `@keyframes` 做简单的 slide-in 作为 fallback

---

### 3. 减少金色使用，建立色彩层级

**涉及文件**:
- `src/styles/variables.scss` (317行)
- `src/components/layout/TabBar.jsx` + `.scss`
- `src/pages/Detail.jsx` + `Detail.scss`
- `src/pages/Hot.jsx` + `Hot.scss`
- `src/pages/Market.jsx` + `Market.scss`
- `src/components/base/UFilterTabs.jsx` + `.scss`
- 所有使用 `--color-primary` 的样式文件

**具体修改**:

#### 3.1 新增色彩层级变量 (`variables.scss`)
```scss
// 新增交互层级色彩
--color-accent-navigation: #6B7280;        // 导航激活态 - 深灰
--color-accent-navigation-active: #1F2937; // 导航强激活 - 近黑
--color-accent-brand: #8B5CF6;             // 品牌辅助 - 紫色
--color-accent-value: #D4AF37;             // 价值/购买 - 金色（保留）
```

#### 3.2 TabBar 去金色 (`TabBar.jsx` + `.scss`)
- 激活态图标/文字颜色：`#D4AF37` → `#1F2937`（深灰黑）
- 激活态底部指示条：金色渐变 → `#8B5CF6`（紫色），宽度 20px，圆角
- 非激活态保持 `#9CA3AF`

#### 3.3 UFilterTabs 去金色 (`.scss`)
- Tab 选中态下划线：金色 → `#1F2937`（深灰黑）
- Tab 选中态文字：金色 → `#1F2937`

#### 3.4 Detail 页精简金色 (`Detail.scss`)
- 区块链信息卡片左侧金色边线 → 移除，改用微妙的背景色区分
- 进度条填充色：保留金色（这是"价值"语境）
- Tab 指示器：金色 → `#1F2937`

#### 3.5 金色保留场景（不改）
- 购买按钮（CTA）
- 价格数字
- 稀有度标识
- Hero 藏品的品牌光效

#### 3.6 色彩使用规则文档化
在 `variables.scss` 顶部新增注释：
```scss
// 色彩层级规则：
// 金色(--color-accent-value): 仅用于购买CTA、价格、稀有度
// 紫色(--color-accent-brand): 导航指示器、品牌强调
// 深灰(--color-accent-navigation): Tab文字激活态、次级强调
```

---

## 二、P1 优先级（应该做）

### 4. 详情页图片全屏查看 + 信息层级重组

**涉及文件**:
- `src/pages/Detail.jsx` (505行)
- `src/pages/Detail.scss`
- `src/components/business/ImageViewer.jsx` (新增)
- `src/components/business/ImageViewer.scss` (新增)

**具体修改**:

#### 4.1 新增全屏图片查看器 `ImageViewer.jsx`
- 全屏黑色背景，图片居中
- 支持双指缩放（CSS `touch-action: pinch-zoom` + transform）
- 顶部关闭按钮（X）
- 底部显示藏品名称和编号
```
结构：
<div class="image-viewer" role="dialog">
  <button class="image-viewer__close">✕</button>
  <div class="image-viewer__canvas" style="touch-action: pinch-zoom">
    <img src={src} style={{ transform: `scale(${scale})` }} />
  </div>
  <div class="image-viewer__info">{name} #{number}</div>
</div>
```

#### 4.2 Detail.jsx Hero 图片点击事件
- 点击图片 → 打开 `ImageViewer` 全屏模态
- 模糊背景 blur 值：`60px` → `90px`
- 图片下方增加 16px 间距（呼吸空间）

#### 4.3 信息层级重组 (`Detail.jsx`)
**当前结构** (4个平级卡片):
```
[主信息卡片] [区块链卡片] [作品详情卡片] [交易须知卡片]
```
**改为**:
```
图片
↓ 16px 间距
标题 + 状态标签（非卡片，直接排列）
价格 + 进度条（非卡片，直接排列）
↓ 分割线
"BSN链上认证" 徽章（一行，点击展开区块链详情）
↓ 12px
作品详情卡片（保留）
↓
底部栏（价格 + 购买按钮 + "交易须知"链接文字）
```

- 删除主信息卡片的 `.detail-card` 包裹，改为直接 section
- 区块链信息默认收起，只显示一个 inline 徽章 `"BSN 链上认证 ✓"`，点击展开
- 交易须知从卡片改为底部栏旁的文字链接 `"查看交易须知"`，点击弹出底部面板

#### 4.4 底部栏增强 (`Detail.scss`)
- 增加剩余数量提示：`"仅剩 {remaining} 份"`
- 剩余 <10% 时，数量文字变为 `--color-error` 红色
- 按钮 shine 动画周期：`3s` → `8s`

---

### 5. 市场页筛选收入 Bottom Sheet

**涉及文件**:
- `src/pages/Market.jsx` (246行，需重构筛选逻辑)
- `src/pages/Market.scss`
- `src/components/base/BottomSheet.jsx` (新增)
- `src/components/base/BottomSheet.scss` (新增)

**具体修改**:

#### 5.1 新增 BottomSheet 通用组件
- 从底部滑入的面板，高度自适应（最大 70vh）
- 半透明遮罩，点击关闭
- 拖拽手柄（顶部小横条）
- 支持拖拽关闭
```
结构：
<div class="bottom-sheet__overlay" onClick={onClose}>
  <div class="bottom-sheet__panel">
    <div class="bottom-sheet__handle" />
    <div class="bottom-sheet__header">{title}</div>
    <div class="bottom-sheet__content">{children}</div>
    <div class="bottom-sheet__actions">
      <button>重置</button>
      <button>确定</button>
    </div>
  </div>
</div>
```

#### 5.2 Market.jsx 筛选重构
**当前**: 来源下拉 + 年份下拉 + 排序按钮，始终显示在页面顶部

**改为**:
- 顶部只保留：搜索框 + 筛选图标按钮（漏斗图标）
- 点击筛选图标 → 打开 BottomSheet，内含：
  - 来源选择（横向标签组）
  - 年份选择（横向标签组）
  - 排序选择（单选列表：最新上架 / 价格从低到高 / 价格从高到低）
  - 底部：重置 + 确定按钮
- 已选筛选项以小标签形式显示在搜索框下方，可单独移除

**删除**: `showSourceDropdown`、`showYearDropdown` state 和对应的下拉菜单 JSX

#### 5.3 市场页默认状态优化
- 默认不激活任何筛选，直接展示精选/最新内容
- 搜索框使用 placeholder: `"搜索你感兴趣的藏品"`

---

## 三、P2 优先级（可以做）

### 6. 个人中心重组信息层级

**涉及文件**: `src/pages/Profile.jsx` (241行), `Profile.scss`

**修改**:
- 用户卡片精简：只保留头像 + 昵称 + 实名徽章，删除 UID 和链地址显示
- 资产估值合并到用户卡片右侧，小字金色数字
- 新增顶部三宫格卡片：「我的藏品 12」「余额 ¥500」「交易记录 8」
- 邀请卡片下移到菜单区域下方
- 其余菜单合并为一个"更多服务"可折叠区

### 7. 装饰性动画精简

**涉及文件**: `src/styles/variables.scss`, 各组件 `.scss`

**修改**:
- 删除 `--animation-float` 使用（搜索所有 `animation: float` 引用并移除）
- 删除 `--animation-pulse-glow` 使用
- 保留 `--animation-shimmer` 仅用于骨架屏加载
- 按钮 shine 效果改为只在元素首次进入视口时播放一次（`animation-iteration-count: 1`）
- 保留所有功能性过渡（transition）

### 8. 统一圆角为两级

**涉及文件**: `src/styles/variables.scss`

**修改**:
```scss
// 简化前: xs(4) sm(8) md(12) lg(16) xl(20) full(9999)
// 简化后:
--radius-sm: 8px;     // 按钮、标签、输入框、小元素
--radius-lg: 16px;    // 卡片、面板、弹窗、大容器
--radius-full: 9999px; // 圆形、胶囊（保留）
```
- 全局搜索替换：`--radius-xs` → `--radius-sm`，`--radius-md` → `--radius-sm`，`--radius-xl` → `--radius-lg`
- 删除 `--radius-xs`、`--radius-md`、`--radius-xl` 定义

### 9. 手势交互

**涉及文件**: 各页面组件

**修改**:
- **下拉刷新**: 新增 `usePullToRefresh` hook，在 Home / Market / Hot 页顶部添加下拉指示器（仅视觉效果，mock 数据无需真实刷新，0.5s 后收回）
- **Tab 滑动切换**: Hot 页的 Tab 区域添加 `touch` 事件监听，左右滑动切换
- **详情页图片缩放**: 在 ImageViewer 中通过 `touchstart/touchmove` 计算双指距离实现

### 10. 购买成功开箱动画

**涉及文件**:
- `src/components/business/UnboxAnimation.jsx` (新增)
- `src/components/business/UnboxAnimation.scss` (新增)
- `src/pages/Detail.jsx`

**修改**:
- 点击购买按钮后弹出全屏动画：
  1. 黑色背景淡入
  2. 金色光线从中心扩散（CSS radial-gradient 动画）
  3. 藏品图片从小到大弹入（scale 0.3 → 1 + spring 缓动）
  4. 显示 "恭喜获得" + 藏品名称 + 编号 `#0042/1000`
  5. "查看我的藏品" 按钮
- 动画时长约 2s，纯 CSS 动画 + React state 控制阶段

---

## 四、实施顺序建议

```
阶段 1 - 色彩层级（P0-3）
  ├── 修改 variables.scss 新增层级变量
  ├── TabBar 去金色
  ├── UFilterTabs 去金色
  └── Detail 页 Tab 指示器去金色

阶段 2 - 首页重构（P0-1）
  ├── 新建 HeroCollection 组件
  ├── 新建 CuratedSection 组件
  └── 重构 Home.jsx 页面结构

阶段 3 - 过渡动画（P0-2）
  ├── 新建 transitions.scss
  ├── App.jsx 添加 View Transition 支持
  └── CollectionCard / Detail 添加 view-transition-name

阶段 4 - 详情页优化（P1-4）
  ├── 新建 ImageViewer 组件
  ├── Detail 信息层级重组
  └── 底部栏增强

阶段 5 - 市场页简化（P1-5）
  ├── 新建 BottomSheet 组件
  └── Market.jsx 筛选重构

阶段 6 - P2 项目（按需）
  ├── Profile 重组
  ├── 动画精简
  ├── 圆角统一
  ├── 手势交互
  └── 开箱动画
```

---

## 五、新增文件清单

| 文件路径 | 类型 | 说明 |
|----------|------|------|
| `src/components/business/HeroCollection.jsx` | 业务组件 | 首页 Hero 大图 |
| `src/components/business/HeroCollection.scss` | 样式 | Hero 样式 |
| `src/components/business/CuratedSection.jsx` | 业务组件 | 策展区块 |
| `src/components/business/CuratedSection.scss` | 样式 | 策展区块样式 |
| `src/components/business/ImageViewer.jsx` | 业务组件 | 全屏图片查看 |
| `src/components/business/ImageViewer.scss` | 样式 | 图片查看器样式 |
| `src/components/business/UnboxAnimation.jsx` | 业务组件 | 开箱动画 |
| `src/components/business/UnboxAnimation.scss` | 样式 | 开箱动画样式 |
| `src/components/base/BottomSheet.jsx` | 基础组件 | 底部弹出面板 |
| `src/components/base/BottomSheet.scss` | 样式 | 底部面板样式 |
| `src/styles/transitions.scss` | 样式 | 页面过渡动画 |

## 六、修改文件清单

| 文件路径 | 修改程度 | 说明 |
|----------|----------|------|
| `src/pages/Home.jsx` | 大幅重构 | 策展式信息流 |
| `src/pages/Home.scss` | 大幅重构 | 新布局样式 |
| `src/pages/Detail.jsx` | 中等修改 | 信息层级 + 图片查看 + 底部栏 |
| `src/pages/Detail.scss` | 中等修改 | 去金色 + 新布局 |
| `src/pages/Market.jsx` | 中等修改 | 筛选改 BottomSheet |
| `src/pages/Market.scss` | 中等修改 | 删除下拉样式 |
| `src/pages/Profile.jsx` | 中等修改 | 信息层级重组 |
| `src/pages/Profile.scss` | 中等修改 | 新布局样式 |
| `src/styles/variables.scss` | 小幅修改 | 新增色彩层级 + 圆角简化 |
| `src/styles/global.scss` | 小幅修改 | 引入 transitions.scss |
| `src/components/layout/TabBar.jsx` | 小幅修改 | 激活态颜色 |
| `src/components/layout/TabBar.scss` | 小幅修改 | 去金色 |
| `src/components/base/UFilterTabs.scss` | 小幅修改 | 去金色 |
| `src/components/business/CollectionCard.jsx` | 小幅修改 | view-transition-name |
| `src/App.jsx` | 小幅修改 | View Transition API 接入 |

---

*方案制定日期: 2026-01-31*
