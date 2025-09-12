# API 文档

AnyCore提供了丰富的API，用于快速构建基于装饰器的应用程序。本章节将详细介绍各个模块的API接口。

## 模块概览

AnyCore主要包含以下模块：

- [装饰器模块](#装饰器模块)
- [辅助函数模块](#辅助函数模块)
- [模型模块](#模型模块)
- [接口和枚举](#接口和枚举)

## 装饰器模块

装饰器模块提供了一系列装饰器，用于标记和配置类和字段。

### CustomClass

用于配置类的自定义信息。

**签名：**
```typescript
function CustomClass(config?: { name?: string }): ClassDecorator
```

**参数：**
- `config`：类配置对象，包含：
  - `name`：类的自定义名称

**相关函数：**
```typescript
function getCustomClassConfig(target: any): { name?: string }
```

### CustomField

用于配置字段的自定义名称和字典数组，支持泛型类型安全。

**签名：**
```typescript
function CustomField<T = any, P = any>(name: string, dictionaryArray?: AnyDictionaryArrayModel<AnyDictionaryModel<T, P>> | (() => Promise<IDictionary<T, P>[]>)): PropertyDecorator
```

**参数：**
- `name`：字段的自定义名称
- `dictionaryArray`：字典数组或获取字典数组的函数

**泛型参数：**
- `T`：字典值(value)的类型
- `P`：字典附加信息(payload)的类型

**相关函数：**
```typescript
function getCustomFieldName(target: any, field: string): string | undefined
function getCustomFieldDictionaryArray<T = any, P = any>(target: any, field: string): AnyDictionaryArrayModel<AnyDictionaryModel<T, P>> | undefined
```

### FormField

用于配置字段的表单相关属性。

**签名：**
```typescript
function FormField(config?: IFormFieldConfig): PropertyDecorator
```

**参数：**
- `config`：表单字段配置对象，具体配置项请参考[IFormFieldConfig](#iformfieldconfig)

**相关函数：**
```typescript
function getFormFieldList(target: any): string[]
function getFormFieldConfigObj(target: any, fieldList?: string[]): Record<string, IFormFieldConfig>
```

### TableField

用于配置字段的表格相关属性。

**签名：**
```typescript
function TableField(config?: ITableFieldConfig): PropertyDecorator
```

**参数：**
- `config`：表格字段配置对象，具体配置项请参考[ITableFieldConfig](#itablefieldconfig)

**相关函数：**
```typescript
function getTableFieldList(target: any): string[]
function getTableFieldConfigObj(target: any, fieldList?: string[]): Record<string, ITableFieldConfig>
```

### SearchField

用于配置字段的搜索相关属性。

## 辅助函数模块

辅助函数模块提供了各种工具函数，用于数据处理和转换。

### AnyDecoratorHelper

装饰器助手类，用于处理类装饰器、属性装饰器等。

**主要方法：**
- `setClassConfig(target: any, classConfigKey: string, classConfig: any)`：设置类配置项
- `getClassConfig(target: any, classConfigKey: string, defaultValue?: any, isObject?: boolean)`：获取类配置项
- `setFieldConfig(target: any, keyOrContext: string | ClassFieldDecoratorContext, fieldConfigKey: string, fieldConfig: any)`：设置字段配置
- `getFieldList(target: any, fieldConfigKey: string)`：获取配置了指定装饰器的字段列表
- `getFieldConfigObject<T>(target: any, fieldConfigKey: string, fieldList?: string[])`：获取字段配置对象

### AnyDataTransformHelper

数据转换助手类，用于数据格式转换。

### AnyDateTimeHelper

日期时间助手类，用于日期时间的格式化和处理。

### AnyDictionaryHelper

字典助手类，用于字典数据的处理。

### AnyFileHelper

文件助手类，用于文件相关操作。

### AnyValidatorHelper

验证助手类，用于数据验证。

## 模型模块

模型模块提供了基础模型类，包含通用操作方法。

### AnyBaseModel

基础模型类，所有实体类的基类，提供增强的类型安全支持。

**主要方法：**
- `getFormFieldLabel(field: ClassFieldNames<this>)`：获取表单字段的标签，使用类型安全的字段名称
- `getTableFieldLabel(field: ClassFieldNames<this>)`：获取表格字段的标签，使用类型安全的字段名称
- `getSearchFieldLabel(field: ClassFieldNames<this>)`：获取搜索字段的标签，使用类型安全的字段名称
- `getFormFieldConfigObj(...fieldList: ClassFieldNames<this>[])`：获取表单字段配置对象，支持rest参数语法
- `getTableFieldConfigObj(...fieldList: ClassFieldNames<this>[])`：获取表格字段配置对象，支持rest参数语法
- `getSearchFieldConfigObj(...fieldList: ClassFieldNames<this>[])`：获取搜索字段配置对象，支持rest参数语法
- `getFormFieldList()`：获取表单字段列表，返回类型安全的字段名称数组
- `getTableFieldList()`：获取表格字段列表，返回类型安全的字段名称数组
- `getSearchFieldList()`：获取搜索字段列表，返回类型安全的字段名称数组

## 接口和枚举

### 主要接口

#### IFormFieldConfig

表单字段配置接口。

**属性：**
- `formType`：表单控件类型
- `label`：字段标签
- `placeholder`：占位符
- `rules`：验证规则
- `disabled`：是否禁用
- `required`：是否必填
- `options`：选项数据

#### ITableFieldConfig

表格字段配置接口。

**属性：**
- `label`：字段标签
- `width`：列宽
- `ellipsis`：是否省略显示
- `sorter`：是否可排序
- `fixed`：固定方式
- `align`：对齐方式
- `customRender`：自定义渲染函数
- `dateFormat`：日期格式
- `isAlways`：是否常驻在表格中

### 主要枚举

#### EFormItemType

表单控件类型枚举。

**值：**
- `INPUT`：输入框
- `SELECT`：选择器
- `DATE_PICKER`：日期选择器
- `CHECKBOX`：复选框
- `RADIO`：单选框
- `SWITCH`：开关
- `TEXTAREA`：文本域

#### EDateFormatType

日期格式枚举。

## 类型定义

AnyCore提供了丰富的类型定义，用于TypeScript项目的类型检查。

### 主要类型

#### ClassConstructor\<T\>

类构造函数类型，用于表示类的构造函数。

```typescript
type ClassConstructor<T> = T extends {
  new(...args: any[]): any
} ? T : never
```

#### ClassFieldNames\<T\>

获取类型T中的字段名称（排除方法），用于增强类型安全性。

```typescript
type ClassFieldNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K
}[keyof T]
```

#### ClassMethodNames\<T\>

获取类型T中的方法名称（排除字段）。

```typescript
type ClassMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]
```

更多类型定义请参考源码中的types目录。
