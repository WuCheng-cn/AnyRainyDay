module.exports = {
  types: [
    { name: '🙈 wip:      开发中', value: ':see_no_evil: feat' },
    { name: '⚡️ perf:     优化', value: ':zap: perf' },
    { name: '🐛 fix:      修复 bug', value: ':bug: fix' },
    { name: '✨ feat:     新功能', value: ':sparkles: feat' },
    { name: '📝 docs:     文档变更', value: ':memo: docs' },
    { name: '🎨 style:    样式美化', value: ':art: style' },
    { name: '♻️  refactor: 重构', value: ':recycle: refactor' },
    { name: '✅ test:     测试', value: ':white_check_mark: test' },
    { name: '⏪️ revert:   回退', value: ':rewind: revert' },
    { name: '📦️ build:    打包', value: ':package: build' },
    { name: '🚀 chore:    构建/工程依赖/工具', value: ':rocket: chore' },
    { name: '👷 ci:       CI 相关变更', value: ':construction_worker: ci' },
  ],
  scopes: [
    { name: 'public' },
    { name: 'view' },
    { name: 'components' },
    { name: 'utils' },
  ],
  messages: {
    type: '选择你的提交类型(必填):',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述,使用"|"换行(可选)：',
    footer:
      '关联关闭的issue，例如：#1, #2(可选);破坏性修改参照 BREAKING CHANGE: 变动的描述/理由/迁移方法:',
    confirmCommit: '确认要使用以上信息提交?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100,
}
