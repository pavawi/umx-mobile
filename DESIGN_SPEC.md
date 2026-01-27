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

*文档版本: 1.0*
*最后更新: 2026-01-26*
