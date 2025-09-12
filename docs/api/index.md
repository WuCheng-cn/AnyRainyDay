# API 文档

any-rainy-day 提供了简洁而强大的 API，让您可以轻松创建和控制逼真的雨滴窗口效果。本章节将详细介绍所有可用的 API 接口。

## 模块概览

any-rainy-day 主要包含以下模块：

- [核心类](#核心类)
- [配置选项](#配置选项)
- [控制方法](#控制方法)
- [事件系统](#事件系统)
- [类型定义](#类型定义)

## 核心类

### RainyWindow

雨滴窗口效果的核心类，用于创建和管理整个雨滴特效。

**构造函数：**
```typescript
new RainyWindow(options: RainyWindowOptions): RainyWindow
```

**参数：**
- `options`：配置选项对象，详细配置请参考 [RainyWindowOptions](#rainywindowoptions)

**示例：**
```typescript
import { RainyWindow } from 'any-rainy-day'

const rainy = new RainyWindow({
  container: document.getElementById('rainy-container'),
  intensity: 0.5,
  speed: 1.0,
  dropSize: 2.0,
  opacity: 0.6
})
```

## 配置选项

### RainyWindowOptions

创建雨滴效果时的配置选项接口。

**属性：**

#### container
- **类型：** `HTMLElement`
- **描述：** 雨滴效果的容器元素，必须提供
- **必需：** 是

#### intensity
- **类型：** `number`
- **描述：** 雨滴强度，控制雨滴的密度（0-1）
- **默认值：** `0.5`
- **范围：** `0.1 - 1.0`

#### speed
- **类型：** `number`
- **描述：** 雨滴下落速度倍数
- **默认值：** `1.0`
- **范围：** `0.1 - 3.0`

#### dropSize
- **类型：** `number`
- **描述：** 雨滴大小（像素）
- **默认值：** `2.0`
- **范围：** `1.0 - 5.0`

#### opacity
- **类型：** `number`
- **描述：** 雨滴透明度
- **默认值：** `0.6`
- **范围：** `0.1 - 1.0`

#### color
- **类型：** `string`
- **描述：** 雨滴颜色（十六进制颜色值）
- **默认值：** `'#ffffff'`

#### wind
- **类型：** `number`
- **描述：** 风力影响，控制雨滴的水平偏移
- **默认值：** `0.0`
- **范围：** `-2.0 - 2.0`

#### blur
- **类型：** `number`
- **描述：** 背景模糊程度（像素）
- **默认值：** `0.0`
- **范围：** `0.0 - 10.0`

#### interactive
- **类型：** `boolean`
- **描述：** 是否启用鼠标交互效果
- **默认值：** `true`

#### autoResize
- **类型：** `boolean`
- **描述：** 是否自动响应容器大小变化
- **默认值：** `true`

## 控制方法

### RainyWindowControls

通过 RainyWindow 实例可用的控制方法接口。

#### setIntensity(intensity: number): void
设置雨滴强度。

**参数：**
- `intensity`：雨滴强度（0-1）

**示例：**
```typescript
rainy.setIntensity(0.8) // 增强雨滴密度
```

#### setSpeed(speed: number): void
设置雨滴下落速度。

**参数：**
- `speed`：速度倍数（0.1-3.0）

**示例：**
```typescript
rainy.setSpeed(1.5) // 加快雨滴下落速度
```

#### setDropSize(size: number): void
设置雨滴大小。

**参数：**
- `size`：雨滴大小（像素，1-5）

**示例：**
```typescript
rainy.setDropSize(3.0) // 增大雨滴
```

#### setOpacity(opacity: number): void
设置雨滴透明度。

**参数：**
- `opacity`：透明度（0-1）

**示例：**
```typescript
rainy.setOpacity(0.8) // 增加透明度
```

#### setColor(color: string): void
设置雨滴颜色。

**参数：**
- `color`：十六进制颜色字符串

**示例：**
```typescript
rainy.setColor('#87ceeb') // 设置为天蓝色
```

#### setWind(wind: number): void
设置风力影响。

**参数：**
- `wind`：风力值（-2.0 到 2.0）

**示例：**
```typescript
rainy.setWind(1.5) // 向右的风
rainy.setWind(-1.0) // 向左的风
```

#### setBlur(blur: number): void
设置背景模糊程度。

**参数：**
- `blur`：模糊像素值（0-10）

**示例：**
```typescript
rainy.setBlur(5.0) // 中等模糊效果
```

#### pause(): void
暂停雨滴动画。

**示例：**
```typescript
rainy.pause()
```

#### resume(): void
恢复雨滴动画。

**示例：**
```typescript
rainy.resume()
```

#### destroy(): void
销毁雨滴效果，清理资源。

**示例：**
```typescript
rainy.destroy()
```

## 事件系统

### 事件监听

RainyWindow 支持事件监听，可以通过 `on` 方法注册事件处理器。

#### on(event: string, callback: Function): void
注册事件监听器。

**支持的事件类型：**

- `resize`：容器大小改变时触发
- `mouseenter`：鼠标进入容器时触发
- `mouseleave`：鼠标离开容器时触发
- `click`：点击雨滴时触发

**示例：**
```typescript
// 监听容器大小变化
rainy.on('resize', (width: number, height: number) => {
  console.log(`容器大小变为: ${width}x${height}`)
})

// 监听鼠标进入
rainy.on('mouseenter', () => {
  console.log('鼠标进入雨滴区域')
})
```

## 类型定义

### 主要类型

#### RainyWindowOptions
配置选项接口，详见 [配置选项](#配置选项) 部分。

#### RainyWindowControls
控制方法接口，详见 [控制方法](#控制方法) 部分。

### 辅助类型

#### Vector2
二维向量类型，用于内部计算。

```typescript
interface Vector2 {
  x: number
  y: number
}
```

#### Raindrop
单个雨滴对象的类型定义。

```typescript
interface Raindrop {
  position: Vector2
  velocity: Vector2
  size: number
  opacity: number
  life: number
}
```

### 枚举类型

#### RainEventType
事件类型枚举。

```typescript
enum RainEventType {
  RESIZE = 'resize',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
  CLICK = 'click'
}
```

## 使用示例

### 基础使用

```typescript
import { RainyWindow, RainyWindowOptions } from 'any-rainy-day'

// 创建配置
const options: RainyWindowOptions = {
  container: document.getElementById('rainy-container')!,
  intensity: 0.7,
  speed: 1.2,
  dropSize: 2.5,
  opacity: 0.7,
  color: '#ffffff',
  interactive: true
}

// 初始化雨滴效果
const rainy = new RainyWindow(options)

// 动态调整参数
setTimeout(() => {
  rainy.setIntensity(0.9)
  rainy.setSpeed(1.8)
}, 3000)

// 事件监听
rainy.on('resize', (width, height) => {
  console.log(`容器大小: ${width}x${height}`)
})
```

### 高级配置

```typescript
import { RainyWindow } from 'any-rainy-day'

const rainy = new RainyWindow({
  container: document.querySelector('.rainy-bg') as HTMLElement,
  intensity: 0.8,
  speed: 1.5,
  dropSize: 3.0,
  opacity: 0.6,
  color: '#87ceeb',
  wind: 1.2,
  blur: 3.0,
  interactive: true,
  autoResize: true
})

// 创建控制面板
const controls = {
  intensity: 0.8,
  speed: 1.5,
  dropSize: 3.0,
  opacity: 0.6,
  wind: 1.2,
  blur: 3.0
}

// 绑定控制面板
Object.keys(controls).forEach(key => {
  const slider = document.getElementById(key) as HTMLInputElement
  slider.addEventListener('input', (e) => {
    const value = parseFloat((e.target as HTMLInputElement).value)
    controls[key as keyof typeof controls] = value
    
    switch(key) {
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
```

## 性能优化

### 最佳实践

1. **容器大小**：避免使用过大的容器，建议不超过屏幕尺寸的 80%
2. **雨滴数量**：根据设备性能调整 `intensity` 参数
3. **交互效果**：在移动设备上可以考虑关闭 `interactive` 选项
4. **自动调整**：启用 `autoResize` 以适应响应式布局

### 内存管理

```typescript
// 组件卸载时清理资源
function cleanup() {
  if (rainy) {
    rainy.destroy()
    rainy = null
  }
}

// React 示例
useEffect(() => {
  const rainy = new RainyWindow({
    container: containerRef.current!,
    // ...其他配置
  })

  return () => {
    rainy.destroy()
  }
}, [])
```
