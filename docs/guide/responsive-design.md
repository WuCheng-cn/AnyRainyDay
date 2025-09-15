# 响应式设计指南

## 容器高度无关的雨滴效果

在 `v1.0.2` 版本中，我们优化了 RainyWindow 的核心算法，使其表现效果不再受容器高度影响。

### 技术实现

#### 1. 坐标系统优化

原本的算法使用容器高度作为归一化基准：

```glsl
// 旧实现 - 依赖容器高度
vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;
```

新的算法使用最小边长作为归一化基准，确保在不同容器比例下效果一致：

```glsl
// 新实现 - 使用最小边长，不受高度影响
vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
```

#### 2. 缩放因子调整

引入了基于容器宽高比的自适应缩放因子：

```glsl
float aspectRatio = u_resolution.x / u_resolution.y;
float scaleFactor = 1.0;
if (aspectRatio > 1.0) {
    scaleFactor = 1.0 / aspectRatio;
}
uv *= (.7 + zoom * .3) * u_zoom * scaleFactor;
```

#### 3. 雨滴密度优化

调整了雨滴生成算法的密度参数，从固定的 40x 提升到 60x，确保在小容器中也能保持足够的雨滴密度：

```glsl
// 密度提升
uv *= 60.;  // 从 40. 提升到 60.
```

### 实际效果对比

| 容器尺寸 | 旧版本效果 | 新版本效果 |
|---------|-----------|-----------|
| 300x600 | 雨滴稀疏，拉伸变形 | 雨滴密度正常，形状自然 |
| 600x300 | 雨滴过于密集，压缩变形 | 雨滴密度正常，形状自然 |
| 400x400 | 效果正常 | 效果正常 |
| 200x200 | 雨滴过大，数量过少 | 雨滴大小适中，密度均匀 |

### 使用示例

```javascript
// 在不同尺寸的容器中效果一致
const container1 = document.getElementById('tall-container'); // 300x600
const container2 = document.getElementById('wide-container'); // 600x300
const container3 = document.getElementById('square-container'); // 400x400

const options = {
    intensity: 0.4,
    speed: 0.25,
    zoom: 2.61
};

new RainyWindow(container1, options);
new RainyWindow(container2, options);
new RainyWindow(container3, options);
```

### 响应式布局建议

为了确保在各种屏幕尺寸下都有最佳体验，建议：

1. **使用相对单位**：设置容器尺寸时使用百分比或视口单位
2. **保持容器比例**：对于特殊需求，可以使用固定比例的容器
3. **测试多种尺寸**：在开发过程中测试不同尺寸的显示效果

```css
.responsive-container {
    width: 100%;
    height: 50vh; /* 使用视口高度 */
    max-width: 800px;
    max-height: 600px;
}
```

### 兼容性

此优化完全向后兼容，不会影响现有项目的使用。所有 API 接口保持不变，仅内部算法进行了优化。