# AnyCore 文档

欢迎使用AnyCore框架文档。本文档将帮助您了解AnyCore框架的核心概念、API和使用方法。

## 本地预览文档

要在本地预览文档，请按照以下步骤操作：

1. 确保您已安装Node.js和pnpm

2. 安装项目依赖：

```bash
# 在项目根目录执行
pnpm install
```

3. 启动开发服务器：

```bash
# 在项目根目录执行
npx vitepress dev docs
```

4. 打开浏览器访问 http://localhost:5173/ 查看文档

## 构建文档

要构建文档以便部署，请执行以下命令：

```bash
# 在项目根目录执行
npx vitepress build docs
```

构建后的文档将位于 `docs/.vitepress/dist` 目录中。

## 项目结构

文档项目的主要结构如下：

```
docs/
├── .vitepress/          # VitePress配置目录
│   ├── config.ts        # 站点配置文件
│   └── cache/           # 缓存目录
├── guide/               # 指南文档
│   └── getting-started.md # 快速开始指南
├── api/                 # API文档
│   ├── index.md         # API概览
│   ├── decorators.md    # 装饰器API
│   ├── helpers.md       # 辅助函数API
│   └── models.md        # 模型API
├── examples/            # 使用示例
│   └── basic-usage.md   # 基础使用示例
├── index.md             # 首页
└── README.md            # 文档说明
```

## 贡献指南

如果您发现文档中的错误或有改进建议，请提交issue或PR。我们欢迎社区贡献来完善文档。

## 联系我们
如有任何问题或建议，请随时联系我们。
