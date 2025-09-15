/**
 * # any-rainy-day 主入口文件 🚪
 * - 导出所有公开API
 * - 提供统一的模块入口点
 * - 支持UMD全局暴露
 */

import { RainyWindow } from './core/RainyWindow'

// 命名导出用于ES模块
export { RainyWindow }

// // 核心类 - 默认导出用于UMD
// export default RainyWindow

// 类型定义
export type {
  /** # 雨滴窗口控制接口 🎮 */
  RainyWindowControls,
  /** # 雨滴窗口配置选项 🌧️ */
  RainyWindowOptions,
} from './interface'
