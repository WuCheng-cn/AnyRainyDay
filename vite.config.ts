import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    // 添加dts插件来生成类型声明文件
    dts({
      insertTypesEntry: true,
      // 输出类型声明文件到dist/types目录
      outDir: resolve(__dirname, 'dist/types'),
      // 包含src目录下的所有TypeScript文件
      include: ['src/**/*.ts'],
      // 排除测试文件
      exclude: ['src/test/**/*'],
    }),
  ],
  build: {
    // 清除dist目录
    emptyOutDir: true,
    lib: {
      // 指定多入口文件
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      // 库的全局变量名（在 UMD 格式中使用）
      name: 'RainyWindow',
      // 输出的文件名格式
      fileName: (format, entryName) => {
        if (format === 'umd')
          return `${entryName}.min.js`
        return `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`
      },
      // 指定输出格式，可以是 'es' | 'cjs' | 'umd' | 'iife' 的数组
      formats: ['es', 'cjs', 'umd'],
    },
    // 配置 Rollup 选项
    rollupOptions: {
      // 声明外部依赖，避免将它们打包进库中
      external: ['three'], // 将Three.js作为外部依赖
      // 全局变量映射（UMD 构建时使用）
      output: {
        globals: {
          three: 'THREE',
        },
        // 对于UMD格式不保留模块结构
        preserveModules: false,
        // 修复路径引用问题
        paths: {
          '@': resolve(__dirname, 'src'),
        },
      },
    },
  },
})
