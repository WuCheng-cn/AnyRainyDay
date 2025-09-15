import type {
  RainyWindowControls,
  RainyWindowOptions,
} from '../interface'
import * as THREE from 'three'
import { RAIN_FRAGMENT_SHADER, RAIN_VERTEX_SHADER } from '../shaders.ts/shaders'

/**
 * # 雨滴窗口效果类 🌧️
 *
 * 基于Three.js实现的雨滴窗口效果，提供丰富的参数控制接口。
 * 支持背景图片和视频，可自定义各种雨滴效果参数。
 */
export class RainyWindow implements RainyWindowControls {
  private container: HTMLElement
  private scene!: THREE.Scene
  private camera!: THREE.OrthographicCamera
  private renderer!: THREE.WebGLRenderer
  private material!: THREE.ShaderMaterial
  private clock: THREE.Clock
  private videoElement?: HTMLVideoElement
  private animationId?: number
  private isPaused = false
  private fpsInterval = 1000 / 30
  private lastRenderTime = 0

  /**
   * # 构造函数 🏗️
   * - 初始化雨滴窗口效果
   * - 自动设置场景、渲染器和材质
   * @param container - HTML容器元素
   * @param options - 配置选项
   */
  constructor(container: HTMLElement, options: RainyWindowOptions = {}) {
    this.container = container
    this.clock = new THREE.Clock()

    this.initScene()
    this.initRenderer()
    this.initMaterial(options)
    this.initMesh()
    this.bindEvents()
    this.startRender()
  }

  /** # 初始化3D场景 🎭 */
  private initScene(): void {
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  }

  /** # 初始化WebGL渲染器 🖥️ */
  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    })

    // 填满整个容器，但保持雨滴大小一致性
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * # 初始化着色器材质 🎨
   * - 配置雨滴效果的着色器参数
   * - 设置所有uniform变量的初始值
   */
  private initMaterial(options: RainyWindowOptions): void {
    const {
      intensity = 0.4,
      speed = 0.25,
      brightness = 0.8,
      normal = 0.5,
      zoom = 1.0,
      blurIntensity = 0.5,
      blurIterations = 16,
      panning = false,
      postProcessing = true,
      lightning = false,
      textureFill = true,
      fps = 30,
    } = options

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        u_tex0: { value: null },
        u_time: { value: 0 },
        u_intensity: { value: intensity },
        u_speed: { value: speed },
        u_brightness: { value: brightness },
        u_normal: { value: normal },
        u_zoom: { value: zoom },
        u_blur_intensity: { value: blurIntensity },
        u_blur_iterations: { value: blurIterations },
        u_panning: { value: panning },
        u_post_processing: { value: postProcessing },
        u_lightning: { value: lightning },
        u_texture_fill: { value: textureFill },
        u_resolution: { value: new THREE.Vector2(this.container.clientWidth, this.container.clientHeight) },
        u_tex0_resolution: { value: new THREE.Vector2(this.container.clientWidth, this.container.clientHeight) },
      },
      vertexShader: RAIN_VERTEX_SHADER,
      fragmentShader: RAIN_FRAGMENT_SHADER,
    })

    this.fpsInterval = 1000 / fps
  }

  /** # 初始化网格几何体 🔷 */
  private initMesh(): void {
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    const mesh = new THREE.Mesh(geometry, this.material)
    this.scene.add(mesh)
  }

  /** # 绑定事件监听器 📡 */
  private bindEvents(): void {
    const resizeObserver = new ResizeObserver(() => {
      this.handleResize()
    })
    resizeObserver.observe(this.container)

    window.addEventListener('resize', () => this.handleResize())
  }

  /** # 处理窗口大小调整 📏 */
  private handleResize(): void {
    const { clientWidth, clientHeight } = this.container

    // 填满整个容器，保持实际宽高
    this.renderer.setSize(clientWidth, clientHeight)
    this.material.uniforms.u_resolution.value.set(clientWidth, clientHeight)
  }

  /** # 启动渲染循环 🎬 */
  private startRender(): void {
    this.render()
  }

  /**
   * # 渲染循环函数 🔄
   * - 基于FPS限制的渲染控制
   * - 更新着色器uniform变量
   */
  private render = (): void => {
    if (this.isPaused)
      return

    const now = Date.now()
    const delta = now - this.lastRenderTime

    if (delta >= this.fpsInterval) {
      this.lastRenderTime = now - (delta % this.fpsInterval)

      const elapsedTime = this.clock.getElapsedTime()
      this.material.uniforms.u_time.value = elapsedTime

      this.renderer.render(this.scene, this.camera)
    }

    this.animationId = requestAnimationFrame(this.render)
  }

  // 控制方法实现
  /** # 设置雨滴强度 💧 */
  setIntensity(value: number): void {
    this.material.uniforms.u_intensity.value = Math.max(0, Math.min(1, value))
  }

  /** # 设置雨滴速度 ⚡ */
  setSpeed(value: number): void {
    this.material.uniforms.u_speed.value = Math.max(0, Math.min(10, value))
  }

  /** # 设置亮度 ☀️ */
  setBrightness(value: number): void {
    this.material.uniforms.u_brightness.value = Math.max(0, Math.min(1, value))
  }

  /** # 设置法线强度 🎯 */
  setNormal(value: number): void {
    this.material.uniforms.u_normal.value = Math.max(0, Math.min(3, value))
  }

  /** # 设置缩放比例 🔍 */
  setZoom(value: number): void {
    this.material.uniforms.u_zoom.value = Math.max(0.1, Math.min(3, value))
  }

  /** # 设置模糊强度 🌫️ */
  setBlurIntensity(value: number): void {
    this.material.uniforms.u_blur_intensity.value = Math.max(0, Math.min(10, value))
  }

  /** # 设置模糊迭代次数 🔁 */
  setBlurIterations(value: number): void {
    this.material.uniforms.u_blur_iterations.value = Math.max(1, Math.min(64, Math.floor(value)))
  }

  /** # 启用/禁用平移效果 🔄 */
  setPanning(value: boolean): void {
    this.material.uniforms.u_panning.value = value
  }

  /** # 启用/禁用后处理 ✨ */
  setPostProcessing(value: boolean): void {
    this.material.uniforms.u_post_processing.value = value
  }

  /** # 启用/禁用闪电效果 ⚡ */
  setLightning(value: boolean): void {
    this.material.uniforms.u_lightning.value = value
  }

  /** # 启用/禁用纹理填充 🖼️ */
  setTextureFill(value: boolean): void {
    this.material.uniforms.u_texture_fill.value = value
  }

  /** # 设置帧率 🎬 */
  setFps(value: number): void {
    const fps = Math.max(15, Math.min(120, value))
    this.fpsInterval = 1000 / fps
  }

  /**
   * # 加载背景图片 🖼️
   * - 异步加载图片作为背景纹理
   * - 自动处理视频资源的清理
   * @param url - 图片URL地址
   */
  async loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader()
      loader.load(
        url,
        (texture) => {
          this.disposeVideo()
          this.material.uniforms.u_tex0.value = texture
          this.material.uniforms.u_tex0_resolution.value.set(
            texture.image.width,
            texture.image.height,
          )
          resolve()
        },
        undefined,
        reject,
      )
    })
  }

  /**
   * # 加载背景视频 🎥
   * - 异步加载视频作为背景纹理
   * - 自动播放并循环视频
   * @param url - 视频URL地址
   */
  async loadVideo(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.disposeVideo()

      const video = document.createElement('video')
      video.src = url
      video.muted = true
      video.loop = true
      video.crossOrigin = 'anonymous'

      video.addEventListener('loadedmetadata', () => {
        const videoTexture = new THREE.VideoTexture(video)
        this.material.uniforms.u_tex0.value = videoTexture
        this.material.uniforms.u_tex0_resolution.value.set(
          video.videoWidth,
          video.videoHeight,
        )
        resolve()
      })

      video.addEventListener('error', reject)
      video.play().catch(reject)
      this.videoElement = video
    })
  }

  /** # 清理视频资源 🧹 */
  private disposeVideo(): void {
    if (this.videoElement) {
      this.videoElement.pause()
      this.videoElement.removeAttribute('src')
      this.videoElement.load()
      this.videoElement = undefined
    }
    if (this.material.uniforms.u_tex0.value) {
      this.material.uniforms.u_tex0.value.dispose()
    }
  }

  /** # 暂停渲染 ⏸️ */
  pause(): void {
    this.isPaused = true
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = undefined
    }
  }

  /** # 恢复渲染 ▶️ */
  resume(): void {
    if (!this.isPaused)
      return
    this.isPaused = false
    this.lastRenderTime = Date.now()
    this.render()
  }

  /**
   * # 销毁实例 🗑️
   * - 清理所有资源
   * - 停止渲染循环
   * - 移除DOM元素
   */
  destroy(): void {
    this.pause()
    this.disposeVideo()

    this.material.dispose()
    this.renderer.dispose()

    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement)
    }
  }
}

export default RainyWindow
