# 基础使用示例

本章节将通过一个完整的示例，展示如何在实际项目中使用AnyCore框架来定义实体类、配置字段属性，并使用这些配置来自动化生成表单和表格。

## 定义实体类

首先，让我们定义一个简单的用户实体类，并使用AnyCore提供的装饰器来配置字段属性。推荐使用枚举或as const来定义字典值类型，以获得更好的类型安全性：

```typescript
import { AnyBaseModel } from 'any-core'
import { CustomField, FormField, SearchField, TableField } from 'any-core/decorator'
import { AnyDictionaryHelper } from 'any-core/helper'
import { EDateFormatType, EFormItemType } from 'any-core/enum'

// 使用枚举定义角色类型
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

interface RolePayload {
  permissions: string[]
}

// 使用枚举创建字典数组
const roleDictArray = AnyDictionaryHelper.createDictionaryArray([
  { label: '管理员', value: UserRole.ADMIN, payload: { permissions: ['read', 'write', 'admin'] } },
  { label: '普通用户', value: UserRole.USER, payload: { permissions: ['read', 'write'] } },
  { label: '访客', value: UserRole.GUEST, payload: { permissions: ['read'] } }
])

// 使用as const创建字典数组
const enabledDictArray = AnyDictionaryHelper.createDictionaryArray([
  { label: '是', value: true },
  { label: '否', value: false }
] as const)

/**
 * 用户实体类
 */
export class User extends AnyBaseModel {
  @FormField({
    formType: EFormItemType.INPUT,
    label: '用户名',
    placeholder: '请输入用户名',
    required: true,
    rules: [{ required: true, message: '用户名不能为空' }]
  })
  @TableField({
    label: '用户名',
    width: 120,
    fixed: 'left'
  })
  @SearchField({
    formType: EFormItemType.INPUT,
    label: '用户名',
    placeholder: '请输入用户名搜索'
  })
  @CustomField('用户名')
  username: string

  @FormField({
    formType: EFormItemType.PASSWORD,
    label: '密码',
    placeholder: '请输入密码',
    required: true,
    rules: [{ required: true, message: '密码不能为空' }]
  })
  password: string

  @FormField({
    formType: EFormItemType.SELECT,
    label: '用户角色',
    placeholder: '请选择用户角色',
    required: true,
    options: roleDictArray.map(item => ({ label: item.label, value: item.value })),
    rules: [{ required: true, message: '请选择用户角色' }]
  })
  @TableField({
    label: '用户角色',
    width: 100,
    sorter: true
  })
  @SearchField({
    formType: EFormItemType.SELECT,
    label: '用户角色',
    placeholder: '请选择用户角色',
    options: roleDictArray.map(item => ({ label: item.label, value: item.value }))
  })
  @CustomField('用户角色', roleDictArray)
  role: UserRole = UserRole.USER

  @FormField({
    formType: EFormItemType.DATE_PICKER,
    label: '创建时间',
    placeholder: '请选择创建时间',
    required: false
  })
  @TableField({
    label: '创建时间',
    width: 180,
    sorter: true,
    dateFormat: EDateFormatType.YYYY_MM_DD_HH_MM_SS
  })
  @SearchField({
    formType: EFormItemType.DATE_PICKER,
    label: '创建时间',
    placeholder: '请选择创建时间',
    type: 'range'
  })
  @CustomField('创建时间')
  createTime: string

  @FormField({
    formType: EFormItemType.SWITCH,
    label: '是否启用'
  })
  @TableField({
    label: '是否启用',
    width: 80,
    customRender: (params: any) => {
      return params.value ? '是' : '否'
    }
  })
  @SearchField({
    formType: EFormItemType.SELECT,
    label: '是否启用',
    options: enabledDictArray.map(item => ({ label: item.label, value: item.value }))
  })
  @CustomField<boolean>('是否启用', enabledDictArray)
  enabled: boolean = true
}
```

## 使用实体类配置

### 获取表单配置

创建实体类实例后，你可以使用AnyCore提供的方法获取表单相关配置：

```typescript
import { User } from './User'

// 创建实体类实例
const user = new User()

// 获取表单字段列表 - 返回类型安全的字段名称数组
const formFieldList = user.getFormFieldList()
console.log(formFieldList) // 输出: ['username', 'password', 'role', 'createTime', 'enabled']

// 获取表单字段配置对象
const formConfig = user.getFormFieldConfigObj()
console.log(formConfig.username) // 输出: { formType: 'INPUT', label: '用户名', ... }

// 获取特定字段的配置
const partialConfig = user.getFormFieldConfigObj('username', 'role')
console.log(partialConfig) // 只包含username和role的配置

// 获取表单字段标签 - 使用类型安全的字段名称
const usernameLabel = user.getFormFieldLabel('username')
console.log(usernameLabel) // 输出: '用户名'

// 静态方法调用方式
const staticLabel = User.getFormFieldLabel('username')
console.log(staticLabel) // 输出: '用户名'

// 获取自定义字段的字典数组 - 带类型安全
  const roleDict = user.getFieldDictionaryArray('role')
  if (roleDict) {
    const adminRole = roleDict.getDictByValue(UserRole.ADMIN)
    console.log(adminRole?.payload?.permissions) // 输出: ['read', 'write', 'admin']
  }```

### 生成表单组件

结合表单配置，你可以使用任意UI框架来动态生成表单组件。以下是一个使用Element Plus的示例：

```vue
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { User } from './User'

const user = new User()
const formRef = ref<any>(null)
const formData = reactive<any>({ ...user })

// 计算属性获取表单配置
const formConfig = computed(() => user.getFormFieldConfigObj())
const formFieldList = computed(() => user.getFormFieldList())
const formRules = computed(() => {
  const rules: Record<string, any[]> = {}
  formFieldList.value.forEach((field) => {
    if (formConfig.value[field].rules) {
      rules[field] = formConfig.value[field].rules
    }
  })
  return rules
})

// 获取表单字段标签
function getFormFieldLabel(field: string) {
  return user.getFormFieldLabel(field)
}

// 提交表单
function submitForm() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      // 表单验证通过，提交数据
      console.log('提交数据:', formData)
    }
    else {
      console.log('表单验证失败')
      return false
    }
  })
}

// 重置表单
function resetForm() {
  formRef.value.resetFields()
}
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
    <el-form-item v-for="field in formFieldList" :key="field" :label="getFormFieldLabel(field)" :prop="field">
      <template v-if="formConfig[field].formType === 'INPUT'">
        <el-input v-model="formData[field]" :placeholder="formConfig[field].placeholder" />
      </template>
      <template v-else-if="formConfig[field].formType === 'PASSWORD'">
        <el-input v-model="formData[field]" type="password" :placeholder="formConfig[field].placeholder" />
      </template>
      <template v-else-if="formConfig[field].formType === 'SELECT'">
        <el-select v-model="formData[field]" :placeholder="formConfig[field].placeholder">
          <el-option v-for="option in formConfig[field].options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
      <template v-else-if="formConfig[field].formType === 'DATE_PICKER'">
        <el-date-picker v-model="formData[field]" type="datetime" :placeholder="formConfig[field].placeholder" />
      </template>
      <template v-else-if="formConfig[field].formType === 'SWITCH'">
        <el-switch v-model="formData[field]" />
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">
        提交
      </el-button>
      <el-button @click="resetForm">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>
```

### 获取表格配置

同样，你可以获取表格相关配置来动态生成表格：

```typescript
import { User } from './User'

// 创建实体类实例
const user = new User()

// 获取表格字段列表 - 返回类型安全的字段名称数组
const tableFieldList = user.getTableFieldList()
console.log(tableFieldList) // 输出: ['username', 'role', 'createTime', 'enabled']

// 获取表格字段配置对象
const tableConfig = user.getTableFieldConfigObj()
console.log(tableConfig.username) // 输出: { label: '用户名', width: 120, ... }

// 获取特定字段的配置
const partialTableConfig = user.getTableFieldConfigObj('username', 'createTime')

// 获取表格字段标签 - 使用类型安全的字段名称
const usernameLabel = user.getTableFieldLabel('username')
console.log(usernameLabel) // 输出: '用户名'

// 静态方法调用方式
const staticTableLabel = User.getTableFieldLabel('username')
console.log(staticTableLabel) // 输出: '用户名'
```

### 生成表格组件

结合表格配置，你可以动态生成表格组件。以下是一个使用Element Plus的示例：

```vue
<script setup lang="ts">
import { EDateFormatType } from 'any-core/enum'
import { AnyDateTimeHelper } from 'any-core/helper'
import { computed, ref } from 'vue'
import { User } from './User'

const user = new User()

// 模拟表格数据
const tableData = ref([
  {
    username: 'admin',
    role: 'admin',
    createTime: new Date().toISOString(),
    enabled: true
  },
  {
    username: 'user1',
    role: 'user',
    createTime: new Date(Date.now() - 86400000).toISOString(),
    enabled: true
  },
  {
    username: 'guest',
    role: 'guest',
    createTime: new Date(Date.now() - 172800000).toISOString(),
    enabled: false
  }
])

// 计算属性获取表格配置
const tableConfig = computed(() => user.getTableFieldConfigObj())
const tableFieldList = computed(() => user.getTableFieldList())

// 获取表格字段标签
function getTableFieldLabel(field: string) {
  return user.getTableFieldLabel(field)
}

// 格式化日期
function formatDate(date: string | Date, format: EDateFormatType) {
  // 根据format类型返回不同的日期格式
  if (format === EDateFormatType.YYYY_MM_DD_HH_MM_SS) {
    return AnyDateTimeHelper.formatDate(date, 'yyyy-MM-dd HH:mm:ss')
  }
  else if (format === EDateFormatType.YYYY_MM_DD) {
    return AnyDateTimeHelper.formatDate(date, 'yyyy-MM-dd')
  }
  return date
}

// 根据值获取字典标签
function getLabelByValue(field: string, value: any) {
  const dictArray = user.getFieldDictionaryArray(field)
  return dictArray?.getLabelByValue(value) || value
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="field in tableFieldList"
      :key="field"
      :prop="field"
      :label="getTableFieldLabel(field)"
      :width="tableConfig[field].width"
      :fixed="tableConfig[field].fixed"
      :sortable="tableConfig[field].sorter"
      :align="tableConfig[field].align || 'left'"
    >
      <template #default="scope">
        <div v-if="tableConfig[field].customRender">
          {{ tableConfig[field].customRender(scope) }}
        </div>
        <div v-else-if="tableConfig[field].dateFormat">
          {{ formatDate(scope.row[field], tableConfig[field].dateFormat) }}
        </div>
        <div v-else-if="field === 'role'">
          <!-- 使用字典辅助方法显示标签 -->
          {{ getLabelByValue('role', scope.row[field]) }}
        </div>
        <div v-else>
          {{ scope.row[field] }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
```

## 使用辅助函数

AnyCore提供了丰富的辅助函数，用于处理各种常见操作。以下是一些常用辅助函数的使用示例：

### 日期时间处理

```typescript
import { AnyDateTimeHelper } from 'any-core/helper'

// 格式化日期
const now = new Date()
const formattedDate = AnyDateTimeHelper.formatDate(now, 'yyyy-MM-dd HH:mm:ss')
console.log(formattedDate) // 输出当前日期时间，如: '2023-06-15 10:30:00'

// 解析日期字符串
const date = AnyDateTimeHelper.parseDate('2023-06-15 10:30:00')
console.log(date) // 输出Date对象
```

### 数据验证

```typescript
import { AnyValidatorHelper } from 'any-core/helper'

// 验证邮箱
const email = 'test@example.com'
const isValidEmail = AnyValidatorHelper.isEmail(email)
console.log(isValidEmail) // 输出: true

// 验证手机号
const phone = '13812345678'
const isValidPhone = AnyValidatorHelper.isPhone(phone)
console.log(isValidPhone) // 输出: true

// 根据规则验证
const value = 'test'
const rules = [
  { required: true, message: '不能为空' },
  { min: 3, message: '长度不能小于3' }
]
const validationResult = AnyValidatorHelper.validateRules(value, rules)
console.log(validationResult) // 输出: { valid: true }
```

## 总结

通过上述示例，我们展示了如何使用AnyCore框架来定义实体类、配置字段属性，并使用这些配置来自动化生成表单和表格。AnyCore的核心优势在于：

1. **声明式配置**：使用装饰器语法，简洁直观地配置字段属性
2. **增强的类型安全性**：利用TypeScript泛型和类型系统，提供更安全的API使用体验
3. **自动化渲染**：基于配置自动生成表单、表格等UI组件
4. **统一管理**：集中管理字段的各种属性，减少重复代码
5. **灵活性**：支持自定义渲染、验证规则等，可以根据需求进行扩展

希望这个示例能够帮助你快速上手AnyCore框架，并在实际项目中充分发挥其优势。
