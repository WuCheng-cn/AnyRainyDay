---
layout: home

hero:
  name: any-rainy-day
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

## 🎮 实时演示

<div style="position: relative; height: 400px; margin: 2rem 0; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);">
  <div id="hero-demo" style="width: 100%; height: 100%;"></div>
  <div style="position: absolute; top: 20px; left: 20px; background: rgba(0, 0, 0, 0.7); color: white; padding: 10px 15px; border-radius: 8px; font-size: 14px; z-index: 10;">
    <strong>互动演示</strong><br>
    <span style="font-size: 12px; opacity: 0.8;">移动鼠标查看交互效果</span>
  </div>
  <div style="position: absolute; bottom: 20px; right: 20px; display: flex; gap: 10px; z-index: 10;">
    <button id="demo-intensity" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 16px; border-radius: 6px; cursor: pointer; backdrop-filter: blur(10px); transition: all 0.3s;">调整强度</button>
    <button id="demo-color" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 16px; border-radius: 6px; cursor: pointer; backdrop-filter: blur(10px); transition: all 0.3s;">切换颜色</button>
    <button id="demo-reset" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 8px 16px; border-radius: 6px; cursor: pointer; backdrop-filter: blur(10px); transition: all 0.3s;">重置</button>
  </div>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 确保在浏览器环境中运行
  if (typeof window === 'undefined') return

  // 创建演示容器
  const container = document.getElementById('hero-demo')
  if (!container) return

  // 创建脚本加载器
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.onload = resolve
      script.onerror = reject
      script.src = src
      document.head.appendChild(script)
    })
  }

  // 异步加载 Three.js 和 any-rainy-day
  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.min.js')
  ]).then(() => {
    // 确保库已加载
    if (typeof window.RainyWindow === 'undefined') {
      container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 16px;">加载中...</div>'
      return
    }

    // 创建雨滴效果实例
    const rainy = new window.RainyWindow({
      container: container,
      intensity: 0.5,
      speed: 1.2,
      dropSize: 2.5,
      opacity: 0.7,
      color: '#ffffff',
      interactive: true,
      autoResize: true
    })

    // 演示控制按钮
    const colors = ['#ffffff', '#87ceeb', '#dda0dd', '#90ee90', '#ffcccb']
    let colorIndex = 0

    document.getElementById('demo-intensity')?.addEventListener('click', () => {
      const intensities = [0.3, 0.5, 0.7, 0.9, 1.0]
      const current = intensities.indexOf(rainy.getCurrentIntensity())
      const next = (current + 1) % intensities.length
      rainy.setIntensity(intensities[next])
    })

    document.getElementById('demo-color')?.addEventListener('click', () => {
      colorIndex = (colorIndex + 1) % colors.length
      rainy.setColor(colors[colorIndex])
    })

    document.getElementById('demo-reset')?.addEventListener('click', () => {
      rainy.setIntensity(0.5)
      rainy.setSpeed(1.2)
      rainy.setColor('#ffffff')
      colorIndex = 0
    })

    // 添加鼠标悬停效果
    container.addEventListener('mouseenter', () => {
      rainy.setIntensity(Math.min(rainy.getCurrentIntensity() + 0.2, 1.0))
    })

    container.addEventListener('mouseleave', () => {
      rainy.setIntensity(Math.max(rainy.getCurrentIntensity() - 0.2, 0.3))
    })

  }).catch(error => {
    console.error('Failed to load demo:', error)
    container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 14px;">加载失败，请刷新页面重试</div>'
  })
})
</script>

<style>
@media (max-width: 768px) {
  #hero-demo {
    height: 300px !important;
  }
  
  #hero-demo button {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  #hero-demo > div:first-child {
    font-size: 12px;
    padding: 8px 12px;
  }
}
</style>

## 快速预览

```typescript
import { RainyWindow } from 'any-rainy-day'

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
