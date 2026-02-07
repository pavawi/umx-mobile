# UMX 数字藏品平台 - 设计一致性审查报告

> 审查日期: 2026-02-07
> 审查范围: 全平台 4 个页面（首页/市场/详情/个人中心）+ 核心组件
> 审查依据: `DESIGN_SPEC.md` + `variables.scss`
> 备注: 藏品库页面（Market.jsx）已无入口导航，本次审查中已清理删除

---

## 一、审查总结

| 维度 | 评分 | 说明 |
|------|------|------|
| 色彩系统 | ★★★★☆ | variables.scss 定义完整，但部分页面存在硬编码色值 |
| 字体系统 | ★★★☆☆ | 字号使用不够统一，大量直接写 px 而非变量 |
| 间距系统 | ★★★☆☆ | 间距使用混乱，非 4px 倍数间距和非变量使用较多 |
| 圆角系统 | ★★★★☆ | 主要场景使用变量，少量硬编码 |
| 阴影系统 | ★★★★☆ | 统一度较高，基本使用 CSS 变量 |
| Header 一致性 | ★★★★☆ | 首页/市场复用 HomeHeader，详情页和个人中心合理独立 |
| Tab 组件 | ★★★☆☆ | 首页和详情页 Tab 实现方式完全不同 |
| 触控区域 | ★★★★☆ | 大部分已修复至 44px，少量待补 |
| 品牌氛围 | ★★★★☆ | 金色氛围渐变已统一应用到主要页面 |
| 交互反馈 | ★★★★☆ | active 状态普遍有反馈，较为一致 |

---

## 二、P0 级问题（必须修复 — 影响平台统一感）

### P0-1: 首页网格间距违反规范

**规范要求**（DESIGN_SPEC 二十一章）：`--card-gap: 12px`

| 页面 | grid gap | 是否使用变量 | 是否符合规范 |
|------|----------|------------|------------|
| 首页 | `14px` | ❌ 硬编码 | ❌ 应为 12px |
| 市场（热卖） | `var(--card-gap)` | ✅ | ✅ |

**修复**：
```scss
// Home.scss L108
gap: 14px; → gap: var(--card-gap);
```

---

### P0-2: 详情页 Tab 指示器样式与首页不一致

**首页 Tab**（UFilterTabs underline 模式）：
- 指示器：`background: var(--gradient-gold)` — 金色渐变
- 非选中：`color: var(--color-text-secondary)` — 次要文字色
- 选中：`color: var(--color-primary)` — 品牌金色

**详情页 Tab**（自行实现）：
- 指示器：`background: var(--color-primary)` — 纯金色（非渐变）❌
- 非选中：`color: var(--detail-text-tertiary)` — 三级文字色（比规范更浅）❌
- 选中：`color: var(--color-primary)` — ✅

**规范要求**（DESIGN_SPEC 二十二章）：
> 所有 Tab 选中下划线使用 `--gradient-gold`
> 所有 Tab 非选中色使用 `--color-text-secondary`

**修复**：
```scss
// Detail.scss L267
background: var(--color-primary); → background: var(--gradient-gold);

// Detail.scss L258
color: var(--detail-text-tertiary); → color: var(--color-text-secondary);
```

---

## 三、P1 级问题（应修复 — 影响视觉精细度）

### P1-1: 字号大量硬编码，未使用设计变量

**规范要求**：所有字号使用 `--font-size-*` 变量

**违反统计**（抽样）：

| 文件 | 硬编码字号 | 应使用变量 |
|------|-----------|-----------|
| Home.scss L139 | `font-size: 15px` | `var(--font-size-md)` |
| Home.scss L80 | `font-size: 11px` | 无对应变量（非标准值） |
| Profile.scss L46 | `font-size: 17px` | `var(--font-size-lg)` |
| Profile.scss L128 | `font-size: 18px` | 无标准变量（在 lg 和 xl 之间） |
| CollectionCard.scss L83 | `font-size: 14px` | `var(--font-size-base)` |
| CollectionCard.scss L99 | `font-size: 12px` | `var(--font-size-sm)` |
| Detail.scss L389 | `font-size: 24px` | `var(--font-size-xxl)` |
| Detail.scss L459 | `font-size: 36px` | 无对应变量（超出 display） |

**建议**：
- 逐步替换所有硬编码字号为 CSS 变量
- `11px` 不在设计系统中，应统一为 `10px (xs)` 或 `12px (sm)`
- 考虑增加 `--font-size-xxxl: 36px` 覆盖详情页价格超大字号场景

---

### P1-2: 字重大量硬编码

| 文件 | 硬编码字重 | 应使用变量 |
|------|-----------|-----------|
| Home.scss L138 | `font-weight: 700` | `var(--font-weight-bold)` |
| Home.scss L80 | `font-weight: 500` | `var(--font-weight-medium)` |
| Profile.scss L129 | `font-weight: 700` | `var(--font-weight-bold)` |
| CollectionCard.scss L84 | `font-weight: 600` | `var(--font-weight-semibold)` |

**建议**：全部替换为 `--font-weight-*` 变量

---

### P1-3: 间距使用不统一，非标准间距频繁出现

**规范要求**：基于 4px 倍数间距，使用 `--spacing-*` 变量

**违反案例**：

| 文件 | 位置 | 实际值 | 问题 |
|------|------|--------|------|
| Home.scss L34 | `.quick-entries` padding | `14px` | 非 4px 倍数 |
| Home.scss L44 | `.entry-item` gap | `6px` | 非 4px 倍数 |
| Profile.scss L87 | `.user-header` gap | `14px` | 非 4px 倍数 |
| Profile.scss L123 | `.name-row` margin-bottom | `6px` | 非 4px 倍数 |
| CollectionCard.scss L67 | `.content` gap | `8px` | 应使用 `var(--spacing-sm)` |
| CollectionCard.scss L68 | `.content` padding | `12px` | 应使用 `var(--spacing-md)` |
| Hot.scss L97 | `.filter-section` gap | `10px` | 非 4px 倍数 |

**建议**：
- 将 `6px` 统一为 `4px` 或 `8px`
- 将 `10px` 统一为 `8px` 或 `12px`
- 将 `14px` 统一为 `12px` 或 `16px`
- 所有间距使用 `var(--spacing-*)` 变量

---

### P1-4: 圆角部分硬编码

| 文件 | 位置 | 硬编码值 | 应使用变量 |
|------|------|---------|-----------|
| Hot.scss L117 | `.my-follow-btn` | `border-radius: 20px` | `var(--radius-xl)` |
| Hot.scss L200 | `.sort-item` | `border-radius: 20px` | `var(--radius-xl)` |
| Profile.scss L76 | `.user-card` | `border-radius: 16px` | `var(--radius-lg)` |
| Profile.scss L209 | `.asset-card` | `border-radius: 16px` | `var(--radius-lg)` |

**建议**：统一使用 `--radius-*` 变量

---

### P1-5: 热卖页 sort-filter-bar 样式可复用

热卖页的 `.sort-filter-bar` 样式（约 60 行）是独立实现的。如果将来其他页面也需要排序筛选功能，建议提取为公共 SCSS mixin 或独立组件。

---

## 四、P2 级问题（建议修复 — 提升代码质量）

### P2-1: TabBar 使用硬编码颜色常量

TabBar.jsx 中：
```jsx
const PRIMARY_COLOR = '#D4AF37';
const INACTIVE_COLOR = '#9CA3AF';
```

这些值应该通过 CSS 变量传递。如果品牌色发生变化，JS 和 CSS 需要双重修改。

**建议**：使用 `currentColor` + CSS class 控制颜色，而非 JS 常量

---

### P2-2: TabBar 高度与规范不完全一致

**规范要求**：`--tab-bar-height: 56px`

**实际实现**：TabBar.scss `.tab-bar` 的 `height: 60px`（含 8px padding-top），视觉高度大于规范的 56px。

---

### P2-3: 页面背景色不完全统一

| 页面 | 背景色 |
|------|--------|
| 首页 | `var(--color-bg-primary)` (#FFFFFF) |
| 市场（热卖） | `var(--color-bg-secondary)` (#F9FAFB) |
| 详情页 | `var(--color-bg-secondary)` |
| 个人中心 | `var(--color-bg-secondary)` (#F9FAFB) |

**分析**：首页为纯白，其他为浅灰。首页因有 Banner/轮播等大图区域使用纯白可理解，但不完全统一。

---

### P2-4: 动画时长/缓动函数部分硬编码

| 文件 | 硬编码值 | 应使用变量 |
|------|---------|-----------|
| Profile.scss L422 | `0.3s ease-out` | `var(--duration-slow) var(--ease-out)` |
| Detail.scss L301 | `0.25s var(--ease-out)` | `var(--duration-normal) var(--ease-out)` |
| Detail.scss L176 | `0.6s var(--ease-out)` | 无对应变量（比 slower 还慢） |

---

### P2-5: 热卖页 .my-follow-header .back-btn 触控区不达标

Hot.scss L370-376:
```scss
.back-btn {
  padding: 4px;  // 视觉区域远小于 44px
}
```

需要扩大到 44×44px 最小触控区域。

---

### P2-6: 详情页定义了大量页面级 CSS 变量

Detail.scss 定义了 `--detail-*` 系列变量（约 20 个），本质上是对全局变量的别名。增加了维护成本，但提供了主题隔离能力。可接受但需注意深色模式下卡片背景与其他页面不一致。

---

## 五、跨页面一致性检查矩阵

| 检查项 | 首页 | 市场（热卖） | 详情页 | 个人中心 |
|--------|------|-------------|--------|----------|
| Header sticky | ✅ | ✅ | ✅ fixed | ✅ |
| Header 高度 56px | ✅ | ✅ | ~68px(+safe) | ✅ |
| 品牌氛围渐变 | ✅ | ✅ | ❌(沉浸式) | ✅ |
| Logo 金色渐变 | ✅ | ✅ | N/A | N/A |
| 通知图标 44px | ✅ | ✅ | N/A | N/A |
| 网格 gap 12px | ❌ 14px | ✅ | N/A | N/A |
| 卡片阴影 shadow-card | ✅ | ✅ | ✅ | ✅ |
| 卡片圆角 radius-lg | ✅ | ✅ | ✅ radius-xl | ✅ |
| 页面 padding 16px | ✅ | ✅ | ✅ | ✅ |
| Tab 金色渐变指示器 | ✅ | N/A | ❌ 纯色 | N/A |
| active 反馈 | ✅ | ✅ | ✅ | ✅ |
| 触控区 ≥44px | ✅ | ★大部分 | ✅ | ✅ |

---

## 六、修复优先级路线图

### 第一批（P0 — 立即修复，约 30min）

1. **首页网格 gap 修正** — `14px → var(--card-gap)`
2. **详情页 Tab 指示器** — 改为 `var(--gradient-gold)`
3. **详情页 Tab 非选中色** — 改为 `var(--color-text-secondary)`

### 第二批（P1 — 本周修复，约 3h）

4. 全局字号变量替换（影响面最大，逐文件进行）
5. 全局字重变量替换
6. 全局间距规范化（消除非 4px 倍数值）
7. 全局圆角变量替换

### 第三批（P2 — 后续迭代，约 2h）

8. TabBar JS 硬编码颜色改为 CSS 变量
9. TabBar 高度对齐规范
10. 动画时长变量规范化
11. 详情页 CSS 变量整理

---

## 七、代码级修复清单

### Home.scss

| 行号 | 当前值 | 修改为 |
|------|--------|--------|
| L108 | `gap: 14px` | `gap: var(--card-gap)` |

### Detail.scss

| 行号 | 当前值 | 修改为 |
|------|--------|--------|
| L267 | `background: var(--color-primary)` | `background: var(--gradient-gold)` |
| L258 | `color: var(--detail-text-tertiary)` | `color: var(--color-text-secondary)` |

### TabBar.jsx

| 行号 | 当前值 | 修改为 |
|------|--------|--------|
| L6-7 | `const PRIMARY_COLOR = '#D4AF37'` | 改用 CSS 变量 + currentColor |

---

*文档版本: 1.1*
*审查工具: 源码静态分析*
*变更: 移除已删除的藏品库(Market)页面相关内容*
