# 基础使用示例

本章节将通过完整的示例，展示如何在实际项目中使用 `@arayui/rainy-day` 雨滴窗口效果库，包括各种配置选项、动态控制和高级用法。

## 基础配置示例

### 简单的雨滴背景

创建一个基础的雨滴效果作为页面背景：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>基础雨滴背景</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: white;
    }
    
    .hero {
      position: relative;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .hero-content {
      z-index: 10;
      position: relative;
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    #rainy-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div class="hero">
    <div id="rainy-background"></div>
    <div class="hero-content">
      <h1>欢迎来到雨滴世界</h1>
      <p>基于 Three.js 的逼真雨滴效果</p>
      <button onclick="toggleRain()">切换雨滴</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.mjs"></script>
  <script>
    let rainy
    let isRaining = true

    function initRain() {
      rainy = new window.any.RainyWindow({
        container: document.getElementById('rainy-background'),
        intensity: 0.5,
        speed: 1.2,
        dropSize: 2.5,
        opacity: 0.6,
        color: '#ffffff',
        interactive: true,
        autoResize: true
      })
    }

    function toggleRain() {
      if (isRaining) {
        rainy.pause()
      } else {
        rainy.resume()
      }
      isRaining = !isRaining
    }

    document.addEventListener('DOMContentLoaded', initRain)
  </script>
</body>
</html>
```

## 响应式配置

### 根据屏幕尺寸调整参数

```javascript
function getResponsiveConfig() {
  const width = window.innerWidth
  
  if (width < 768) {
    // 移动设备配置
    return {
      intensity: 0.3,    // 降低强度以提高性能
      speed: 0.8,        // 稍慢的速度
      dropSize: 1.5,     // 较小的雨滴
      opacity: 0.5,      // 降低透明度
      interactive: false  // 关闭交互以节省性能
    }
  } else if (width < 1024) {
    // 平板设备配置
    return {
      intensity: 0.5,
      speed: 1.0,
      dropSize: 2.0,
      opacity: 0.6,
      interactive: true
    }
  } else {
    // 桌面设备配置
    return {
      intensity: 0.7,
      speed: 1.2,
      dropSize: 2.5,
      opacity: 0.7,
      interactive: true
    }
  }
}

// 创建响应式雨滴效果
function createResponsiveRain() {
  const container = document.getElementById('rainy-container')
  const config = getResponsiveConfig()
  
  const rainy = new RainyWindow({
    container: container,
    ...config,
    color: '#ffffff',
    autoResize: true
  })
  
  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    const newConfig = getResponsiveConfig()
    rainy.setIntensity(newConfig.intensity)
    rainy.setSpeed(newConfig.speed)
    rainy.setDropSize(newConfig.dropSize)
    rainy.setOpacity(newConfig.opacity)
  })
  
  return rainy
}
```

## 主题切换示例

### 动态改变雨滴颜色和风格

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>主题切换示例</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      transition: background 0.5s ease;
    }
    
    .theme-selector {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.7);
      padding: 15px;
      border-radius: 10px;
      color: white;
    }
    
    .theme-btn {
      margin: 5px;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .theme-btn:hover {
      transform: scale(1.05);
    }
    
    .theme-btn.active {
      outline: 2px solid white;
    }
    
    #rainy-container {
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <div class="theme-selector">
    <h4>选择主题</h4>
    <button class="theme-btn active" onclick="setTheme('default')">默认</button>
    <button class="theme-btn" onclick="setTheme('blue')">蓝色</button>
    <button class="theme-btn" onclick="setTheme('purple')">紫色</button>
    <button class="theme-btn" onclick="setTheme('green')">绿色</button>
    <button class="theme-btn" onclick="setTheme('warm')">暖色</button>
  </div>
  
  <div id="rainy-container"></div>

  <script src="https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.mjs"></script>
  <script>
    const themes = {
      default: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        rainColor: '#ffffff',
        intensity: 0.6,
        speed: 1.0
      },
      blue: {
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        rainColor: '#87ceeb',
        intensity: 0.7,
        speed: 1.2
      },
      purple: {
        background: 'linear-gradient(135deg, #4b0082 0%, #8b008b 100%)',
        rainColor: '#dda0dd',
        intensity: 0.5,
        speed: 0.9
      },
      green: {
        background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
        rainColor: '#90ee90',
        intensity: 0.6,
        speed: 1.1
      },
      warm: {
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)',
        rainColor: '#ffcccb',
        intensity: 0.4,
        speed: 0.8
      }
    }

    let rainy
    let currentTheme = 'default'

    function initRain() {
      rainy = new RainyWindow({
        container: document.getElementById('rainy-container'),
        ...themes.default,
        dropSize: 2.5,
        opacity: 0.7,
        interactive: true,
        autoResize: true
      })
    }

    function setTheme(themeName) {
      if (!rainy || !themes[themeName]) return
      
      currentTheme = themeName
      const theme = themes[themeName]
      
      // 更新背景
      document.body.style.background = theme.background
      
      // 更新雨滴参数
      rainy.setColor(theme.rainColor)
      rainy.setIntensity(theme.intensity)
      rainy.setSpeed(theme.speed)
      
      // 更新按钮状态
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active')
      })
      event.target.classList.add('active')
    }

    document.addEventListener('DOMContentLoaded', initRain)
  </script>
</body>
</html>
```

## 高级交互示例

### 鼠标跟踪和点击效果

```javascript
class InteractiveRain {
  constructor(container) {
    this.rainy = new RainyWindow({
      container: container,
      intensity: 0.5,
      speed: 1.0,
      dropSize: 2.0,
      opacity: 0.6,
      color: '#ffffff',
      interactive: true,
      autoResize: true
    })
    
    this.setupInteractions()
  }
  
  setupInteractions() {
    let mouseX = 0
    let mouseY = 0
    let isMouseOver = false
    
    // 鼠标移动事件
    this.rainy.on('mouseenter', () => {
      isMouseOver = true
      this.rainy.setIntensity(0.8) // 增强效果
    })
    
    this.rainy.on('mouseleave', () => {
      isMouseOver = false
      this.rainy.setIntensity(0.5) // 恢复默认
    })
    
    // 点击创建涟漪效果
    this.rainy.container.addEventListener('click', (event) => {
      const rect = this.rainy.container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      this.createRippleEffect(x, y)
    })
  }
  
  createRippleEffect(x, y) {
    // 这里可以添加自定义的涟漪效果
    console.log(`点击位置: ${x}, ${y}`)
    
    // 临时增强雨滴密度
    this.rainy.setIntensity(1.0)
    setTimeout(() => {
      this.rainy.setIntensity(isMouseOver ? 0.8 : 0.5)
    }, 500)
  }
  
  destroy() {
    if (this.rainy) {
      this.rainy.destroy()
    }
  }
}

// 使用示例
const container = document.getElementById('interactive-rain')
const rain = new InteractiveRain(container)
```

## 性能监控

### 实时 FPS 显示

```javascript
class PerformanceMonitor {
  constructor(rainy) {
    this.rainy = rainy
    this.fps = 0
    this.frameCount = 0
    this.lastTime = performance.now()
    
    this.createDisplay()
    this.startMonitoring()
  }
  
  createDisplay() {
    this.display = document.createElement('div')
    this.display.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 14px;
      z-index: 10000;
    `
    document.body.appendChild(this.display)
  }
  
  startMonitoring() {
    const update = () => {
      this.frameCount++
      const currentTime = performance.now()
      
      if (currentTime - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
        this.display.innerHTML = `
          FPS: ${this.fps}<br>
          雨滴: ${Math.round(this.rainy.getCurrentIntensity() * 1000)}<br>
          强度: ${this.rainy.getCurrentIntensity().toFixed(2)}
        `
        this.frameCount = 0
        this.lastTime = currentTime
      }
      
      requestAnimationFrame(update)
    }
    update()
  }
  
  destroy() {
    if (this.display) {
      document.body.removeChild(this.display)
    }
  }
}

// 使用示例
const rainy = new RainyWindow({
  container: document.getElementById('rainy-container'),
  intensity: 0.6,
  speed: 1.0,
  dropSize: 2.0,
  opacity: 0.7,
  interactive: true,
  autoResize: true
})

const monitor = new PerformanceMonitor(rainy)
```

## 自定义着色器示例

### 创建自定义雨滴材质

```javascript
// 扩展 RainyWindow 以支持自定义着色器
class CustomRainyWindow extends RainyWindow {
  constructor(options) {
    super(options)
    this.setupCustomShaders()
  }
  
  setupCustomShaders() {
    // 这里可以添加自定义的着色器代码
    // 例如：添加发光效果、颜色渐变等
    
    // 示例：创建发光雨滴效果
    this.createGlowEffect()
  }
  
  createGlowEffect() {
    // 自定义渲染逻辑
    console.log('添加发光效果...')
  }
}

// 使用自定义类
const rainy = new CustomRainyWindow({
  container: document.getElementById('custom-rain'),
  intensity: 0.7,
  speed: 1.2,
  dropSize: 3.0,
  opacity: 0.8,
  color: '#00ffff',
  interactive: true,
  autoResize: true
})
```

## 实际应用案例

### 登录页面背景

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>登录页面</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .login-container {
      position: relative;
      z-index: 10;
    }
    
    .login-form {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      width: 400px;
      max-width: 90%;
    }
    
    .login-form h2 {
      text-align: center;
      margin-bottom: 30px;
      color: white;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: white;
    }
    
    .form-group input {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .form-group input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .login-btn {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.3);
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .login-btn:hover {
      background: rgba(255, 255, 255, 0.4);
    }
    
    #rainy-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div id="rainy-bg"></div>
  
  <div class="login-container">
    <form class="login-form">
      <h2>用户登录</h2>
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" placeholder="请输入用户名">
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" placeholder="请输入密码">
      </div>
      <button type="submit" class="login-btn">登录</button>
    </form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.mjs"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const rainy = new window.any.RainyWindow({
        container: document.getElementById('rainy-bg'),
        intensity: 0.4,
        speed: 0.8,
        dropSize: 2.0,
        opacity: 0.5,
        color: '#ffffff',
        interactive: false, // 登录页面关闭交互
        autoResize: true
      })
    })
  </script>
</body>
</html>
```

## 总结

通过这些示例，我们展示了 any-rainy-day 的多种使用方式：

1. **基础使用**：简单的雨滴背景效果
2. **响应式设计**：根据设备调整参数
3. **主题切换**：动态改变视觉效果
4. **交互增强**：鼠标跟踪和点击效果
5. **性能监控**：实时查看运行状态
6. **实际应用**：登录页面等真实场景

这些示例可以根据你的具体需求进行调整和扩展，创造出独特的雨滴视觉效果。
