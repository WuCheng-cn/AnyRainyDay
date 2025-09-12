# 装饰器 API

> ⚠️ **注意**：此文档已过时，请查看 [RainyWindow API](/api/rainy-window) 获取最新的 any-rainy-day 项目 API 文档。

本页面已移动至新的文档结构。any-rainy-day 是一个基于 Three.js 的逼真雨滴窗口效果库，不再使用装饰器模式。

## 新的 API 结构

- [核心类 RainyWindow](/api/rainy-window) - 主要的雨滴效果类
- [配置选项](/api/configuration) - 所有可用的配置参数
- [事件系统](/api/events) - 事件监听和处理
- [方法](/api/methods) - 可用的控制方法
- [类型定义](/api/types) - TypeScript 类型定义

## 快速迁移指南

如果您是从 AnyCore 框架迁移而来，请注意：

1. **移除所有装饰器**：删除 `@CustomField`, `@FormField`, `@TableField` 等装饰器
2. **使用配置对象**：改为使用 `RainyWindowOptions` 配置对象
3. **直接方法调用**：使用实例方法如 `setIntensity()`, `setSpeed()` 等
4. **事件监听**：使用 `on()` 方法监听事件

### 示例对比

**旧方式 (AnyCore)**:
```typescript
// 不再适用
@FormField({
  formType: 'INPUT',
  label: '用户名'
})
username: string
```

**新方式 (any-rainy-day)**:
```typescript
const rainy = new RainyWindow({
  container: document.getElementById('container'),
  intensity: 0.6,
  speed: 1.0,
  color: '#ffffff'
})
```

## 获取帮助

如需更多帮助，请查看：
- [快速开始指南](/guide/getting-started)
- [基础使用示例](/examples/basic-usage)
- [GitHub Issues](https://github.com/your-username/any-rainy-day/issues)
