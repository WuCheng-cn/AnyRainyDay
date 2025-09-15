# @arayui/rainy-day 🌧️

`@arayui/rainy-day` 是一个基于 Three.js 实现的雨滴窗口效果库，通过 WebGL 着色器技术创建逼真的雨滴落在窗户上的视觉效果。支持背景图片和视频，提供丰富的参数控制接口。

[📖 在线文档](https://wucheng-cn.github.io/AnyRainyDay/) | [📦 NPM包](https://www.npmjs.com/package/@arayui/rainy-day)

## 主要功能 ✨

- **逼真雨滴效果**：基于 GLSL 着色器实现的高质量雨滴视觉效果
- **背景支持**：支持图片和视频作为背景
- **丰富参数控制**：提供 10+ 个可配置参数，实时调整效果
- **性能优化**：支持 FPS 限制和性能调节
- **TypeScript 支持**：完整的类型定义和类型安全
- **零依赖**：除 Three.js 外无其他依赖

## 参数配置 🎛️

| 参数 | 描述 | 范围 | 默认值 |
|------|------|------|--------|
| intensity | 雨滴强度 | 0-1 | 0.4 |
| speed | 雨滴速度 | 0-10 | 0.25 |
| brightness | 亮度调节 | 0-1 | 0.8 |
| normal | 法线强度 | 0-3 | 0.5 |
| zoom | 缩放比例 | 0.1-3 | 2.61 |
| blurIntensity | 模糊强度 | 0-10 | 0.5 |
| blurIterations | 模糊迭代次数 | 1-64 | 16 |
| panning | 平移效果开关 | boolean | false |
| postProcessing | 后处理开关 | boolean | true |
| lightning | 闪电效果开关 | boolean | false |
| textureFill | 纹理填充开关 | boolean | true |
| fps | 帧率设置 | 15-120 | 30 |

## 安装 📦

使用 pnpm 安装：

```bash
pnpm install @arayui/rainy-day
```

或者使用 npm：

```bash
npm install @arayui/rainy-day
```

## 使用示例 🚀

### 基础用法

```typescript
import { RainyWindow } from '@arayui/rainy-day'
```
// 创建雨滴效果
const container = document.getElementById('rain-container')
const rainyWindow = new RainyWindow(container)

// 加载背景图片
await rainyWindow.loadImage('path/to/image.jpg')

// 调整参数
rainyWindow.setIntensity(0.6)
rainyWindow.setSpeed(0.5)
```

### 使用配置选项

```typescript
import { RainyWindow } from '@arayui/rainy-day'
```
const container = document.getElementById('rain-container')
const rainyWindow = new RainyWindow(container, {
  intensity: 0.5,
  speed: 0.3,
  brightness: 0.9,
  normal: 1.2,
  zoom: 2.0,
  blurIntensity: 0.3,
  blurIterations: 8,
  postProcessing: true,
  lightning: true,
  fps: 60
})

// 加载背景视频
await rainyWindow.loadVideo('path/to/video.mp4')
```

### 动态控制效果

```typescript
// 实时调整参数
const gui = new dat.GUI()
gui.add({ intensity: 0.4 }, 'intensity', 0, 1).onChange((value) => {
  rainyWindow.setIntensity(value)
})

// 切换效果
rainyWindow.setLightning(true) // 启用闪电
rainyWindow.setPanning(true)   // 启用平移
rainyWindow.setPostProcessing(false) // 禁用后处理
```


### CDN使用方式

如果你想通过CDN方式使用，可以直接引入UMD格式的文件：

```html
<!DOCTYPE html>
<html>
<head>
    <title>雨滴窗口效果 - CDN使用</title>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #rain-container { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="rain-container"></div>
    
    <!-- 引入 @arayui/rainy-day -->
    <script src="https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.min.js"></script>
    
    <script>
        // 等待页面加载完成
        window.addEventListener('load', function() {
            const container = document.getElementById('rain-container')
            
            // 创建雨滴效果实例
            const rainyWindow = new window.any.RainyWindow(container, {
                intensity: 0.5,
                speed: 0.3,
                lightning: true,
                fps: 60
            })
            
            // 加载背景图片
            rainyWindow.loadImage('https://picsum.photos/1920/1080')
        })
    </script>
</body>
</html>
```

### 完整示例 (ES模块)

```html
<!DOCTYPE html>
<html>
<head>
    <title>雨滴窗口效果</title>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #rain-container { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="rain-container"></div>
    
    <script type="module">
        import { RainyWindow } from 'https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.mjs'
        
        const container = document.getElementById('rain-container')
        const rainyWindow = new RainyWindow(container, {
            intensity: 0.5,
            speed: 0.3,
            lightning: true,
            fps: 60
        })
        
        // 加载背景
        await rainyWindow.loadImage('https://picsum.photos/1920/1080')
    </script>
</body>
</html>
```

## API 文档 📚

### RainyWindow 类

#### 构造函数

```typescript
new RainyWindow(container: HTMLElement, options?: RainyWindowOptions)
```

#### 方法

##### 参数控制
- `setIntensity(value: number)` - 设置雨滴强度
- `setSpeed(value: number)` - 设置雨滴速度
- `setBrightness(value: number)` - 设置亮度
- `setNormal(value: number)` - 设置法线强度
- `setZoom(value: number)` - 设置缩放比例
- `setBlurIntensity(value: number)` - 设置模糊强度
- `setBlurIterations(value: number)` - 设置模糊迭代次数
- `setPanning(value: boolean)` - 启用/禁用平移效果
- `setPostProcessing(value: boolean)` - 启用/禁用后处理
- `setLightning(value: boolean)` - 启用/禁用闪电效果
- `setTextureFill(value: boolean)` - 启用/禁用纹理填充
- `setFps(value: number)` - 设置帧率

##### 资源管理
- `loadImage(url: string): Promise<void>` - 加载背景图片
- `loadVideo(url: string): Promise<void>` - 加载背景视频
- `destroy(): void` - 销毁实例并清理资源
- `pause(): void` - 暂停渲染
- `resume(): void` - 恢复渲染

### 类型定义

```typescript
interface RainyWindowOptions {
  intensity?: number
  speed?: number
  brightness?: number
  normal?: number
  zoom?: number
  blurIntensity?: number
  blurIterations?: number
  panning?: boolean
  postProcessing?: boolean
  lightning?: boolean
  textureFill?: boolean
  fps?: number
}

interface RainyWindowControls {
  setIntensity: (value: number) => void
  setSpeed: (value: number) => void
  setBrightness: (value: number) => void
  setNormal: (value: number) => void
  setZoom: (value: number) => void
  setBlurIntensity: (value: number) => void
  setBlurIterations: (value: number) => void
  setPanning: (value: boolean) => void
  setPostProcessing: (value: boolean) => void
  setLightning: (value: boolean) => void
  setTextureFill: (value: boolean) => void
  setFps: (value: number) => void
  loadImage: (url: string) => Promise<void>
  loadVideo: (url: string) => Promise<void>
  destroy: () => void
  pause: () => void
  resume: () => void
}
```

## 开发 🛠️

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 运行示例

```bash
pnpm example
```

## 性能优化 💡

- **FPS 限制**：通过 `setFps()` 方法限制渲染帧率
- **模糊优化**：调整 `blurIterations` 减少计算量
- **纹理优化**：根据设备性能调整纹理质量
- **后处理开关**：在低性能设备上可关闭后处理效果

## 浏览器兼容性 🌐

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

需要支持 WebGL 的浏览器环境。

## 许可证 📄

MIT License - 详见 [LICENSE](LICENSE) 文件

## 贡献 🤝

欢迎提交 Issue 和 Pull Request！

## 致谢 👏

- [Three.js](https://threejs.org/) - 3D 图形库
- 灵感来源于真实雨滴效果的物理模拟
