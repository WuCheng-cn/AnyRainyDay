# 辅助函数API

AnyCore框架提供了一系列辅助函数，用于处理装饰器、数据转换、日期时间、字典等常见操作。本章节将详细介绍各个辅助函数的使用方法和参数说明。

## AnyDecoratorHelper

`AnyDecoratorHelper`是装饰器助手类，主要用于处理类装饰器、属性装饰器、方法装饰器等。

### 主要方法

#### setProperty

```typescript
private static setProperty(target: any, key: string, value: any)
```

**说明**：反射添加属性到目标对象。

**参数**：
- `target`：目标对象
- `key`：属性键名
- `value`：属性值

#### setClassConfig

```typescript
static setClassConfig(target: any, classConfigKey: string, classConfig: any)
```

**说明**：设置一个类配置项。

**参数**：
- `target`：目标实体类
- `classConfigKey`：配置项索引键值
- `classConfig`：配置的参数

**示例**：

```typescript
AnyDecoratorHelper.setClassConfig(User, 'customConfig', { name: '用户信息' })
```

#### getClassConfig

```typescript
static getClassConfig(target: any, classConfigKey: string, defaultValue: any = undefined, isObject = false): any
```

**说明**：递归获取指定类的配置项。

**参数**：
- `target`：目标类
- `classConfigKey`：配置项的Key
- `defaultValue`：可选，类装饰器请传入配置项实例
- `isObject`：可选，是否是对象配置

**返回值**：配置项的值

**示例**：

```typescript
const config = AnyDecoratorHelper.getClassConfig(User.prototype, 'customConfig')
console.log(config.name) // 输出: '用户信息'
```

#### setFieldConfig

```typescript
static setFieldConfig(target: any, keyOrContext: string | ClassFieldDecoratorContext, fieldConfigKey: string, fieldConfig: any)
```

**说明**：设置字段配置。

**参数**：
- `target`：目标类或实例
- `keyOrContext`：字段名或装饰器上下文
- `fieldConfigKey`：字段配置的Key
- `fieldConfig`：字段配置

#### getFieldList

```typescript
static getFieldList(target: any, fieldConfigKey: string): string[]
```

**说明**：获取配置了指定装饰器的字段列表。

**参数**：
- `target`：目标类或实例
- `fieldConfigKey`：字段配置的Key

**返回值**：字段名数组

**示例**：

```typescript
const fields = AnyDecoratorHelper.getFieldList(User, 'formField')
console.log(fields) // 输出: ['username', 'age', ...]
```

#### getFieldConfigObject

```typescript
static getFieldConfigObject<T>(target: any, fieldConfigKey: string, fieldList: string[] = []): Record<string, T>
```

**说明**：获取字段配置对象。

**参数**：
- `target`：目标类或实例
- `fieldConfigKey`：字段配置的Key
- `fieldList`：可选，字段列表，不传时获取所有配置的字段

**返回值**：字段配置对象，键为字段名，值为配置

## AnyDataTransformHelper

`AnyDataTransformHelper`是数据转换助手类，用于数据格式转换。

### 主要方法

#### transformEnumToOptions

```typescript
static transformEnumToOptions(enumObj: any): Array<{ label: string, value: any }>
```

**说明**：将枚举对象转换为选项数组。

**参数**：
- `enumObj`：枚举对象

**返回值**：选项数组，每个选项包含label和value属性

#### transformArrayToMap

```typescript
static transformArrayToMap<T extends { id: string | number }>(array: T[], keyField: string = 'id'): Map<string | number, T>
```

**说明**：将数组转换为Map对象。

**参数**：
- `array`：源数组
- `keyField`：可选，用作Map键的字段名，默认为'id'

**返回值**：Map对象，键为指定字段的值，值为数组元素

## AnyDateTimeHelper

`AnyDateTimeHelper`是日期时间助手类，用于日期时间的格式化和处理。

### 主要方法

#### formatDate

```typescript
static formatDate(date: Date | string | number, format: string = 'yyyy-MM-dd HH:mm:ss'): string
```

**说明**：格式化日期时间。

**参数**：
- `date`：日期对象、日期字符串或时间戳
- `format`：可选，日期格式字符串，默认为'yyyy-MM-dd HH:mm:ss'

**返回值**：格式化后的日期字符串

**示例**：

```typescript
const formatted = AnyDateTimeHelper.formatDate(new Date(), 'yyyy-MM-dd')
console.log(formatted) // 输出: '2023-06-15'
```

#### parseDate

```typescript
static parseDate(dateString: string, format: string = 'yyyy-MM-dd HH:mm:ss'): Date
```

**说明**：解析日期字符串为Date对象。

**参数**：
- `dateString`：日期字符串
- `format`：可选，日期格式字符串，默认为'yyyy-MM-dd HH:mm:ss'

**返回值**：Date对象

## AnyDictionaryHelper

`AnyDictionaryHelper`是字典助手类，用于字典数据的处理。

### 主要方法

#### createDictionaryArray

```typescript
static createDictionaryArray(dictionaries: IDictionary[]): AnyDictionaryArrayModel<AnyDictionaryModel>
```

**说明**：创建字典数组模型。

**参数**：
- `dictionaries`：字典数据数组

**返回值**：字典数组模型

#### getDictionaryLabel

```typescript
static getDictionaryLabel(dictionaryArray: AnyDictionaryArrayModel<AnyDictionaryModel>, value: any): string
```

**说明**：根据值获取字典标签。

**参数**：
- `dictionaryArray`：字典数组模型
- `value`：字典值

**返回值**：对应的字典标签

## AnyFileHelper

`AnyFileHelper`是文件助手类，用于文件相关操作。

### 主要方法

#### downloadFile

```typescript
static downloadFile(fileUrl: string, fileName?: string): void
```

**说明**：下载文件。

**参数**：
- `fileUrl`：文件URL
- `fileName`：可选，文件名

#### blobToDataURL

```typescript
static blobToDataURL(blob: Blob): Promise<string>
```

**说明**：将Blob对象转换为DataURL。

**参数**：
- `blob`：Blob对象

**返回值**：Promise，解析为DataURL字符串

## AnyValidatorHelper

`AnyValidatorHelper`是验证助手类，用于数据验证。

### 主要方法

#### isEmail

```typescript
static isEmail(email: string): boolean
```

**说明**：验证邮箱格式是否正确。

**参数**：
- `email`：邮箱字符串

**返回值**：布尔值，表示邮箱格式是否正确

#### isPhone

```typescript
static isPhone(phone: string): boolean
```

**说明**：验证手机号格式是否正确（中国手机号）。

**参数**：
- `phone`：手机号字符串

**返回值**：布尔值，表示手机号格式是否正确

#### validateRules

```typescript
static validateRules(value: any, rules: any[]): { valid: boolean, message?: string }
```

**说明**：根据规则验证值是否有效。

**参数**：
- `value`：要验证的值
- `rules`：验证规则数组

**返回值**：包含验证结果和错误信息的对象
