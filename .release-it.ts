/**
 * # Release-it 发布配置
 *
 * @description
 * 该配置文件用于 release-it 工具，实现自动化版本发布流程
 * 主要功能包括：
 * 1. 基于 conventional commits 规范生成变更日志
 * 2. 使用 emoji 标识不同的提交类型
 * 3. 自动创建 Git 发布提交
 * 4. 生成中英双语的 CHANGELOG.md
 *
 * @see https://github.com/release-it/release-it
 * @see https://github.com/conventional-changelog/conventional-changelog
 */
export default {
  plugins: {
    /**
     * Conventional Changelog 插件配置
     * 用于根据提交信息自动生成标准化的变更日志
     */
    '@release-it/conventional-changelog': {
      /** 输出的变更日志文件路径 */
      infile: 'CHANGELOG.md',
      /** 变更日志的标题 */
      header: '# CHANGELOG | 变更日志',
      /** 使用 conventional commits 预设 */
      preset: { name: 'conventionalcommits' },

      /** 提交信息解析配置 */
      parserOpts: {
        /**
         * 提交信息头部匹配正则
         * 格式：:emoji: type(scope): subject
         * 支持 emoji 字符和 :emoji: 格式的表情符号
         */
        headerPattern: /^(\p{Emoji_Presentation}|:[a-z]+:) (\w+)(?:\(([\w-]+)\))?: (.+)$/u,
        /** 匹配组与字段的对应关系 */
        headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
        /** 重要变更的关键字标识 */
        noteKeywords: ['BREAKING CHANGE'],
      },

      /** 变更日志写入配置 */
      writerOpts: {
        /**
         * 转换提交记录格式
         * @param commit - 原始提交对象
         * @returns 转换后的提交对象或 null（过滤掉）
         */
        transform: (commit) => {
          /** Emoji 与提交类型的映射表 */
          const typeEmojiMap = {
            fix: '🐛',
            feat: '✨',
            chore: '🚀',
            docs: '📝',
            style: '🎨',
            refactor: '♻️',
            perf: '⚡️',
            test: '✅',
            build: '📦️',
            ci: '👷',
            revert: '⏪️',
            init: '🎉',
          }

          /** 提交类型与显示标题的映射表（中英双语） */
          const typesTitleMap = {
            feat: '✨ Features | 新功能',
            fix: '🐛 Bug Fixes | 修复 bug',
            init: '🎉 Init | 初始化',
            docs: '📝 Documentation | 文档变更',
            style: '🎨 Styles | 代码样式美化',
            refactor: '♻️ Code Refactoring | 重构',
            perf: '⚡️ Performance Improvements | 性能优化',
            test: '✅ Tests | 测试',
            revert: '⏪️ Reverts | 回退',
            build: '📦️ Builds | 打包',
            chore: '🚀 Chores | 构建/工程依赖/工具',
            ci: '👷 Continuous Integrations | CI 相关变更',
          }

          // 标准化处理：为支持的提交类型添加 emoji 和格式化信息
          if (typeEmojiMap[commit.type]) {
            return {
              ...commit,
              emoji: typeEmojiMap[commit.type],
              // 格式化提交头部，包含超链接到提交记录
              header: `${typeEmojiMap[commit.type]} ${commit.type}${
                commit.scope ? `(${commit.scope})` : ''
              }: ${commit.subject} ([${commit.shortHash}](${commit.host}/${
                commit.repository
              }/commit/${commit.hash}))`,
              shortHash: commit.hash?.substring(0, 7) || '',
              type: typesTitleMap[commit.type],
            }
          }

          // 过滤掉没有 emoji 映射的提交类型
          return null
        },

        /** 按类型分组提交 */
        groupBy: 'type',
        /** 提交组按标题排序 */
        commitGroupsSort: 'title',
        /** 提交按作用域和主题排序 */
        commitsSort: ['scope', 'subject'],

        /**
         * 提交过滤函数
         * 只保留有 emoji 映射的标准提交类型
         */
        filter: (commit) => {
          // 过滤掉早期非标准的提交类型
          return !!commit.emoji
        },
      },
    },
  },

  /** Git 相关配置 */
  git: {
    /**
     * 发布提交消息模板
     * 使用 ${version} 作为版本号的占位符
     * 遵循 conventional commits 规范
     */
    // eslint-disable-next-line no-template-curly-in-string
    commitMessage: '🚀 chore(release): Release v${version}',
  },
}
