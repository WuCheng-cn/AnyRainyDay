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
import { RainyWindow } from '@arayui/rainy-day'

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
gui.add({ intensity: 0.4 }, 'intensity', 0, 1).onChange((value: number) => {
  rainyWindow.setIntensity(value)
})

// Toggle effects
rainyWindow.setLightning(true) // Enable lightning
rainyWindow.setPanning(true)   // Enable panning
rainyWindow.setPostProcessing(false) // Disable post-processing
```

### CDN Usage

If you want to use CDN, you can directly import the UMD format file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Raindrop Window Effect - CDN Usage</title>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #rain-container { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="rain-container"></div>
    
    <!-- Import @arayui/rainy-day -->
    <script src="https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.min.js"></script>
    
    <script>
        // Wait for page load
        window.addEventListener('load', function() {
            const container = document.getElementById('rain-container')
            
            // Create raindrop effect instance
            const rainyWindow = new window.any.RainyWindow(container, {
                intensity: 0.5,
                speed: 0.3,
                lightning: true,
                fps: 60
            })
            
            // Load background image
            rainyWindow.loadImage('https://picsum.photos/1920/1080')
        })
    </script>
</body>
</html>
```

### Complete Example (ES Module)

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
        import { RainyWindow } from 'https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.mjs'
        
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
- `setIntensity(value: number): void` - Set raindrop intensity
- `setSpeed(value: number): void` - Set raindrop speed
- `setBrightness(value: number): void` - Set brightness
- `setNormal(value: number): void` - Set normal intensity
- `setZoom(value: number): void` - Set zoom ratio
- `setBlurIntensity(value: number): void` - Set blur intensity
- `setBlurIterations(value: number): void` - Set blur iterations
- `setPanning(value: boolean): void` - Enable/disable panning effect
- `setPostProcessing(value: boolean): void` - Enable/disable post-processing
- `setLightning(value: boolean): void` - Enable/disable lightning effect
- `setTextureFill(value: boolean): void` - Enable/disable texture fill
- `setFps(value: number): void` - Set frame rate

##### Resource Management
- `loadImage(url: string): Promise<void>` - Load background image
- `loadVideo(url: string): Promise<void>` - Load background video
- `destroy(): void` - Destroy instance and clean up resources
- `pause(): void` - Pause rendering
- `resume(): void` - Resume rendering

### Type Definitions

```typescript
interface RainyWindowOptions {
  intensity?: number      // Raindrop intensity (0-1)
  speed?: number          // Raindrop speed (0-10)
  brightness?: number     // Brightness adjustment (0-1)
  normal?: number         // Normal intensity (0-3)
  zoom?: number           // Zoom ratio (0.1-3)
  blurIntensity?: number  // Blur intensity (0-10)
  blurIterations?: number // Blur iterations (1-64)
  panning?: boolean       // Panning effect toggle
  postProcessing?: boolean // Post-processing toggle
  lightning?: boolean     // Lightning effect toggle
  textureFill?: boolean   // Texture fill toggle
  fps?: number            // Frame rate setting (15-120)
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
