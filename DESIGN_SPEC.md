# UMX 数字藏品平台 - 设计规范文档

> 本文档定义了 UMX 数字藏品平台的完整设计系统，供设计和开发参考。

---

## 一、品牌定位

### 核心调性

| 维度 | 描述 |
|------|------|
| **奢华感** | 金色为主色调，体现数字藏品的稀缺性和价值感 |
| **现代感** | 简洁的界面设计，注重留白和层次 |
| **科技感** | 渐变、发光效果体现数字化特性 |
| **信任感** | 清晰的信息展示，区块链信息透明可查 |

### 设计原则

- **移动优先**: 所有设计以移动端为首要考虑
- **触控友好**: 足够大的点击区域（最小 44px），明确的触控反馈
- **一致性**: 统一的视觉语言和交互模式
- **可访问性**: 足够的颜色对比度，清晰的信息层级

---

## 二、色彩系统

### 品牌色 - 金色系

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-primary` | `#D4AF37` | 主金色 - 按钮、强调元素 |
| `--color-primary-light` | `#F4E4BC` | 浅金色 - 背景、边框 |
| `--color-primary-dark` | `#A68B4B` | 深金色 - 悬停状态 |
| `--color-primary-bg` | `rgba(212, 175, 55, 0.06)` | 金色背景 |
| `--color-primary-glow` | `rgba(212, 175, 55, 0.4)` | 金色发光效果 |

### 品牌渐变

```scss
// 主渐变 - 用于重要按钮、标题装饰
--gradient-primary: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #D4AF37 50%, #FCF6BA 75%, #BF953F 100%);

// 金色渐变 - 用于高亮元素
--gradient-gold: linear-gradient(135deg, #B8860B 0%, #D4AF37 25%, #FFD700 50%, #D4AF37 75%, #B8860B 100%);

// 金色闪光 - 用于动画效果
--gradient-gold-shine: linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.3) 50%, transparent 100%);

// 深色渐变 - 用于 Banner、深色背景
--gradient-dark: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);

// 深色卡片渐变
--gradient-dark-card: linear-gradient(145deg, rgba(30, 30, 45, 0.95) 0%, rgba(20, 20, 35, 0.98) 100%);

// 网格背景渐变
--gradient-mesh: radial-gradient(at 40% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
                 radial-gradient(at 80% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);

// 金色边框渐变
--gradient-border-gold: linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(252, 246, 186, 0.3) 50%, rgba(212, 175, 55, 0.5) 100%);
```

### 运营推荐位渐变

| 变量 | 渐变色值 | 用途 |
|------|------|------|
| `--gradient-feature-1` | `#667eea → #764ba2` | 紫色系 - 功能卡片1 |
| `--gradient-feature-2` | `#f093fb → #f5576c` | 粉红系 - 功能卡片2 |
| `--gradient-feature-3` | `#4facfe → #00f2fe` | 青蓝系 - 功能卡片3 |
| `--gradient-badge` | `#EF4444 → #F59E0B` | 红橙渐变 - 徽章 |

### 辅助色

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-secondary` | `#8B5CF6` | 紫色 - 次要强调 |
| `--color-success` | `#10B981` | 成功绿 |
| `--color-warning` | `#F59E0B` | 警告黄 |
| `--color-error` | `#EF4444` | 错误红 |
| `--color-info` | `#6366F1` | 信息蓝 |

### 文字色阶

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-text-primary` | `#1F2937` | 主文字 - 标题、重要信息 |
| `--color-text-secondary` | `#6B7280` | 次要文字 - 描述、说明 |
| `--color-text-tertiary` | `#9CA3AF` | 辅助文字 - 时间、标签 |
| `--color-text-placeholder` | `#9CA3AF` | 占位符 |
| `--color-text-disabled` | `#D1D5DB` | 禁用状态 |
| `--color-text-inverse` | `#FFFFFF` | 反色文字（深色背景上） |

### 背景色

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-bg-primary` | `#FFFFFF` | 页面背景 |
| `--color-bg-secondary` | `#F9FAFB` | 次级背景 |
| `--color-bg-tertiary` | `#F3F4F6` | 三级背景 |
| `--color-bg-card` | `#FFFFFF` | 卡片背景 |

### 边框色

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-border` | `#E5E7EB` | 默认边框 |
| `--color-border-light` | `#F3F4F6` | 浅边框 |
| `--color-divider` | `#E5E7EB` | 分割线 |

### 通知/提示专用色

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-notice-bg` | `#FFF8E6` | 通知背景 |
| `--color-notice-icon` | `#D4AF37` | 通知图标 |
| `--color-notice-text` | `#8C6D1F` | 通知文字 |
| `--color-notice-arrow` | `#C9A24D` | 通知箭头 |
| `--color-badge-dot` | `#EF4444` | 徽章红点 |

### 状态色

| 状态 | 色值 | 应用场景 |
|------|------|------|
| 在售 (selling) | `#EF4444` | 红色徽章 |
| 预售 (presale) | `#F59E0B` | 橙色徽章 |
| 售罄 (soldout) | `#9CA3AF` | 灰色徽章 |

### NFT 稀有度

| 等级 | 渐变色值 |
|------|------|
| 传说 (Legendary) | `#FFD700 → #FFA500` |
| 史诗 (Epic) | `#a855f7 → #7c3aed` |
| 稀有 (Rare) | `#3b82f6 → #1d4ed8` |

### 特殊效果色

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-glass` | `rgba(255, 255, 255, 0.85)` | 毛玻璃效果 |
| `--color-glass-border` | `rgba(255, 255, 255, 0.2)` | 毛玻璃边框 |
| `--color-glass-dark` | `rgba(15, 15, 25, 0.85)` | 深色毛玻璃 |
| `--color-overlay` | `rgba(0, 0, 0, 0.6)` | 遮罩层 |
| `--color-overlay-light` | `rgba(0, 0, 0, 0.3)` | 浅遮罩层 |

---

## 三、字体系统

### 字体族

```scss
--font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
               "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
```

### 字号规范

| 变量 | 大小 | 行高建议 | 用途 |
|------|------|------|------|
| `--font-size-xs` | 10px | 14px | 角标、极小标签 |
| `--font-size-sm` | 12px | 16px | 辅助文字、时间戳 |
| `--font-size-base` | 14px | 20px | 正文、描述文字 |
| `--font-size-md` | 15px | 22px | 强调正文 |
| `--font-size-lg` | 17px | 24px | 小标题、按钮文字 |
| `--font-size-xl` | 20px | 28px | 标题 |
| `--font-size-xxl` | 24px | 32px | 大标题 |
| `--font-size-display` | 32px | 40px | 展示数字、价格 |

### 字重规范

| 变量 | 数值 | 用途 |
|------|------|------|
| `--font-weight-normal` | 400 | 正文内容 |
| `--font-weight-medium` | 500 | 强调文字 |
| `--font-weight-semibold` | 600 | 小标题、次要标题 |
| `--font-weight-bold` | 700 | 大标题、价格数字 |

---

## 四、间距系统

基于 **4px** 为基础单位的间距系统：

| 变量 | 大小 | 用途 |
|------|------|------|
| `--spacing-xs` | 4px | 紧凑间距 - 图标与文字 |
| `--spacing-sm` | 8px | 小间距 - 列表项内部 |
| `--spacing-md` | 12px | 中等间距 - 卡片内边距 |
| `--spacing-base` | 16px | 基础间距 - 通用间距 |
| `--spacing-lg` | 20px | 大间距 - 区块间距 |
| `--spacing-xl` | 24px | 超大间距 - 主要分隔 |
| `--spacing-xxl` | 32px | 特大间距 - 页面级分隔 |

### 页面布局间距

| 变量 | 大小 | 用途 |
|------|------|------|
| `--page-padding` | 16px | 页面左右内边距 |
| `--section-gap` | 20px | 页面区块间距 |
| `--card-gap` | 12px | 卡片之间间距 |

---

## 五、圆角规范

| 变量 | 大小 | 用途示例 |
|------|------|------|
| `--radius-xs` | 4px | 小标签、徽章 |
| `--radius-sm` | 8px | 按钮、输入框、搜索框 |
| `--radius-md` | 12px | 小卡片、弹出菜单 |
| `--radius-lg` | **16px** | 大卡片、藏品卡片（主要使用） |
| `--radius-xl` | 20px | 弹窗、底部面板 |
| `--radius-full` | 9999px | 圆形头像、胶囊按钮 |

---

## 六、阴影规范

### 基础阴影

| 变量 | 效果 | 用途 |
|------|------|------|
| `--shadow-xs` | `0 1px 2px rgba(0, 0, 0, 0.05)` | 极轻阴影 - 细微层次 |
| `--shadow-sm` | `0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)` | 轻阴影 - 按钮、小卡片 |
| `--shadow-md` | `0 4px 12px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)` | 中阴影 - 悬浮元素 |
| `--shadow-lg` | `0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.06)` | 大阴影 - 弹窗 |
| `--shadow-xl` | `0 24px 48px -8px rgba(0, 0, 0, 0.15), 0 12px 16px -4px rgba(0, 0, 0, 0.08)` | 超大阴影 |

### 卡片阴影

| 变量 | 效果 | 用途 |
|------|------|------|
| `--shadow-card` | `0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)` | 卡片默认状态 |
| `--shadow-card-hover` | `0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.1)` | 卡片悬浮状态 |
| `--shadow-top` | `0 -2px 12px rgba(0, 0, 0, 0.04)` | 顶部阴影（底部导航） |

### 发光效果

| 变量 | 效果 | 用途 |
|------|------|------|
| `--shadow-glow` | `0 0 30px rgba(212, 175, 55, 0.2)` | 金色发光 - NFT 展示 |
| `--shadow-glow-strong` | `0 0 40px rgba(212, 175, 55, 0.35)` | 强金色发光 - 重点强调 |
| `--shadow-glow-purple` | `0 0 30px rgba(168, 85, 247, 0.2)` | 紫色发光 |
| `--shadow-glow-blue` | `0 0 30px rgba(56, 189, 248, 0.2)` | 蓝色发光 |
| `--shadow-inner-glow` | `inset 0 0 20px rgba(212, 175, 55, 0.1)` | 内发光 |
| `--shadow-nft` | `0 4px 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(212, 175, 55, 0.08)` | NFT 特效阴影 |

---

## 七、动画规范

### 动画时长

| 变量 | 时长 | 用途 |
|------|------|------|
| `--duration-fast` | 150ms | 快速反馈 - 按钮点击、切换 |
| `--duration-normal` | 250ms | 常规过渡 - 颜色变化、透明度 |
| `--duration-slow` | 350ms | 较慢过渡 - 面板展开、折叠 |
| `--duration-slower` | 500ms | 慢速动画 - 复杂动画序列 |

### 缓动函数

| 变量 | 函数 | 用途 |
|------|------|------|
| `--ease-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | 出场动画 - 元素消失 |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | 双向动画 - 通用过渡 |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 弹性效果 - 按钮反馈 |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | 弹跳效果 - 趣味动画 |

### NFT 特色动画

```scss
// 悬浮效果 - NFT 展示卡片
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
--animation-float: float 3s ease-in-out infinite;

// 闪光效果 - 稀有度展示
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
--animation-shimmer: shimmer 2s linear infinite;

// 脉冲发光 - 关注按钮、重点提示
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.15); }
  50% { box-shadow: 0 0 35px rgba(212, 175, 55, 0.3); }
}
--animation-pulse-glow: pulse-glow 2s ease-in-out infinite;

// 渐变流动 - 加载状态
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 八、响应式断点

| 断点名称 | 宽度 | 设备类型 |
|------|------|------|
| 移动端 | < 768px | 手机（默认） |
| 平板 | ≥ 768px | iPad 竖屏 |
| 桌面 | ≥ 1024px | iPad 横屏 / 桌面 |
| 宽屏 | ≥ 1280px | 宽屏桌面显示器 |

### 响应式变量调整

```scss
// iPad (≥768px)
@media (min-width: 768px) {
  :root {
    --page-padding: 24px;
    --section-gap: 28px;
    --card-gap: 16px;
    --content-max-width: 720px;
    --font-size-base: 15px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
  }
}

// 桌面 (≥1024px)
@media (min-width: 1024px) {
  :root {
    --page-padding: 32px;
    --section-gap: 32px;
    --card-gap: 20px;
    --content-max-width: 960px;
    --container-max-width: 1200px;
  }
}
```

---

## 九、移动端适配

### 安全区域

```scss
--safe-area-bottom: env(safe-area-inset-bottom, 0px);  // 底部安全区（iPhone X+）
--tab-bar-height: 56px;  // 底部导航栏高度
```

### Viewport 配置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### 容器宽度

| 变量 | 默认值 | 用途 |
|------|------|------|
| `--container-max-width` | 100% | 容器最大宽度 |
| `--content-max-width` | 600px | 内容区最大宽度 |

---

## 十、组件设计规范

### CollectionCard 藏品卡片

**变体类型**：
- `default`: 首页展示 - 显示创作者和基础信息
- `market`: 藏品库展示 - 显示发行/在售数量
- `hot`: 热卖展示 - 显示价格和销量

**图片比例支持**：
- `1:1` - 正方形
- `3:4` - 竖版（推荐）
- `4:3` - 横版
- `16:9` - 宽屏

**卡片样式**：
- 圆角: `--radius-lg` (16px)
- 阴影: `--shadow-card`
- 悬浮阴影: `--shadow-card-hover`
- 背景: `--color-bg-card`

**状态徽章**：
| 状态 | 背景色 | 文字色 |
|------|------|------|
| 在售 (selling) | `#EF4444` | `#FFFFFF` |
| 预售 (presale) | `#F59E0B` | `#FFFFFF` |
| 售罄 (soldout) | `#9CA3AF` | `#FFFFFF` |

### USearch 搜索组件

**特性**：
- 搜索历史记录
- 搜索建议自动补全
- 实时清除按钮
- 支持受控/非受控模式

**样式**：
- 背景: `--color-bg-tertiary`
- 圆角: `--radius-sm` (8px)
- 高度: 36px
- 内边距: 12px

### UFilterTabs 筛选标签

**特性**：
- 横向滚动
- 选中状态高亮
- 支持胶囊和文字两种样式

**样式**：
- 选中态: `--color-primary` 文字/边框
- 未选中: `--color-text-secondary`
- 胶囊圆角: `--radius-full`

### TabBar 底部导航

**规格**：
- 高度: 56px
- 图标大小: 24px
- 文字大小: 10px
- 选中色: `--color-primary`
- 未选中色: `--color-text-tertiary`
- 背景: `--color-bg-primary`
- 顶部阴影: `--shadow-top`

---

## 十一、深色模式

系统支持深色模式自动切换，主要变量调整：

```scss
[data-theme="dark"] {
  // 文字色
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #D1D5DB;
  --color-text-tertiary: #9CA3AF;

  // 背景色
  --color-bg-primary: #111827;
  --color-bg-secondary: #1F2937;
  --color-bg-tertiary: #374151;
  --color-bg-card: #1F2937;

  // 边框色
  --color-border: #374151;
  --color-border-light: #4B5563;

  // 阴影增强
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 30px rgba(212, 175, 55, 0.3);
}
```

---

## 十二、CSS 命名规范

### BEM 命名法

```scss
.collection-card {           // Block - 块
  &__image-wrapper { }       // Element - 元素
  &__title { }
  &__price { }
  &__badge {
    &--selling { }           // Modifier - 修饰符
    &--presale { }
    &--soldout { }
  }
}
```

### 状态类

```scss
.is-active { }      // 激活状态
.is-disabled { }    // 禁用状态
.is-loading { }     // 加载状态
.is-selected { }    // 选中状态
.is-expanded { }    // 展开状态
```

---

## 十三、设计检查清单

### 颜色使用
- [ ] 所有颜色使用设计变量，不使用硬编码色值
- [ ] 文字与背景对比度符合 WCAG AA 标准 (≥4.5:1)
- [ ] 品牌金色仅用于强调和关键操作

### 间距布局
- [ ] 使用 4px 倍数的间距系统
- [ ] 页面内边距统一使用 `--page-padding`
- [ ] 卡片间距统一使用 `--card-gap`

### 交互体验
- [ ] 可点击元素最小尺寸 44×44px
- [ ] 按钮有明确的悬浮/按下状态反馈
- [ ] 动画时长和缓动函数使用设计变量

### 组件一致性
- [ ] 卡片圆角统一使用 `--radius-lg`
- [ ] 阴影效果使用预设变量
- [ ] 状态徽章颜色与规范一致

---

## 十四、交互规范（从首页优化提炼）

### 按压反馈

所有可交互元素必须有触觉反馈：

```scss
// 卡片类 - 轻微缩放
&:active { transform: scale(0.98); }

// 按钮/图标类 - 明显缩放
&:active { transform: scale(0.95); }

// 大面积区块（通知条等）- 极轻缩放
&:active { transform: scale(0.99); }
```

### 触控区域扩大技巧

视觉尺寸可以小于 44px，通过 padding/尺寸补偿触控区域：

```scss
// 视觉 20px 图标，44px 触控区
.icon-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -10px; // 视觉补偿边距

  svg { width: 20px; height: 20px; }
}
```

### 选中态过渡

TabBar、Tab 等选中态使用统一过渡：

```scss
transition: all var(--duration-fast) var(--ease-out); // 150ms

// TabBar 选中态示例
&.is-active {
  svg { transform: scale(1.1); }
  span { font-weight: 600; }
  // 金色指示线
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    background: var(--gradient-gold);
    border-radius: 2px;
  }
}
```

---

## 十五、Sticky 定位规范

### Header 吸顶（所有页面必须）

```scss
.page-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 56px;
  background: var(--color-bg-primary);
}
```

### Tab 吸顶（有 Tab 切换的页面必须）

```scss
.page-tabs {
  position: sticky;
  top: 56px; // Header 高度
  z-index: 50;
  padding: 12px 0;
  background: var(--color-bg-primary);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
```

### Sticky 注意事项
- Tab 必须是页面容器的**直接子元素**，不能嵌套在有限高度的父元素中
- 祖先元素不能有 `overflow: hidden`，否则 sticky 失效
- Sticky 元素必须设置不透明 `background`，防止滚动时内容穿透

---

## 十六、品牌色运用模式

### 金色渐变使用场景

| 场景 | 实现方式 |
|------|---------|
| Logo 文字 | `background: var(--gradient-gold); -webkit-background-clip: text; -webkit-text-fill-color: transparent;` |
| Tab 下划线指示器 | `background: var(--gradient-gold);` |
| TabBar 选中指示线 | `background: var(--gradient-gold);` |
| Banner 活跃指示点 | `background: linear-gradient(90deg, #D4AF37, #FFD700);` |

### 品牌色暗示（微妙运用）

| 场景 | 实现方式 |
|------|---------|
| 搜索框边框 | `border: 1px solid rgba(212, 175, 55, 0.08)` |
| 页面氛围渐变 | `radial-gradient(... rgba(212, 175, 55, 0.14) ...)` |
| 通知条背景 | `linear-gradient(135deg, #FFF9E6, #FFF5D6)` |
| 图标背景色 | 功能色 + hex 后缀 `25`（约 15% 透明度） |
| 卡片微边框 | `border: 1px solid rgba(0, 0, 0, 0.04)` |

### 排名数字色

| 名次 | 背景色 | 文字色 |
|------|--------|--------|
| 第 1 名 | `#FF6B35` | `#FFFFFF` |
| 第 2 名 | `#FF9F1C` | `#FFFFFF` |
| 第 3 名 | `#FFD166` | `#FFFFFF` |

---

## 十七、卡片阴影等级（更新）

从首页优化中确立的阴影使用标准：

| 等级 | 变量 | 用途 | 配合边框 |
|------|------|------|---------|
| 信息区块 | `--shadow-sm` | 热卖榜、活动角等功能卡片 | `border: 1px solid rgba(0,0,0,0.04)` |
| 内容卡片 | `--shadow-card` | 藏品卡片、Banner | 无需额外边框 |
| 悬浮状态 | `--shadow-card-hover` | hover / active | 配合 `translateY(-4px)` |
| 品牌强调 | `--shadow-glow` | NFT 特效展示 | 配合金色边框 |

---

## 十八、文字截断策略

| 场景 | 方式 | 实现 |
|------|------|------|
| 卡片标题 | **2 行截断** | `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;` |
| 列表项标题 | 单行截断 | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` |
| 作者名/标签 | 单行截断 + 限宽 | `max-width: 60px; overflow: hidden; text-overflow: ellipsis;` |
| 详情页标题 | 不截断 | 完整展示，自然换行 |

---

## 十九、滚动提示规范

当水平滚动容器有隐藏内容时，**必须**添加渐变遮罩暗示可滚动：

```scss
.scroll-container {
  position: relative;

  // 右侧渐变遮罩
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(to left, var(--color-bg-primary) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }
}
```

同时调整 item 宽度，让最后一个可见项**半露出来**暗示可滑：

```scss
.scroll-item {
  flex-shrink: 0;
  width: calc((100% - 32px) / 4.5); // 显示 4.5 个
}
```

---

## 二十、页面氛围渐变

每个页面顶部添加装饰性金色渐变，增强品牌氛围感：

```scss
.page::before {
  content: '';
  position: absolute; // 用 absolute，不用 fixed（减少重绘）
  top: 0;
  left: 0;
  right: 0;
  height: 240px;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 175, 55, 0.14) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 10%, rgba(139, 92, 246, 0.07) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}
```

参数规范：
- 使用 `position: absolute` 而非 `fixed`
- 高度 240px，集中在首屏
- 金色透明度 0.12~0.15，紫色 0.06~0.08

---

## 二十一、区块间距统一节奏

页面内各一级区块之间使用 **12px** 间距：

```
Header (sticky, 56px)
  ↓ 0px（紧贴）
Banner / 主视觉
  ↓ 12px
通知条 / 公告
  ↓ 12px
功能入口 / 快捷操作
  ↓ 12px
信息卡片 / 排行榜
  ↓ 12px
Tab 区域 (sticky)
  ↓ 0px
内容网格 / 列表
  ↓ padding-bottom: calc(tab-bar + safe-area + 20px)
```

### 禁止事项
- **不要**在不同区块间使用不一致间距（如 4px、10px、14px 混用）
- **不要**用 margin 和 padding 叠加产生非标准间距

---

## 二十二、各页面待对齐 Checklist

基于首页优化经验，其他页面需逐一检查和对齐：

### Hot 热卖页
- [ ] Header 通知图标触控区扩大至 44px（当前 32px）
- [ ] 网格 gap 从 10px 改为 12px
- [ ] 筛选按钮触控区扩大至 44px（当前 36px）
- [ ] "我的关注"按钮触控区扩大（当前 36px）
- [ ] 如有 Tab，添加 sticky 吸顶
- [ ] 卡片标题确认 2 行截断
- [ ] Logo 文字加金色渐变

### Market 藏品库页
- [ ] Header 通知图标触控区扩大至 44px（当前 32px）
- [ ] 网格 gap 从 10px 改为 12px
- [ ] 筛选选择器触控区扩大（当前 36px）
- [ ] 如有筛选条，添加 sticky 吸顶
- [ ] 卡片标题确认 2 行截断
- [ ] Logo 文字加金色渐变

### Detail 详情页
- [ ] Header 返回按钮触控区确认 44px（当前 40px）
- [ ] Tab sticky 间距节奏对齐
- [ ] 购买/出价按钮触控区 >= 44px
- [ ] 价格展示使用品牌色 `--color-primary`

### Profile 个人中心
- [ ] 设置按钮触控区扩大（当前 40px）
- [ ] 菜单项高度确认 >= 44px
- [ ] 邀请按钮触控区扩大
- [ ] 区块间距统一为 12px 节奏

### 全局统一项
- [ ] 所有页面 Header sticky 吸顶
- [ ] 所有页面顶部添加品牌氛围渐变
- [ ] 所有卡片使用 `--shadow-sm` + 微边框
- [ ] 所有 Tab 非选中色使用 `--color-text-secondary`
- [ ] 所有 Tab 选中下划线使用 `--gradient-gold`

---

*文档版本: 2.0*
*最后更新: 2026-02-07*
*更新内容: 新增十四~二十二章，从首页 P0+P1 优化实践中提炼交互规范、品牌色运用、Sticky 定位、文字截断、滚动提示、氛围渐变等可复用模式，以及各页面待对齐 Checklist。*
