# 快速开始

本指南将帮助你快速上手AnyCore框架，了解其基本概念和使用方法。

## 安装

使用npm、yarn或pnpm安装AnyCore：

```bash
# 使用npm
npm install any-core

# 使用yarn
yarn add any-core

# 使用pnpm
pnpm add any-core
```

## 基础概念

AnyCore是一个基于装饰器语法的快速开发框架核心包，主要通过装饰器对实体类的属性进行标记配置，实现与组件的自动化集成。

主要功能模块包括：

- **装饰器模块**：提供各种装饰器用于标记和配置类和字段，支持TypeScript泛型
- **辅助函数模块**：提供各种工具函数用于数据处理和转换
- **模型模块**：提供基础模型类，包含通用操作方法，具有增强的类型安全特性
- **接口和枚举**：定义框架中使用的各种接口和枚举类型
- **类型工具**：提供强大的类型系统，如ClassFieldNames、ClassMethodNames等

## 类型安全特性

AnyCore框架提供了强大的类型安全特性，可以在编译时捕获潜在的类型错误：

- 使用TypeScript泛型定义字段类型关系
- 通过ClassFieldNames类型保证字段名称的正确性
- 支持类型安全的方法调用和配置获取
- 为字典数据提供泛型支持，确保类型安全

## 创建第一个实体类

下面是一个简单的示例，展示如何创建一个带有装饰器的实体类，包括最新的泛型支持：

```typescript
import { AnyBaseModel } from 'any-core'
import { CustomField, FormField, TableField } from 'any-core/decorator'
import { AnyDictionaryHelper } from 'any-core/helper'
import { EFormItemType } from 'any-core/enum'

// 定义用户角色枚举
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

// 定义角色权限接口
interface RolePayload {
  permissions: string[]
}

// 使用枚举创建带payload的字典数组
const roleDict = AnyDictionaryHelper.createDictionaryArray([
  { label: '管理员', value: UserRole.ADMIN, payload: { permissions: ['read', 'write', 'admin'] } },
  { label: '普通用户', value: UserRole.USER, payload: { permissions: ['read', 'write'] } }
])

// 使用as const创建布尔类型字典数组
const enabledDict = AnyDictionaryHelper.createDictionaryArray([
  { label: '是', value: true },
  { label: '否', value: false }
] as const)

class User extends AnyBaseModel {
  @FormField({ formType: EFormItemType.INPUT, label: '用户名' })
  @TableField({ label: '用户名', width: 120 })
  username: string

  @FormField({ formType: EFormItemType.PASSWORD, label: '密码' })
  password: string

  @FormField({ formType: EFormItemType.SELECT, label: '用户角色', options: roleDict })
  @TableField({ label: '用户角色', width: 100 })
  @CustomField<UserRole, RolePayload>('用户角色', roleDict)
  role: UserRole

  @FormField({ formType: EFormItemType.DATE_PICKER, label: '创建时间' })
  @TableField({ label: '创建时间', width: 180 })
  createTime: string

  @FormField({ formType: EFormItemType.SWITCH, label: '是否启用' })
  @TableField({ label: '是否启用', width: 80 })
  @CustomField<boolean>('是否启用', enabledDict)
  enabled: boolean
}
```

## 使用实体类

创建实体类后，你可以使用AnyCore提供的类型安全方法获取配置信息并用于组件渲染：

```typescript
// 获取表单字段配置
const user = new User()
// getFormFieldList返回类型安全的字段名称数组
const formFields = user.getFormFieldList()
// getFormFieldConfigObj可以接收类型安全的字段名称参数
const partialFormConfig = user.getFormFieldConfigObj('username', 'role')

// 类型安全地获取字段标签
const usernameLabel = user.getFormFieldLabel('username')
// 也可以使用静态方法调用
const staticRoleLabel = User.getFormFieldLabel('role')

// 获取表格字段配置
const tableConfig = user.getTableFieldConfigObj()

// 获取类型安全的字段字典数组
const roleDictionary = user.getFieldDictionaryArray('role')
if (roleDictionary) {
  // 类型安全地获取字典项，支持枚举类型
  const adminRole = roleDictionary.getDictByValue(UserRole.ADMIN)
  // 正确访问payload属性，TypeScript会进行类型检查
  console.log(adminRole?.payload?.permissions) // 输出: ['read', 'write', 'admin']
}

// 使用静态方法获取字典数组
const staticRoleDict = User.getFieldDictionaryArray('role')
```

## 下一步

- 查看[API文档](/api/)了解更多详细信息
- 查看[使用示例](/examples/basic-usage)了解实际应用场景
