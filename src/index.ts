/**
 * # any-rainy-day 主入口文件 🚪
 * - 导出所有公开API
 * - 提供统一的模块入口点
 */

// 核心类
export { RainyWindow } from './core/RainyWindow'

// 类型定义
export type {
  /** # 雨滴窗口控制接口 🎮 */
  RainyWindowControls,
  /** # 雨滴窗口配置选项 🌧️ */
  RainyWindowOptions,
} from './interface'
