# any-core

any-core 是一个基于装饰器语法的快速开发框架核心包，通过装饰器对实体类的属性进行标记配置，实现与组件的自动化集成。适用于快速构建表单、表格、搜索等常见 UI 组件，并提供增强的类型安全特性。

## 主要功能

- **装饰器支持**：提供多种装饰器用于标记属性配置，支持 TypeScript 泛型，包括：
  - `@CustomField<T, P>`：自定义字段标记，支持泛型类型安全。
  - `@FormField`：用于表单字段配置（支持输入、复选框等类型）。
  - `@SearchField`：用于搜索字段配置。
  - `@TableField`：用于表格字段配置。

- **数据模型支持**：提供基础模型类（如 `AnyBaseModel`）和泛型字典模型类（如 `AnyDictionaryArrayModel<T, P>`），便于构建结构化数据。

- **辅助工具类**：包含日期处理、文件操作、数据转换、验证器等实用工具。

- **增强的类型安全**：通过 ClassFieldNames、ClassMethodNames 等类型工具，提供编译时类型检查和自动补全功能。

- **类型工具系统**：提供强大的类型工具，确保 API 使用的类型安全。

## 安装

使用 pnpm 安装：

```bash
pnpm install any-core
```

## 使用示例

### 使用 `@CustomField` 构建类型安全的字典字段

```ts
import { AnyBaseModel } from 'any-core'
import { CustomField } from 'any-core/decorator'
import { AnyDictionaryHelper } from 'any-core/helper'

// 使用枚举定义值类型
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

interface RolePayload {
  permissions: string[]
}

// 使用枚举创建字典数组
const roleDictArray = AnyDictionaryHelper.createDictionaryArray([
  { label: '管理员', value: UserRole.ADMIN, payload: { permissions: ['read', 'write', 'admin'] } },
  { label: '普通用户', value: UserRole.USER, payload: { permissions: ['read', 'write'] } }
])

// 使用as const创建字典数组
const enabledDictArray = AnyDictionaryHelper.createDictionaryArray([
  { label: '是', value: true },
  { label: '否', value: false }
] as const)

class User extends AnyBaseModel {
  @CustomField('用户角色', roleDictArray)
  role: UserRole = UserRole.USER

  @CustomField<boolean>('是否启用', enabledDictArray)
  enabled: boolean = true
}

// 使用类型安全的方法获取字典配置
const user = new User()
// 类型安全地获取自定义字段的字典数组
const roleDict = user.getFieldDictionaryArray('role')
if (roleDict) {
  // 类型安全地获取字典项
  const adminRole = roleDict.getDictByValue(UserRole.ADMIN)
  // 正确访问payload属性，TypeScript会进行类型检查
  console.log(adminRole?.payload?.permissions) // 输出: ['read', 'write', 'admin']
}
```

### 使用 `@FormField` 构建表单字段

```ts
import { AnyBaseModel } from 'any-core'
import { FormField } from 'any-core/decorator'
import { EFormItemType } from 'any-core/enum'

class Product extends AnyBaseModel {
  @FormField({
    formType: EFormItemType.INPUT,
    label: '产品名称',
    required: true,
    placeholder: '请输入产品名称'
  })
  name: string

  @FormField({
    formType: EFormItemType.NUMBER,
    label: '产品价格',
    required: true,
    placeholder: '请输入产品价格',
    rules: [{ required: true, message: '请输入产品价格' }]
  })
  price: number
}

// 使用类型安全的方法获取表单配置
const product = new Product()
// getFormFieldList返回类型安全的字段名称数组
const formFields = product.getFormFieldList()
// getFormFieldConfigObj可以接收类型安全的字段名称参数
const formConfig = product.getFormFieldConfigObj('name', 'price')
```

### 使用 `@TableField` 构建表格字段

```ts
import { AnyBaseModel } from 'any-core'
import { TableField } from 'any-core/decorator'
import { EDateFormatType } from 'any-core/enum'

class Order extends AnyBaseModel {
  @TableField({ label: '订单编号', width: 150, fixed: 'left' })
  orderNo: string

  @TableField({ label: '订单金额', width: 100, sorter: true })
  amount: number

  @TableField({
    label: '创建时间',
    width: 180,
    sorter: true,
    dateFormat: EDateFormatType.YYYY_MM_DD_HH_MM_SS
  })
  createTime: string
}

// 使用类型安全的方法获取表格配置
const order = new Order()
// 获取表格字段列表
const tableFields = order.getTableFieldList()
// 类型安全地获取字段标签
const orderNoLabel = order.getTableFieldLabel('orderNo')
```

## 文档

详细文档请查看 [项目文档](https://wucheng-cn.github.io/AnyCore/)。

## 贡献

欢迎提交 Pull Request 或 Issue。请遵循项目代码规范并编写清晰的提交信息。

## 许可证

该项目基于 MIT 许可证。详见 [LICENSE](LICENSE) 文件。
