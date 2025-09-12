/**
 * # 接口定义入口文件 🔗
 * - 统一导出所有接口定义
 * - 提供清晰的模块结构
 */

export {
  /** # 雨滴片段着色器 🎨 */
  RAIN_FRAGMENT_SHADER,
  /** # 雨滴顶点着色器 📐 */
  RAIN_VERTEX_SHADER,
} from '../shaders.ts/shaders'

export type {
/** # 雨滴窗口控制接口 � */
  RainyWindowControls,
} from './RainyWindowControls'

export type {
  /** # 雨滴窗口配置选项 �️ */
  RainyWindowOptions,
} from './RainyWindowOptions'
