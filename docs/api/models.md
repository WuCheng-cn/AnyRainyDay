# 模型API

AnyCore框架提供了基础模型类，用于处理实体类的通用操作。本章节将详细介绍各个模型类的使用方法和属性。

## AnyBaseModel

`AnyBaseModel`是AnyCore框架的基础模型类，所有实体类的基类。它提供了一系列通用操作方法，用于处理实体类的字段配置、标签获取等，支持增强的类型安全性。

### 类定义

```typescript
/**
 * # 基础模型，包含一些通用操作
 */
export class AnyBaseModel {
  // 各种方法...
}
```

### 主要方法

#### getFormFieldLabel

```typescript
getFormFieldLabel(field: ClassFieldNames<this>): string
```

**说明**：获取表单字段的标签。优先返回`@FormField`配置的label，其次返回`@CustomField`配置的值，否则返回字段key。

**参数**：
- `field`：当前字段key，使用`ClassFieldNames<this>`类型确保只能传入有效的字段名称

**返回值**：字段的标签文本

**示例**：

```typescript
const user = new User()
console.log(user.getFormFieldLabel('username')) // 输出: '用户名'
// TypeScript会报错，因为'methodName'是一个方法而不是字段
// console.log(user.getFormFieldLabel('methodName'))
```

#### static getFormFieldLabel

```typescript
static getFormFieldLabel<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>): string
```

**说明**：静态方法，获取表单字段的标签。内部调用实例方法。

**参数**：
- `field`：当前字段key，使用`ClassFieldNames<T>`类型确保只能传入有效的字段名称

**返回值**：字段的标签文本

**示例**：

```typescript
console.log(User.getFormFieldLabel('username')) // 输出: '用户名'
```

#### getTableFieldLabel

```typescript
getTableFieldLabel(field: ClassFieldNames<this>): string
```

**说明**：获取表格字段的标签。优先返回`@TableField`配置的label，其次返回`@CustomField`配置的值，否则返回字段key。

**参数**：
- `field`：当前字段key，使用`ClassFieldNames<this>`类型确保只能传入有效的字段名称

**返回值**：字段的标签文本

**示例**：

```typescript
const user = new User()
console.log(user.getTableFieldLabel('username')) // 输出: '用户名'
```

#### static getTableFieldLabel

```typescript
static getTableFieldLabel<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>): string
```

**说明**：静态方法，获取表格字段的标签。内部调用实例方法。

**参数**：
- `field`：当前字段key，使用`ClassFieldNames<T>`类型确保只能传入有效的字段名称

**返回值**：字段的标签文本

**示例**：

```typescript
console.log(User.getTableFieldLabel('username')) // 输出: '用户名'
```

#### getFormFieldConfigObj

```typescript
getFormFieldConfigObj(...fieldList: ClassFieldNames<this>[]): Record<ClassFieldNames<this>, IFormFieldConfig>
```

**说明**：获取表单字段配置对象。

**参数**：
- `fieldList`：可选，字段列表，不传时获取所有标记了`@FormField`的属性的配置
- 支持rest参数语法，传入类型安全的字段名称

**返回值**：字段配置对象，键为字段名，值为配置对象

**示例**：

```typescript
const user = new User()
// 获取所有表单字段配置
const formConfig = user.getFormFieldConfigObj()
console.log(formConfig.username) // 输出: { formType: 'INPUT', label: '用户名', ... }

// 获取特定表单字段配置
const partialConfig = user.getFormFieldConfigObj('username', 'role')
```

#### getTableFieldConfigObj

```typescript
getTableFieldConfigObj(...fieldList: ClassFieldNames<this>[]): Record<ClassFieldNames<this>, ITableFieldConfig>
```

**说明**：获取表格字段配置对象。

**参数**：
- `fieldList`：可选，字段列表，不传时获取所有标记了`@TableField`的属性的配置
- 支持rest参数语法，传入类型安全的字段名称

**返回值**：字段配置对象，键为字段名，值为配置对象

**示例**：

```typescript
const user = new User()
const tableConfig = user.getTableFieldConfigObj()
console.log(tableConfig.username) // 输出: { label: '用户名', width: 120, ... }
```

#### getSearchFieldConfigObj

```typescript
getSearchFieldConfigObj(...fieldList: ClassFieldNames<this>[]): Record<ClassFieldNames<this>, ISearchFieldConfig>
```

**说明**：获取搜索字段配置对象。

**参数**：
- `fieldList`：可选，字段列表，不传时获取所有标记了`@SearchField`的属性的配置
- 支持rest参数语法，传入类型安全的字段名称

**返回值**：字段配置对象，键为字段名，值为配置对象

#### getSearchFieldLabel

```typescript
getSearchFieldLabel(field: ClassFieldNames<this>): string
```

**说明**：获取搜索字段的标签。优先返回`@SearchField`配置的label，其次返回`@CustomField`配置的值，否则返回字段key。

**参数**：
- `field`：当前字段key，使用`ClassFieldNames<this>`类型确保只能传入有效的字段名称

**返回值**：字段的标签文本

**示例**：

```typescript
const user = new User()
console.log(user.getSearchFieldLabel('username')) // 输出: '用户名'
```

#### static getSearchFieldLabel

```typescript
static getSearchFieldLabel<T extends AnyBaseModel>(this: new () => T, field: ClassFieldNames<T>): string
```

**说明**：静态方法，获取搜索字段的标签。内部调用实例方法。

**参数**：
- `field`：当前字段key，使用`ClassFieldNames<T>`类型确保只能传入有效的字段名称

**返回值**：字段的标签文本

#### getFormFieldList

```typescript
getFormFieldList(): ClassFieldNames<this>[]
```

**说明**：获取表单字段列表。

**返回值**：字段名数组，使用`ClassFieldNames<this>`类型确保类型安全

**示例**：

```typescript
const user = new User()
const fields = user.getFormFieldList()
console.log(fields) // 输出: ['username', 'password', 'role', ...]
```

#### getTableFieldList

```typescript
getTableFieldList(): ClassFieldNames<this>[]
```

**说明**：获取表格字段列表。

**返回值**：字段名数组，使用`ClassFieldNames<this>`类型确保类型安全

**示例**：

```typescript
const user = new User()
const fields = user.getTableFieldList()
console.log(fields) // 输出: ['username', 'role', 'createTime', ...]
```

#### getSearchFieldList

```typescript
getSearchFieldList(): ClassFieldNames<this>[]
```

**说明**：获取搜索字段列表。

**返回值**：字段名数组，使用`ClassFieldNames<this>`类型确保类型安全

## 使用示例

下面是一个完整的示例，展示如何继承`AnyBaseModel`并使用其方法：

```typescript
import { AnyBaseModel } from 'any-core'
import { CustomField, FormField, TableField } from 'any-core/decorator'
import { EFormItemType } from 'any-core/enum'

// 定义实体类
class User extends AnyBaseModel {
  @FormField({ formType: EFormItemType.INPUT, label: '用户名' })
  @TableField({ label: '用户名', width: 120 })
  @CustomField('用户名')
  username: string

  @FormField({ formType: EFormItemType.PASSWORD, label: '密码' })
  password: string

  @FormField({
    formType: EFormItemType.SELECT,
    label: '用户角色',
    options: [{ label: '管理员', value: 'admin' }, { label: '普通用户', value: 'user' }]
  })
  @TableField({ label: '用户角色', width: 100 })
  role: string

  @FormField({ formType: EFormItemType.DATE_PICKER, label: '创建时间' })
  @TableField({ label: '创建时间', width: 180 })
  createTime: string
}

// 使用示例
const user = new User()

// 获取字段标签
console.log(user.getFormFieldLabel('username')) // 输出: '用户名'
console.log(user.getTableFieldLabel('username')) // 输出: '用户名'

// 获取字段配置
const formConfig = user.getFormFieldConfigObj()
console.log(formConfig.username.formType) // 输出: 'INPUT'
console.log(formConfig.username.label) // 输出: '用户名'

const tableConfig = user.getTableFieldConfigObj()
console.log(tableConfig.username.width) // 输出: 120

// 获取字段列表
const formFields = user.getFormFieldList()
console.log(formFields) // 输出: ['username', 'password', 'role', 'createTime']

const tableFields = user.getTableFieldList()
console.log(tableFields) // 输出: ['username', 'role', 'createTime']
```

## 自定义扩展

你可以通过继承`AnyBaseModel`来创建自定义的模型类，并添加自己的方法：

```typescript
import { AnyBaseModel } from 'any-core'

class CustomModel extends AnyBaseModel {
  // 自定义方法
  toJSON() {
    // 自定义JSON序列化逻辑
    const result: Record<string, any> = {}
    const formFields = this.getFormFieldList()

    for (const field of formFields) {
      result[field] = this[field]
    }

    return result
  }

  // 验证方法
  validate(): boolean {
    // 自定义验证逻辑
    const formConfig = this.getFormFieldConfigObj()

    for (const [field, config] of Object.entries(formConfig)) {
      if (config.required && !this[field]) {
        console.error(`字段${field}是必填的`)
        return false
      }
    }

    return true
  }
}
```
