import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'any-rainy-day',
  description: '基于 Three.js 的逼真雨滴窗口效果库',
  base: '/AnyRainyDay/',
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c9ce7' }],
    ['meta', { name: 'keywords', content: 'three.js, rain effect, webgl, animation, interactive' }],
  ],

  themeConfig: {
    logo: '/logo.jpg',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/basic-usage' },
      {
        text: 'GitHub',
        link: 'https://github.com/WuCheng-cn/AnyRainyDay',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概览', link: '/api/' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '使用示例',
          items: [
            { text: '基础使用', link: '/examples/basic-usage' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WuCheng-cn/AnyRainyDay' },
    ],

    footer: {
      message: '基于 MIT 许可证开源',
      copyright: 'Copyright © 2025 WuCheng-cn',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: 'deep',
      label: '本页目录',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

})
