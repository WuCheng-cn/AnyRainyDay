# 基础使用示例

本章节将通过完整的示例，展示如何在实际项目中使用 `@arayui/rainy-day` 雨滴窗口效果库，包括各种配置选项、动态控制和高级用法。

## 基础配置示例

### cdn使用

创建一个基础的雨滴效果作为页面背景：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>基础雨滴背景</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: white;
    }
    
    .hero {
      position: relative;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .hero-content {
      z-index: 10;
      position: relative;
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    #rainy-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  </style>
</head>
<body>
  <div class="hero">
    <div id="rainy-background"></div>
    <div class="hero-content">
      <h1>欢迎来到雨滴世界</h1>
      <p>基于 Three.js 的逼真雨滴效果</p>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@arayui/rainy-day@latest/dist/index.min.js"></script>
  <script>
    function initRain() {
      new window.any.RainyWindow(document.getElementById('rainy-background'))
    }

    document.addEventListener('DOMContentLoaded', initRain)
  </script>
</body>
</html>
```

