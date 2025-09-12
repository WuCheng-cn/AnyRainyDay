# CHANGELOG | 变更日志

## [1.0.19](https://github.com/WuCheng-cn/AnyCore/compare/1.0.18...1.0.19) (2025-08-29)

### ♻️ Code Refactoring | 重构

* **interface:** 将 IFormProps 中的 Entity 重命名为 entity ([94d9822](https://github.com/WuCheng-cn/AnyCore/commit/94d9822efb793e0424480497ef20451665303458))

## [1.0.18](https://github.com/WuCheng-cn/AnyCore/compare/1.0.16...1.0.18) (2025-08-29)

### ♻️ Code Refactoring | 重构

* **model:** 移除冗余的类型断言 ([c20b32c](https://github.com/WuCheng-cn/AnyCore/commit/c20b32c08f9870c577ca26290c2fd46ecf415fd2))
* **model:** 移除冗余的类型断言并更新类型定义 ([57b38fb](https://github.com/WuCheng-cn/AnyCore/commit/57b38fbfbfe2d15e457585b4291de74a047c676f))

## [1.0.17](https://github.com/WuCheng-cn/AnyCore/compare/1.0.16...1.0.17) (2025-08-29)

### ♻️ Code Refactoring | 重构

* **model:** 移除冗余的类型断言 ([c20b32c](https://github.com/WuCheng-cn/AnyCore/commit/c20b32c08f9870c577ca26290c2fd46ecf415fd2))

## [1.0.16](https://github.com/WuCheng-cn/AnyCore/compare/1.0.15...1.0.16) (2025-08-29)

### ♻️ Code Refactoring | 重构

* **model:** 使用具体类型替代any类型声明 ([de09dad](https://github.com/WuCheng-cn/AnyCore/commit/de09dade66dc4c953c52551fdbe4327169b14276))

## [1.0.15](https://github.com/WuCheng-cn/AnyCore/compare/1.0.14...1.0.15) (2025-08-29)

### 🐛 Bug Fixes | 修复 bug

* **model:** 为字段列表方法添加类型断言 ([41b00fd](https://github.com/WuCheng-cn/AnyCore/commit/41b00fd71bbc2a04829317feae93f02115226c9c))

## [1.0.14](https://github.com/WuCheng-cn/AnyCore/compare/1.0.13...1.0.14) (2025-08-29)

### ♻️ Code Refactoring | 重构

* **helper:** 将sortByArray方法改为泛型并更新注释 ([9391f23](https://github.com/WuCheng-cn/AnyCore/commit/9391f235661883ea7c91456286d04d75381406c2))

## [1.0.13](https://github.com/WuCheng-cn/AnyCore/compare/1.0.12...1.0.13) (2025-08-28)

### ♻️ Code Refactoring | 重构

* **interface:** 移除IInputSelectorConfig并优化类型定义 ([84672ed](https://github.com/WuCheng-cn/AnyCore/commit/84672edab0df8ecdd1c0d48f7940eec8d0f8f8c1))

## [1.0.12](https://github.com/WuCheng-cn/AnyCore/compare/1.0.11...1.0.12) (2025-08-28)

## [1.0.11](https://github.com/WuCheng-cn/AnyCore/compare/1.0.10...1.0.11) (2025-08-28)

### ♻️ Code Refactoring | 重构

* 将继承改为Partial类型以增加灵活性 ([d3b3025](https://github.com/WuCheng-cn/AnyCore/commit/d3b30256601b5c3400a04e788295963c54748718))

## [1.0.10](https://github.com/WuCheng-cn/AnyCore/compare/1.0.9...1.0.10) (2025-08-28)

### ♻️ Code Refactoring | 重构

* **decorator:** 优化装饰器类型定义和类型安全 ([425ac68](https://github.com/WuCheng-cn/AnyCore/commit/425ac684c7c6088de295a7a3317ac6e5f0f62c2b))
* **model:** 优化getFormFieldList方法的类型定义 ([3b5a509](https://github.com/WuCheng-cn/AnyCore/commit/3b5a509424673bbe69271a8f4d68f3ecef9dceb3))

### 🐛 Bug Fixes | 修复 bug

* 修正SearchField相关函数命名拼写错误并添加类型测试 ([b330a4b](https://github.com/WuCheng-cn/AnyCore/commit/b330a4b92c6cf9cd5e8b822335b47b76d21e547e))
* **model:** 修正getTableFieldList方法的类型定义 ([3e6308b](https://github.com/WuCheng-cn/AnyCore/commit/3e6308b0812a0772dc6bee275b2b9662f090baaf))

### 📝 Documentation | 文档变更

* 更新项目文档链接为正确的URL ([00fef88](https://github.com/WuCheng-cn/AnyCore/commit/00fef8819fc9beef09ace9ee8562cc951b1b5d50))
* **api:** 修正类型定义文档中的转义符号格式 ([e185556](https://github.com/WuCheng-cn/AnyCore/commit/e185556c02ae26df6a9c5d1e07315cab1237e30f))

## [1.0.9](https://github.com/WuCheng-cn/AnyCore/compare/1.0.7...1.0.9) (2025-08-27)

### ♻️ Code Refactoring | 重构

* 移除测试文件及无用代码 ([e664cb2](https://github.com/WuCheng-cn/AnyCore/commit/e664cb2a46f377cf7bba3556fc4f6a7b23240c45))
* **dictionary:** 重构字典接口和模型以支持泛型 ([d8cb694](https://github.com/WuCheng-cn/AnyCore/commit/d8cb6943ae88522a12447f759f1dd5b193659459))
* **model:** 增强AnyBaseModel类型安全，添加测试文件 ([aba36ef](https://github.com/WuCheng-cn/AnyCore/commit/aba36ef4f839c4aaad57c1174e4987cb5b7d3554))
* **types:** 重构类型定义并优化模型类型安全 ([43d9f56](https://github.com/WuCheng-cn/AnyCore/commit/43d9f56d3949cf27b196e30c87f719603317d1dd))

### 📝 Documentation | 文档变更

* 更新文档以反映类型安全特性 ([dc07d4d](https://github.com/WuCheng-cn/AnyCore/commit/dc07d4d72aaf307453a6de46f1b0178a23c0eafd))
* **model:** 为getOptions方法添加返回类型注释 ([89e79be](https://github.com/WuCheng-cn/AnyCore/commit/89e79beb554fdead9870164e1b6a1e249f678530))
* **project:** 添加项目规则文档说明 ([911605a](https://github.com/WuCheng-cn/AnyCore/commit/911605a66d9859c01507c601dceb6371ce7e48b2))

### 🚀 Chores | 构建/工程依赖/工具

* 更新版本号至1.0.8 ([b926f01](https://github.com/WuCheng-cn/AnyCore/commit/b926f016ec9535af006b32c39d5f8ebd906ee810))

## [1.0.7](https://github.com/WuCheng-cn/AnyCore/compare/1.0.6...1.0.7) (2025-08-21)

## [1.0.6](https://github.com/WuCheng-cn/AnyCore/compare/1.0.5...1.0.6) (2025-08-21)

### ♻️ Code Refactoring | 重构

* **build:** 重构项目构建配置支持多入口模块 ([b23e52f](https://github.com/WuCheng-cn/AnyCore/commit/b23e52f247d93687ab2df691eed387818c10f05b))

## [1.0.5](https://github.com/WuCheng-cn/AnyCore/compare/1.0.4...1.0.5) (2025-08-21)

### ♻️ Code Refactoring | 重构

* **types:** 重构类构造函数类型导出方式 ([e236447](https://github.com/WuCheng-cn/AnyCore/commit/e2364479229c74a299c21bb47ac36381f7b8ec5e))

### 📦️ Builds | 打包

* **vite:** 修改TypeScript声明文件生成配置 ([f6fa789](https://github.com/WuCheng-cn/AnyCore/commit/f6fa7897bb8c445800ef3d4a54c335166ffe2d4f))

## [1.0.4](https://github.com/WuCheng-cn/AnyCore/compare/1.0.3...1.0.4) (2025-08-21)

### ♻️ Code Refactoring | 重构

* 重构模块导出方式并添加新模型 ([32a3c07](https://github.com/WuCheng-cn/AnyCore/commit/32a3c0737fde554e78d17bd7b830629f3b3fbbe0))
* **types:** 从 './ClassConstructor' 导出特定类型 ([11b8c38](https://github.com/WuCheng-cn/AnyCore/commit/11b8c38669b85c5f9bcbffc10e4c304cd9b083d4))

## [1.0.3](https://github.com/WuCheng-cn/AnyCore/compare/1.0.2...1.0.3) (2025-08-20)

### 📦️ Builds | 打包

* 配置TypeScript声明文件和构建输出 ([3dcceba](https://github.com/WuCheng-cn/AnyCore/commit/3dcceba8c2163630325d0e953f786a17a533ca83))

### 🚀 Chores | 构建/工程依赖/工具

* 更新 VSCode 设置以支持文件嵌套展示 ([1cea799](https://github.com/WuCheng-cn/AnyCore/commit/1cea799050ada72641279fdd10d2a69c4f8bfc56))

## [1.0.2](https://github.com/WuCheng-cn/AnyCore/compare/1.0.1...1.0.2) (2025-08-20)

### 📝 Documentation | 文档变更

* !1 Update README.md ([45d4dd6](https://github.com/WuCheng-cn/AnyCore/commit/45d4dd64bf7010abb48a97a3aa2686396bf95d29))
* 更新文档配置和内容 ([91b5d94](https://github.com/WuCheng-cn/AnyCore/commit/91b5d94092e3dbbf21390e5ac908c45c7c1d90c8))
* 添加基础路径配置以匹配GitHub仓库 ([f20cbcb](https://github.com/WuCheng-cn/AnyCore/commit/f20cbcb6ad3f664fbf5dca163ddfc999f8077017))

### 🚀 Chores | 构建/工程依赖/工具

* add LICENSE. ([aa3a5d1](https://github.com/WuCheng-cn/AnyCore/commit/aa3a5d179665df5697609c2f94f3dd00fcf7ffd5))
* **docs:** 添加VitePress文档站点及初始化内容 ([3b21e37](https://github.com/WuCheng-cn/AnyCore/commit/3b21e37ba1da18da021568480e5726d6901648e4))

## 1.0.1 (2025-08-20)

### ♻️ Code Refactoring | 重构

* Refactor code structure for improved readability and maintainability ([608e7a3](https://gitee.com/aragakki_yui/any-core/commit/608e7a3d4d46bb52d4098d06c6f56e107c231b65))

### 🎉 Init | 初始化

* core包初始化 ([5c4ff84](https://gitee.com/aragakki_yui/any-core/commit/5c4ff84197711defb5831e1fdc491e79b5d89834))

### 📦️ Builds | 打包

* 修改构建配置和发布脚本 ([8bd081e](https://gitee.com/aragakki_yui/any-core/commit/8bd081ec700017d5332fbbad5d401a9cfd2935a5))

### 🚀 Chores | 构建/工程依赖/工具

* 更新 .gitignore 和添加 .yarnrc.yml 配置文件 ([348948a](https://gitee.com/aragakki_yui/any-core/commit/348948ad6067fa37bde17ac5ba0f0c7f35c878ec))
* 将 release 脚本中的 build 命令改为 pnpm build ([8235257](https://gitee.com/aragakki_yui/any-core/commit/82352578247743d51f5cfbcf50e060bfcc4269e5))
* 添加 @release-it/conventional-changelog 依赖 ([82c0304](https://gitee.com/aragakki_yui/any-core/commit/82c03046914ee954408292b5669f861b35ca442c))
* 添加 conventional-changelog 依赖 ([4f7fff1](https://gitee.com/aragakki_yui/any-core/commit/4f7fff100cd63ba4aa8a77ee3e144426013285da))
* 移除空的devDependencies配置 ([5b91fee](https://gitee.com/aragakki_yui/any-core/commit/5b91fee82575eb87f1966f215976fefd5093040a))
* **custom:** 工程化 ([e0d52c6](https://gitee.com/aragakki_yui/any-core/commit/e0d52c6c2f71818f7f42515a326f671db45b78bd))
