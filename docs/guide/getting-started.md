# 快速开始

本指南将帮助你快速上手 any-rainy-day 雨滴窗口效果库，了解其基本概念和使用方法。

## 安装

### 使用包管理器安装

```bash
# 使用 npm
npm install any-rainy-day

# 使用 yarn
yarn add any-rainy-day

# 使用 pnpm
pnpm add any-rainy-day
```

### 使用 CDN

```html
<!-- 引入 Three.js -->
<script src="https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js"></script>

<!-- 引入 any-rainy-day -->
<script src="https://cdn.jsdelivr.net/npm/any-rainy-day/dist/any-rainy-day.min.js"></script>
```

## 基础概念

any-rainy-day 是一个基于 Three.js 的逼真雨滴窗口特效库，主要通过 WebGL 渲染高性能的雨滴动画效果。

### 核心特性

- **WebGL 加速**：使用 Three.js 的 WebGL 渲染器，确保流畅的动画效果
- **物理模拟**：模拟真实雨滴的物理行为，包括重力、风力等
- **高度可定制**：支持自定义雨滴外观、行为和交互
- **响应式设计**：自动适应容器大小变化
- **轻量级**：核心代码仅 50KB，零依赖（Three.js 除外）

### 主要组件

- **RainyWindow**：核心类，负责创建和管理整个雨滴效果
- **配置系统**：通过 RainyWindowOptions 接口配置各种参数
- **控制接口**：提供丰富的方法动态调整效果
- **事件系统**：支持容器大小变化、鼠标交互等事件

## 创建第一个雨滴效果

### HTML 结构

首先，创建一个容器元素：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>雨滴窗口效果</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    #rainy-container {
      width: 800px;
      height: 600px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="rainy-container"></div>
  
  <!-- 引入 Three.js -->
  <script src="https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js"></script>
  <!-- 引入 any-rainy-day -->
  <script src="https://cdn.jsdelivr.net/npm/any-rainy-day/dist/any-rainy-day.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

### JavaScript 实现

创建 `main.js` 文件：

```javascript
// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 获取容器元素
  const container = document.getElementById('rainy-container')
  
  // 创建雨滴效果
  const rainy = new RainyWindow({
    container: container,
    intensity: 0.6,      // 中等强度
    speed: 1.0,          // 正常速度
    dropSize: 2.0,       // 中等大小
    opacity: 0.7,        // 透明度 70%
    color: '#ffffff',    // 白色雨滴
    interactive: true,   // 启用鼠标交互
    autoResize: true     // 自动响应大小变化
  })
  
  // 添加事件监听
  rainy.on('mouseenter', () => {
    console.log('鼠标进入雨滴区域')
  })
  
  rainy.on('mouseleave', () => {
    console.log('鼠标离开雨滴区域')
  })
  
  // 窗口大小变化时自动调整
  window.addEventListener('resize', () => {
    // autoResize 已启用，无需手动处理
  })
})
```

### TypeScript 版本

如果你使用 TypeScript：

```typescript
import { RainyWindow, RainyWindowOptions } from 'any-rainy-day'

// 定义配置选项
const options: RainyWindowOptions = {
  container: document.getElementById('rainy-container') as HTMLElement,
  intensity: 0.6,
  speed: 1.0,
  dropSize: 2.0,
  opacity: 0.7,
  color: '#ffffff',
  interactive: true,
  autoResize: true
}

// 创建雨滴效果
const rainy = new RainyWindow(options)

// 添加类型安全的事件监听
rainy.on('resize', (width: number, height: number) => {
  console.log(`容器大小调整为: ${width}x${height}`)
})
```

## 创建交互式控制面板

让我们创建一个更完整的示例，包含控制面板：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>交互式雨滴效果</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      min-height: 100vh;
      font-family: Arial, sans-serif;
    }
    
    .container {
      display: flex;
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .rainy-container {
      flex: 1;
      height: 600px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
    }
    
    .controls {
      width: 300px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      padding: 20px;
      color: white;
    }
    
    .control-group {
      margin-bottom: 15px;
    }
    
    .control-group label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
    }
    
    .control-group input[type="range"] {
      width: 100%;
      margin-bottom: 5px;
    }
    
    .control-group span {
      font-size: 12px;
      opacity: 0.8;
    }
    
    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    button:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <div id="rainy-container" class="rainy-container"></div>
    
    <div class="controls">
      <h3>控制面板</h3>
      
      <div class="control-group">
        <label>雨滴强度</label>
        <input type="range" id="intensity" min="0.1" max="1" step="0.1" value="0.6">
        <span id="intensity-value">0.6</span>
      </div>
      
      <div class="control-group">
        <label>下落速度</label>
        <input type="range" id="speed" min="0.1" max="3" step="0.1" value="1">
        <span id="speed-value">1.0</span>
      </div>
      
      <div class="control-group">
        <label>雨滴大小</label>
        <input type="range" id="dropSize" min="1" max="5" step="0.1" value="2">
        <span id="dropSize-value">2.0</span>
      </div>
      
      <div class="control-group">
        <label>透明度</label>
        <input type="range" id="opacity" min="0.1" max="1" step="0.1" value="0.7">
        <span id="opacity-value">0.7</span>
      </div>
      
      <div class="control-group">
        <label>风力</label>
        <input type="range" id="wind" min="-2" max="2" step="0.1" value="0">
        <span id="wind-value">0.0</span>
      </div>
      
      <div class="control-group">
        <label>背景模糊</label>
        <input type="range" id="blur" min="0" max="10" step="0.5" value="0">
        <span id="blur-value">0.0</span>
      </div>
      
      <div class="button-group">
        <button onclick="pauseRain()">暂停</button>
        <button onclick="resumeRain()">恢复</button>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/any-rainy-day/dist/any-rainy-day.min.js"></script>
  <script>
    let rainy
    
    function initRainy() {
      const container = document.getElementById('rainy-container')
      
      rainy = new RainyWindow({
        container: container,
        intensity: 0.6,
        speed: 1.0,
        dropSize: 2.0,
        opacity: 0.7,
        color: '#ffffff',
        wind: 0.0,
        blur: 0.0,
        interactive: true,
        autoResize: true
      })
      
      // 绑定控制面板
      const controls = ['intensity', 'speed', 'dropSize', 'opacity', 'wind', 'blur']
      controls.forEach(control => {
        const slider = document.getElementById(control)
        const valueSpan = document.getElementById(`${control}-value`)
        
        slider.addEventListener('input', (e) => {
          const value = parseFloat(e.target.value)
          valueSpan.textContent = value.toFixed(1)
          
          switch(control) {
            case 'intensity':
              rainy.setIntensity(value)
              break
            case 'speed':
              rainy.setSpeed(value)
              break
            case 'dropSize':
              rainy.setDropSize(value)
              break
            case 'opacity':
              rainy.setOpacity(value)
              break
            case 'wind':
              rainy.setWind(value)
              break
            case 'blur':
              rainy.setBlur(value)
              break
          }
        })
      })
    }
    
    function pauseRain() {
      if (rainy) rainy.pause()
    }
    
    function resumeRain() {
      if (rainy) rainy.resume()
    }
    
    // 初始化
    document.addEventListener('DOMContentLoaded', initRainy)
  </script>
</body>
</html>
```

## 在框架中使用

### React 集成

```tsx
import React, { useEffect, useRef } from 'react'
import { RainyWindow, RainyWindowOptions } from 'any-rainy-day'

interface RainyBackgroundProps {
  intensity?: number
  speed?: number
  dropSize?: number
  opacity?: number
}

const RainyBackground: React.FC<RainyBackgroundProps> = ({
  intensity = 0.6,
  speed = 1.0,
  dropSize = 2.0,
  opacity = 0.7
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rainyRef = useRef<RainyWindow | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const options: RainyWindowOptions = {
      container: containerRef.current,
      intensity,
      speed,
      dropSize,
      opacity,
      color: '#ffffff',
      interactive: true,
      autoResize: true
    }

    rainyRef.current = new RainyWindow(options)

    return () => {
      if (rainyRef.current) {
        rainyRef.current.destroy()
        rainyRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (rainyRef.current) {
      rainyRef.current.setIntensity(intensity)
      rainyRef.current.setSpeed(speed)
      rainyRef.current.setDropSize(dropSize)
      rainyRef.current.setOpacity(opacity)
    }
  }, [intensity, speed, dropSize, opacity])

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100vh',
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)'
      }} 
    />
  )
}

export default RainyBackground
```

### Vue 3 集成

```vue
<template>
  <div ref="containerRef" class="rainy-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RainyWindow, RainyWindowOptions } from 'any-rainy-day'

interface Props {
  intensity?: number
  speed?: number
  dropSize?: number
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  intensity: 0.6,
  speed: 1.0,
  dropSize: 2.0,
  opacity: 0.7
})

const containerRef = ref<HTMLElement>()
let rainy: RainyWindow | null = null

onMounted(() => {
  if (!containerRef.value) return

  const options: RainyWindowOptions = {
    container: containerRef.value,
    intensity: props.intensity,
    speed: props.speed,
    dropSize: props.dropSize,
    opacity: props.opacity,
    color: '#ffffff',
    interactive: true,
    autoResize: true
  }

  rainy = new RainyWindow(options)
})

onUnmounted(() => {
  if (rainy) {
    rainy.destroy()
    rainy = null
  }
})

// 监听属性变化
watch(() => props.intensity, (newVal) => {
  rainy?.setIntensity(newVal)
})

watch(() => props.speed, (newVal) => {
  rainy?.setSpeed(newVal)
})

watch(() => props.dropSize, (newVal) => {
  rainy?.setDropSize(newVal)
})

watch(() => props.opacity, (newVal) => {
  rainy?.setOpacity(newVal)
})
</script>

<style scoped>
.rainy-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
}
</style>
```

## 性能注意事项

### 优化建议

1. **容器大小**：避免使用过大的容器，建议不超过屏幕尺寸的 80%
2. **雨滴密度**：在移动设备上降低 `intensity` 值
3. **交互效果**：在性能较差的设备上可以关闭 `interactive`
4. **自动调整**：启用 `autoResize` 以适应响应式布局

### 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

需要支持 WebGL 的现代浏览器。

## 下一步

- 查看 [API 文档](/api/) 了解更多详细信息
- 查看 [使用示例](/examples/basic-usage) 了解实际应用场景
- 探索高级配置选项和自定义效果
