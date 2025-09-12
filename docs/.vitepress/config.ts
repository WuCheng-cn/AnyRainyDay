import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'any-rainy-day',
  description: '基于 Three.js 的逼真雨滴窗口效果库',
  base: '/any-rainy-day/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c9ce7' }],
    ['meta', { name: 'keywords', content: 'three.js, rain effect, webgl, animation, interactive' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/basic-usage' },
      {
        text: 'GitHub',
        link: 'https://github.com/your-username/any-rainy-day'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
            { text: '基础概念', link: '/guide/basic-concepts' },
            { text: '配置选项', link: '/guide/configuration' },
            { text: '性能优化', link: '/guide/performance' },
            { text: '浏览器兼容性', link: '/guide/browser-support' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概览', link: '/api/' },
            { text: 'RainyWindow', link: '/api/rainy-window' },
            { text: '配置选项', link: '/api/configuration' },
            { text: '事件系统', link: '/api/events' },
            { text: '方法', link: '/api/methods' },
            { text: '类型定义', link: '/api/types' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '使用示例',
          items: [
            { text: '基础使用', link: '/examples/basic-usage' },
            { text: '响应式设计', link: '/examples/responsive' },
            { text: '主题切换', link: '/examples/theme-switch' },
            { text: '高级交互', link: '/examples/advanced-interactions' },
            { text: '性能监控', link: '/examples/performance' },
            { text: '实际应用', link: '/examples/real-world' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/any-rainy-day' }
    ],

    footer: {
      message: '基于 MIT 许可证开源',
      copyright: 'Copyright © 2024 any-rainy-day 项目团队'
    },

    editLink: {
      pattern: 'https://github.com/your-username/any-rainy-day/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: 'deep',
      label: '本页目录'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  vite: {
    server: {
      port: 3000,
      host: true
    },
    build: {
      outDir: '../dist/docs'
    }
  }
})
