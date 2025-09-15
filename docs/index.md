---
layout: home

hero:
  name: '@arayui/rainy-day'
  text: 雨滴窗口效果库
  tagline: 基于 Three.js 的逼真雨滴窗口特效，为您的网页增添诗意氛围
  image:
    src: /logo.jpg
    alt: any-rainy-day
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看示例
      link: /examples/basic-usage
    - theme: alt
      text: API 文档
      link: /api/

features:
  - title: 🌧️ 逼真雨滴效果
    details: 使用 Three.js 和 WebGL 渲染的高性能雨滴特效，模拟真实雨滴的物理行为
  - title: ⚡ 轻量级设计
    details: 仅 50KB 的压缩包大小，零依赖（Three.js 除外），性能优化到极致
  - title: 🎨 高度可定制
    details: 支持自定义雨滴大小、密度、速度、透明度等参数，打造独特的视觉体验
  - title: 📱 响应式支持
    details: 完美适配各种屏幕尺寸，支持移动端和桌面端
  - title: 🔧 TypeScript 支持
    details: 完整的 TypeScript 类型定义，提供优秀的开发体验
  - title: 🚀 简单易用
    details: 只需几行代码即可集成到现有项目中，支持 CDN 和模块化导入
---

## 快速预览

```typescript
import { RainyWindow } from '@arayui/rainy-day'

// 创建雨滴效果
const rainy = new RainyWindow({
  container: document.getElementById('rainy-container'),
  intensity: 0.5,
  speed: 1.0
})

// 动态调整
rainy.setIntensity(0.8)
rainy.setSpeed(1.5)
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

需要支持 WebGL 的现代浏览器。
