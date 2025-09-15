import type { EnhanceAppContext } from 'vitepress'
import Theme from 'vitepress/theme'
// import { h } from 'vue'
import './style.css'

// 扩展全局window类型
declare global {
  interface Window {
    rainScriptsLoaded?: boolean
    any?: {
      RainyWindow?: any
    }
  }
}

export default {
  ...Theme,
  // Layout() {
  //   return h(Theme.Layout, null, {
  //     // 可以在这里添加额外的插槽内容
  //   })
  // },
  enhanceApp({ router }: EnhanceAppContext) {
    // 添加雨滴演示功能 - 只在客户端执行
    if (typeof window === 'undefined')
      return

    window.addEventListener('load', () => {
      // 只在首页添加演示
      if (window.location.pathname.includes('/AnyRainyDay/') || window.location.pathname === '/') {
        addRainDemo()
      }
    })

    // 监听路由变化
    router.onAfterRouteChange = (to: string) => {
      if (to === '/' || to === '/AnyRainyDay/') {
        setTimeout(addRainDemo, 100)
      }
    }
  },
}

/**
 * 添加雨滴演示到首页
 */
function addRainDemo(): void {
  // 检查是否已经添加
  if (document.querySelector('.rain-demo-container')) {
    return
  }

  // 查找 hero 区域的 logo
  const heroImage = document.querySelector('.VPHero .VPImage')
  if (!heroImage || !heroImage.parentElement) {
    return
  }

  const container = heroImage.parentElement

  // 创建演示容器
  const demoContainer = document.createElement('div')
  demoContainer.className = 'rain-demo-container'
  demoContainer.style.cssText = `
    width: 240px;
    height: 240px;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    position: relative;
    margin: 0 auto;
  `
  demoContainer.innerHTML = `
    <div id="hero-demo" style="width: 100%; height: 100%;"></div>
    <div style="position: absolute; top: 10px; left: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; z-index: 10;">
      互动演示
    </div>
    <div style="position: absolute; bottom: 10px; left: 10px; right: 10px; display: flex; gap: 5px; z-index: 10; justify-content: center;">
      <button id="demo-intensity" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 4px 8px; border-radius: 4px; cursor: pointer; backdrop-filter: blur(10px); font-size: 11px; transition: all 0.3s;">强度</button>
      <button id="demo-color" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 4px 8px; border-radius: 4px; cursor: pointer; backdrop-filter: blur(10px); font-size: 11px; transition: all 0.3s;">颜色</button>
      <button id="demo-reset" style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); padding: 4px 8px; border-radius: 4px; cursor: pointer; backdrop-filter: blur(10px); font-size: 11px; transition: all 0.3s;">重置</button>
    </div>
  `

  // 替换原来的 logo
  container.innerHTML = ''
  container.appendChild(demoContainer)

  // 加载脚本
  loadRainScripts().then(() => {
    initRainDemo()
  }).catch((error: Error) => {
    console.error('Failed to load demo:', error)
    demoContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 14px;">加载失败</div>'
  })
}

/**
 * 加载雨滴效果所需的脚本
 */
function loadRainScripts(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查是否已加载
    if (window.rainScriptsLoaded) {
      resolve()
      return
    }

    const scripts = [
      'https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.min.js',
    ]

    let loaded = 0

    scripts.forEach((src: string) => {
      const script = document.createElement('script')
      script.onload = () => {
        loaded++
        if (loaded === scripts.length) {
          window.rainScriptsLoaded = true
          resolve()
        }
      }
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      script.src = src
      document.head.appendChild(script)
    })
  })
}

/**
 * 初始化雨滴演示
 */
function initRainDemo(): void {
  if (typeof window.any?.RainyWindow === 'undefined') {
    return
  }

  const container = document.getElementById('hero-demo')
  if (!container) {
    return
  }

  // 创建雨滴效果实例
  const rainy = new window.any.RainyWindow({
    container,
    intensity: 0.5,
    speed: 1.2,
    dropSize: 2.5,
    opacity: 0.7,
    color: '#ffffff',
    interactive: true,
    autoResize: true,
  })
  rainy.loadImage('https://picsum.photos/1920/1080')

  // 演示控制按钮
  const colors = ['#ffffff', '#87ceeb', '#dda0dd', '#90ee90', '#ffcccb']
  let colorIndex = 0

  const intensityBtn = document.getElementById('demo-intensity')
  const colorBtn = document.getElementById('demo-color')
  const resetBtn = document.getElementById('demo-reset')

  intensityBtn?.addEventListener('click', () => {
    const intensities = [0.3, 0.5, 0.7, 0.9, 1.0]
    const current = intensities.indexOf(rainy.getCurrentIntensity())
    const next = (current + 1) % intensities.length
    rainy.setIntensity(intensities[next])
  })

  colorBtn?.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length
    rainy.setColor(colors[colorIndex])
  })

  resetBtn?.addEventListener('click', () => {
    rainy.setIntensity(0.5)
    rainy.setSpeed(1.2)
    rainy.setColor('#ffffff')
    colorIndex = 0
  })

  // 添加鼠标悬停效果
  const demoContainer = document.querySelector('.rain-demo-container')
  if (demoContainer) {
    demoContainer.addEventListener('mouseenter', () => {
      rainy.setIntensity(Math.min(rainy.getCurrentIntensity() + 0.2, 1.0))
    })

    demoContainer.addEventListener('mouseleave', () => {
      rainy.setIntensity(Math.max(rainy.getCurrentIntensity() - 0.2, 0.3))
    })
  }
}
