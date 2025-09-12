# 装饰器API

AnyCore框架提供了一系列装饰器，用于标记和配置类和字段的元数据。本章节将详细介绍各个装饰器的使用方法和参数说明。

## CustomClass

`CustomClass`装饰器用于配置类的自定义信息。

### 用法

```typescript
import { CustomClass } from 'any-core/decorator'

@CustomClass({
  name: '用户信息'
})
export class User {
  // 类的属性和方法
}
```

### 参数

| 参数名 | 类型 | 说明 | 是否必填 |
|--------|------|------|----------|
| `config` | `object` | 类配置对象 | 否 |
| `config.name` | `string` | 类的自定义名称 | 否 |

### 相关函数

#### getCustomClassConfig

```typescript
function getCustomClassConfig(target: any): { name?: string }
```

**说明**：获取类的自定义配置信息。

**参数**：

- `target`：目标类的构造函数或实例

**返回值**：包含类配置信息的对象

**示例**：

```typescript
const config = getCustomClassConfig(User)
console.log(config.name) // 输出: '用户信息'
```

## CustomField

`CustomField`装饰器用于配置字段的自定义名称和字典数组，支持泛型类型安全。

### 用法

```typescript
import { CustomField } from 'any-core/decorator'
import { AnyDictionaryHelper } from 'any-core/helper'

// 定义用户状态枚举
enum UserStatus {
  ENABLED = 1,
  DISABLED = 0
}

// 定义角色描述接口
interface RoleDescription {
  desc: string
}

// 使用枚举创建字典数组
const statusDict = AnyDictionaryHelper.createDictionaryArray([
  { label: '启用', value: UserStatus.ENABLED },
  { label: '禁用', value: UserStatus.DISABLED }
])

// 使用枚举创建带payload的字典数组
const roleDict = AnyDictionaryHelper.createDictionaryArray([
  { label: '管理员', value: 'admin', payload: { desc: '系统管理员' } as RoleDescription },
  { label: '普通用户', value: 'user', payload: { desc: '普通访问用户' } as RoleDescription }
])

// 使用as const创建布尔类型字典数组
const boolDict = AnyDictionaryHelper.createDictionaryArray([
  { label: '是', value: true },
  { label: '否', value: false }
] as const)

class User {
  @CustomField('用户名')
  username: string

  @CustomField<UserStatus>('用户状态', statusDict)
  status: UserStatus

  @CustomField<string, RoleDescription>('用户角色', roleDict)
  role: string

  @CustomField<boolean>('是否启用', boolDict)
  enabled: boolean
}
```

### 参数

| 参数名 | 类型 | 说明 | 是否必填 |
|--------|------|------|----------|
| `name` | `string` | 字段的自定义名称 | 是 |
| `dictionaryArray` | `AnyDictionaryArrayModel<AnyDictionaryModel<T, P>> \| (() => Promise<IDictionary<T, P>[]>)` | 字典数组或获取字典数组的函数 | 否 |

### 泛型参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| `T` | `any` | 字典值(value)的类型 |
| `P` | `any` | 字典附加信息(payload)的类型 |

### 相关函数

#### getCustomFieldName

```typescript
function getCustomFieldName(target: any, field: string): string | undefined
```

**说明**：获取字段的自定义名称。

**参数**：

- `target`：目标类的构造函数或实例
- `field`：字段名

**返回值**：字段的自定义名称，如果未配置则返回undefined

**示例**：

```typescript
const user = new User()
console.log(getCustomFieldName(user, 'username')) // 输出: '用户名'
console.log(getCustomFieldName(user, 'status')) // 输出: '用户状态'
```

#### getCustomFieldDictionaryArray

```typescript
function getCustomFieldDictionaryArray<T = any, P = any>(target: any, field: string): AnyDictionaryArrayModel<AnyDictionaryModel<T, P>> | undefined
```

**说明**：获取字段的字典数组。

**参数**：

- `target`：目标类的构造函数或实例
- `field`：字段名

**返回值**：字段的字典数组，如果未配置则返回undefined

**示例**：

```typescript
const user = new User()
// 获取状态字段的字典数组
const statusDict = getCustomFieldDictionaryArray<UserStatus>(user, 'status')
// 类型安全地获取字典项
const enabledStatus = statusDict?.getDictByValue(UserStatus.ENABLED)
console.log(enabledStatus?.label) // 输出: '启用'

// 获取角色字段的字典数组
const roleDict = getCustomFieldDictionaryArray<string, RoleDescription>(user, 'role')
const adminRole = roleDict?.getDictByValue('admin')
console.log(adminRole?.payload?.desc) // 输出: '系统管理员'

## FormField

`FormField`装饰器用于配置字段的表单相关属性。

### 用法

```typescript
import { FormField } from 'any-core/decorator'
import { EFormItemType } from 'any-core/enum'

class User {
  @FormField({
    formType: EFormItemType.INPUT,
    label: '用户名',
    placeholder: '请输入用户名',
    required: true,
    rules: [{ required: true, message: '用户名不能为空' }]
  })
  username: string

  @FormField({
    formType: EFormItemType.SELECT,
    label: '用户角色',
    options: [{ label: '管理员', value: 'admin' }, { label: '普通用户', value: 'user' }]
  })
  role: string
}
```

### 参数

| 参数名 | 类型 | 说明 | 是否必填 |
|--------|------|------|----------|
| `config` | `IFormFieldConfig` | 表单字段配置对象 | 否 |

`IFormFieldConfig` 接口包含以下属性：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `formType` | `EFormItemType` | 表单控件类型，默认为INPUT |
| `label` | `string` | 字段标签 |
| `placeholder` | `string` | 占位符文本 |
| `rules` | `Array` | 验证规则数组 |
| `disabled` | `boolean` | 是否禁用字段 |
| `required` | `boolean` | 是否必填字段 |
| `options` | `Array` | 选择器选项数组，格式为`[{ label: string, value: any }]` |
| `isOnlySearch` | `boolean` | 是否仅用于搜索，设置为true时不会在表单中显示 |

### 相关函数

#### getFormFieldList

```typescript
function getFormFieldList(target: any): string[]
```

**说明**：获取配置了FormField装饰器的字段列表（排除isOnlySearch为true的字段）。

**参数**：

- `target`：目标类的构造函数或实例

**返回值**：字段名数组

**示例**：

```typescript
const user = new User()
const formFields = getFormFieldList(user)
console.log(formFields) // 输出: ['username', 'role']
```

#### getFormFieldConfigObj

```typescript
function getFormFieldConfigObj(target: any, fieldList: string[] = []): Record<string, IFormFieldConfig>
```

**说明**：获取字段的表单配置对象。

**参数**：

- `target`：目标类的构造函数或实例
- `fieldList`：字段名列表，不传时获取所有标记了@FormField的属性的配置

**返回值**：字段配置对象，键为字段名，值为配置对象

## TableField

`TableField`装饰器用于配置字段的表格相关属性。

### 用法

```typescript
import { TableField } from 'any-core/decorator'

class User {
  @TableField({
    label: '用户名',
    width: 120,
    fixed: 'left'
  })
  username: string

  @TableField({
    label: '创建时间',
    width: 180,
    sorter: true
  })
  createTime: string
}
```

### 参数

| 参数名 | 类型 | 说明 | 是否必填 |
|--------|------|------|----------|
| `config` | `ITableFieldConfig` | 表格字段配置对象 | 否 |

`ITableFieldConfig` 接口包含以下属性：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `label` | `string` | 字段标签 |
| `width` | `string \| number` | 列宽 |
| `ellipsis` | `boolean` | 内容过长时是否省略显示 |
| `sorter` | `boolean` | 是否可排序 |
| `fixed` | `'left' \| 'right'` | 是否固定列 |
| `align` | `'left' \| 'center' \| 'right'` | 对齐方式 |
| `customRender` | `(params: any) => any` | 自定义渲染函数 |
| `dateFormat` | `EDateFormatType` | 日期格式，传入后会在渲染时自动转换 |
| `isAlways` | `boolean` | 是否常驻在表格中（不受自定义列影响） |

### 相关函数

#### getTableFieldList

```typescript
function getTableFieldList(target: any): string[]
```

**说明**：获取配置了TableField装饰器的字段列表。

**参数**：

- `target`：目标类的构造函数或实例

**返回值**：字段名数组

#### getTableFieldConfigObj

```typescript
function getTableFieldConfigObj(target: any, fieldList: string[] = []): Record<string, ITableFieldConfig>
```

**说明**：获取字段的表格配置对象。

**参数**：

- `target`：目标类的构造函数或实例
- `fieldList`：字段名列表，不传时获取所有标记了@TableField的属性的配置

**返回值**：字段配置对象，键为字段名，值为配置对象

## SearchField

`SearchField`装饰器用于配置字段的搜索相关属性。

### 用法

```typescript
import { SearchField } from 'any-core/decorator'
import { EFormItemType } from 'any-core/enum'

class User {
  @SearchField({
    formType: EFormItemType.INPUT,
    label: '用户名',
    placeholder: '请输入用户名搜索'
  })
  username: string
}
```

### 相关函数

#### getSearchFieldList

```typescript
function getSearchFieldList(target: any): string[]
```

**说明**：获取配置了SearchField装饰器的字段列表。

**参数**：

- `target`：目标类的构造函数或实例

**返回值**：字段名数组

#### getSearchFieldConfigObj

```typescript
function getSearchFieldConfigObj(target: any, fieldList: string[] = []): Record<string, ISearchFieldConfig>
```

**说明**：获取字段的搜索配置对象。

**参数**：

- `target`：目标类的构造函数或实例
- `fieldList`：字段名列表，不传时获取所有标记了@SearchField的属性的配置

**返回值**：字段配置对象，键为字段名，值为配置对象
