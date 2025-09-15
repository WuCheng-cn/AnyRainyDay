# @arayui/rainy-day 🌧️

`@arayui/rainy-day` is a raindrop window effect library based on Three.js, creating realistic raindrops falling on a window through WebGL shader technology. Supports background images and videos, with rich parameter control interfaces.

[📖 Online Docs](https://wucheng-cn.github.io/AnyRainyDay/) | [📦 NPM Package](https://www.npmjs.com/package/@arayui/rainy-day)

## Key Features ✨

- **Realistic Raindrop Effects**: High-quality raindrop visual effects implemented with GLSL shaders
- **Background Support**: Supports images and videos as backgrounds
- **Rich Parameter Control**: Provides 10+ configurable parameters for real-time effect adjustment
- **Performance Optimization**: Supports FPS limiting and performance tuning
- **TypeScript Support**: Complete type definitions and type safety
- **Zero Dependencies**: No other dependencies except Three.js

## Parameter Configuration 🎛️

| Parameter | Description | Range | Default |
|-----------|-------------|-------|---------|
| intensity | Raindrop intensity | 0-1 | 0.4 |
| speed | Raindrop speed | 0-10 | 0.25 |
| brightness | Brightness adjustment | 0-1 | 0.8 |
| normal | Normal intensity | 0-3 | 0.5 |
| zoom | Zoom ratio | 0.1-3 | 2.61 |
| blurIntensity | Blur intensity | 0-10 | 0.5 |
| blurIterations | Blur iterations | 1-64 | 16 |
| panning | Panning effect toggle | boolean | false |
| postProcessing | Post-processing toggle | boolean | true |
| lightning | Lightning effect toggle | boolean | false |
| textureFill | Texture fill toggle | boolean | true |
| fps | Frame rate setting | 15-120 | 30 |

## Installation 📦

Install using pnpm:

```bash
pnpm install @arayui/rainy-day
```

Or using npm:

```bash
npm install @arayui/rainy-day
```

## Usage Examples 🚀

### Basic Usage

```typescript
import { RainyWindow } from '@arayui/rainy-day'
```
// Create raindrop effect
const container = document.getElementById('rain-container')
const rainyWindow = new RainyWindow(container)

// Load background image
await rainyWindow.loadImage('path/to/image.jpg')

// Adjust parameters
rainyWindow.setIntensity(0.6)
rainyWindow.setSpeed(0.5)
```

### Using Configuration Options

```typescript
import { RainyWindow } from 'any-rainy-day'

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

// Load background video
await rainyWindow.loadVideo('path/to/video.mp4')
```

### Dynamic Control Effects

```typescript
// Real-time parameter adjustment
const gui = new dat.GUI()
gui.add({ intensity: 0.4 }, 'intensity', 0, 1).onChange((value) => {
  rainyWindow.setIntensity(value)
})

// Toggle effects
rainyWindow.setLightning(true) // Enable lightning
rainyWindow.setPanning(true)   // Enable panning
rainyWindow.setPostProcessing(false) // Disable post-processing
```

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Raindrop Window Effect</title>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #rain-container { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="rain-container"></div>
    
    <script type="module">
        import { RainyWindow } from './dist/any-rainy-day.es.js'
        
        const container = document.getElementById('rain-container')
        const rainyWindow = new RainyWindow(container, {
            intensity: 0.5,
            speed: 0.3,
            lightning: true,
            fps: 60
        })
        
        // Load background
        await rainyWindow.loadImage('https://picsum.photos/1920/1080')
    </script>
</body>
</html>
```

## API Documentation 📚

### RainyWindow Class

#### Constructor

```typescript
new RainyWindow(container: HTMLElement, options?: RainyWindowOptions)
```

#### Methods

##### Parameter Control
- `setIntensity(value: number)` - Set raindrop intensity
- `setSpeed(value: number)` - Set raindrop speed
- `setBrightness(value: number)` - Set brightness
- `setNormal(value: number)` - Set normal intensity
- `setZoom(value: number)` - Set zoom ratio
- `setBlurIntensity(value: number)` - Set blur intensity
- `setBlurIterations(value: number)` - Set blur iterations
- `setPanning(value: boolean)` - Enable/disable panning effect
- `setPostProcessing(value: boolean)` - Enable/disable post-processing
- `setLightning(value: boolean)` - Enable/disable lightning effect
- `setTextureFill(value: boolean)` - Enable/disable texture fill
- `setFps(value: number)` - Set frame rate

##### Resource Management
- `loadImage(url: string): Promise<void>` - Load background image
- `loadVideo(url: string): Promise<void>` - Load background video
- `destroy(): void` - Destroy instance and clean up resources
- `pause(): void` - Pause rendering
- `resume(): void` - Resume rendering

### Type Definitions

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

## Development 🛠️

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Run Examples

```bash
pnpm example
```

## Performance Optimization 💡

- **FPS Limiting**: Limit rendering frame rate via `setFps()` method
- **Blur Optimization**: Adjust `blurIterations` to reduce computation
- **Texture Optimization**: Adjust texture quality based on device performance
- **Post-processing Toggle**: Disable post-processing effects on low-performance devices

## Browser Compatibility 🌐

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Requires a browser environment that supports WebGL.

## License 📄

MIT License - See [LICENSE](LICENSE) file for details

## Contributions 🤝

Issues and Pull Requests are welcome!

## Acknowledgments 👏

- [Three.js](https://threejs.org/) - 3D graphics library
- Inspired by physical simulation of real raindrop effects
