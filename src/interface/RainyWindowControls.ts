/**
 * # 雨滴窗口控制接口 🎮
 * - 提供RainyWindow实例的完整控制方法
 * - 支持运行时动态调整所有参数
 */
export interface RainyWindowControls {
  /** # 设置雨滴强度 💧 */
  setIntensity: (value: number) => void
  /** # 设置雨滴速度 ⚡ */
  setSpeed: (value: number) => void
  /** # 设置亮度 ☀️ */
  setBrightness: (value: number) => void
  /** # 设置法线强度 🎯 */
  setNormal: (value: number) => void
  /** # 设置缩放比例 🔍 */
  setZoom: (value: number) => void
  /** # 设置模糊强度 🌫️ */
  setBlurIntensity: (value: number) => void
  /** # 设置模糊迭代次数 🔁 */
  setBlurIterations: (value: number) => void
  /** # 启用/禁用平移效果 🔄 */
  setPanning: (value: boolean) => void
  /** # 启用/禁用后处理 ✨ */
  setPostProcessing: (value: boolean) => void
  /** # 启用/禁用闪电效果 ⚡ */
  setLightning: (value: boolean) => void
  /** # 启用/禁用纹理填充 🖼️ */
  setTextureFill: (value: boolean) => void
  /** # 设置帧率 🎬 */
  setFps: (value: number) => void
  /** # 加载背景图片 🖼️ */
  loadImage: (url: string) => Promise<void>
  /** # 加载背景视频 🎥 */
  loadVideo: (url: string) => Promise<void>
  /** # 销毁实例 🗑️ */
  destroy: () => void
  /** # 暂停渲染 ⏸️ */
  pause: () => void
  /** # 恢复渲染 ▶️ */
  resume: () => void
}

export default RainyWindowControls
