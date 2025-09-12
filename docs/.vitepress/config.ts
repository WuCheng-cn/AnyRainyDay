import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AnyCore',
  // 设置基础路径，对应GitHub仓库名称
  base: '/AnyCore/',
  description: 'AnyCore是一个提供自动化组件渲染能力的基础库，通过装饰器对entity class 的属性进行标记配置，实现与组件的自动化集成。适用于快速构建表单、表格、搜索等常见UI组件。',
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/basic-usage' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'API参考',
        items: [
          { text: 'API概览', link: '/api/' },
          { text: '装饰器', link: '/api/decorators' },
          { text: '辅助函数', link: '/api/helpers' },
          { text: '模型', link: '/api/models' },
        ],
      },
      {
        text: '使用示例',
        items: [
          { text: '基础使用', link: '/examples/basic-usage' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WuCheng-cn/AnyCore' },
    ],
  },
})
