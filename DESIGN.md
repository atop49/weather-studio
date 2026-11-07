---
world: 暖纸白天气台 — The Weather Desk
surface: weather-studio
theme: light
tokens:
  color:
    paper: "#f5f1e8"
    ink: "#111111"
    muted: "#8c877d"
    accent: "#ff4d00"
    hairline: "rgba(17,17,17,0.14)"
    hairline-strong: "rgba(17,17,17,0.28)"
    glass: "rgba(255,255,255,0.45)"
  typography:
    display: YouSheBiaoTiHei
    sans: Geist
    mono: Geist Mono
  motion:
    card-enter: 320ms ease-out translateY(10px)
    skeleton-shimmer: 1.4s ease-in-out infinite
---

# Weather Studio — 设计系统

## North Star
一眼知冷暖。整页只有一件大事：当前城市的温度。玻璃拟态在这里不是深蓝紫赛博套路，而是暖纸白上的晨光磨砂——半透明白卡浮在纸色地面上，像窗玻璃后的天气。

## Named Rules
1. **One Big Temperature（一个大温度）** — 每屏只有一个 4.5rem 读数。城市名用 YouShe display，温度用 Geist Mono tabular。禁止第二个大数字争夺注意力。
2. **Glass on Paper（纸上玻璃）** — 卡片永远是 `bg-white/45 + backdrop-blur-md + 1px hairline + 柔和投影`。磨砂是层次不是装饰；地面永远纸白。
3. **Orange Says Go（橙色只做信号）** — 橙 #ff4d00 只用于：搜索提交、选中收藏的左线、收藏激活星标、focus ring。天气本身不许用橙色点缀。
4. **Data Is Quiet（数据安静）** — 湿度/风速/体感是 13px mono 辅助行，图标 14px 1.5px stroke。预报卡最小宽度 7.5rem，横向滚动但不抢戏。

## Component Inventory
- `search-bar` — 透明输入框 + hairline 底线，提交按钮 mono-label 橙字
- `current-card` — 玻璃主卡：display 城市名 + 4.5rem 温度 + 72px OWM 图标 + dl 三行 + 观测时间
- `forecast-strip` — 5 张玻璃小卡横滚：mono 星期 + 日期 + 34px 图标 + max°/min° + 条件
- `favorite-list` — 定位按钮 + 收藏 chips（选中左 3px 橙线 + ring）
- `skeleton` — shimmer 骨架页（卡片/预报条/整页三态）
- `error-box` — role=alert 极简错误框 + 关闭钮

## Do
- 保持暖纸白地面，玻璃卡靠对比显形
- 温度读数用 tabular-nums 防抖动
- 加载/错误/空三态齐全后才算完成
- 中文文案，mono-label 用英文小注

## Don't
- 不引入深蓝紫渐变或暗色玻璃
- 不用 emoji 当天气图标（OWM CDN 图 + 线性图标）
- 不让橙色出现在天气描述或预报卡里
- 不加第二块 backdrop-blur 大面积区域

## Review
- desktop.png — 上海实况：20°C 阴，多云，玻璃卡 + display 城市名 + 5 日预报