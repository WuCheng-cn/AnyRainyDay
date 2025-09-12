# 文档项目说明

这是 any-rainy-day 雨滴窗口效果库的文档项目，使用 VitePress 构建。

## 项目结构

```
docs/
├── .vitepress/          # VitePress 配置文件
│   ├── config.ts      # 站点配置
│   └── theme/          # 自定义主题
├── api/                # API 文档
├── examples/           # 使用示例
├── guide/              # 使用指南
├── index.md            # 首页
└── README.md           # 本文件
```

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问 http://localhost:3000 查看文档。

### 构建文档

```bash
npm run docs:build
```

构建后的文件将输出到 `dist/docs/` 目录。

### 预览构建结果

```bash
npm run docs:preview
```

## 文档编写规范

1. 使用 Markdown 语法编写
2. 代码示例使用 ``` 代码块
3. 保持中英文空格规范
4. 重要概念使用 **加粗**
5. 代码变量使用 `反引号`

## 更新日志

- 2024-01-XX: 初始版本，创建 any-rainy-day 项目文档
- 2024-01-XX: 更新为雨滴效果库相关文档

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进文档。

## 许可证

MIT License
