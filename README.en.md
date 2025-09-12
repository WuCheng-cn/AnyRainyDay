# any-core

any-core is a decorator-based rapid development framework core package. It enables automated integration with components by marking and configuring properties of entity classes using decorators. It is suitable for quickly building common UI components such as forms, tables, and search interfaces, and provides enhanced type safety features.

## Key Features

- **Decorator Support**: Provides various decorators for marking property configurations with TypeScript generics support, including:
  - `@CustomField<T, P>`: Custom field marker with generic type safety.
  - `@FormField`: Used for form field configurations (supports types such as input and checkbox).
  - `@SearchField`: Used for search field configurations.
  - `@TableField`: Used for table field configurations.

- **Data Model Support**: Offers base model classes (e.g., `AnyBaseModel`) and generic dictionary model classes (e.g., `AnyDictionaryArrayModel<T, P>`) to facilitate the construction of structured data.

- **Utility Classes**: Includes practical tools for date handling, file operations, data conversion, validators, and more.

- **Enhanced Type Safety**: Provides compile-time type checking and auto-completion through type tools such as ClassFieldNames and ClassMethodNames.

- **Type Tool System**: Offers powerful type tools to ensure type safety when using the API.

## Installation

Install using pnpm:

```bash
pnpm install any-core
```

## Usage Examples

### Using `@CustomField` to Build Type-Safe Dictionary Fields

```ts
import { AnyBaseModel } from 'any-core'
import { CustomField } from 'any-core/decorator'
import { AnyDictionaryHelper } from 'any-core/helper'

// Define value type using enum
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

interface RolePayload {
  permissions: string[]
}

// Create dictionary array using enum
const roleDictArray = AnyDictionaryHelper.createDictionaryArray([
  { label: 'Admin', value: UserRole.ADMIN, payload: { permissions: ['read', 'write', 'admin'] } },
  { label: 'User', value: UserRole.USER, payload: { permissions: ['read', 'write'] } }
])

// Create dictionary array using as const
const enabledDictArray = AnyDictionaryHelper.createDictionaryArray([
  { label: 'Yes', value: true },
  { label: 'No', value: false }
] as const)

class User extends AnyBaseModel {
  @CustomField('User Role', roleDictArray)
  role: UserRole = UserRole.USER

  @CustomField<boolean>('Enabled', enabledDictArray)
  enabled: boolean = true
}

// Use type-safe methods to get dictionary configuration
const user = new User()
// Type-safely get custom field dictionary array
const roleDict = user.getFieldDictionaryArray('role')
if (roleDict) {
  // Type-safely get dictionary item
  const adminRole = roleDict.getDictByValue(UserRole.ADMIN)
  // Access payload property correctly, TypeScript will perform type checking
  console.log(adminRole?.payload?.permissions) // Output: ['read', 'write', 'admin']
}
```

### Using `@FormField` to Build Form Fields

```ts
import { AnyBaseModel } from 'any-core'
import { FormField } from 'any-core/decorator'
import { EFormItemType } from 'any-core/enum'

class Product extends AnyBaseModel {
  @FormField({
    formType: EFormItemType.INPUT,
    label: 'Product Name',
    required: true,
    placeholder: 'Please enter product name'
  })
  name: string

  @FormField({
    formType: EFormItemType.NUMBER,
    label: 'Product Price',
    required: true,
    placeholder: 'Please enter product price',
    rules: [{ required: true, message: 'Please enter product price' }]
  })
  price: number
}

// Use type-safe methods to get form configuration
const product = new Product()
// getFormFieldList returns a type-safe array of field names
const formFields = product.getFormFieldList()
// getFormFieldConfigObj can accept type-safe field name parameters
const formConfig = product.getFormFieldConfigObj('name', 'price')
```

### Using `@TableField` to Build Table Fields

```ts
import { AnyBaseModel } from 'any-core'
import { TableField } from 'any-core/decorator'
import { EDateFormatType } from 'any-core/enum'

class Order extends AnyBaseModel {
  @TableField({ label: 'Order Number', width: 150, fixed: 'left' })
  orderNo: string

  @TableField({ label: 'Order Amount', width: 100, sorter: true })
  amount: number

  @TableField({
    label: 'Create Time',
    width: 180,
    sorter: true,
    dateFormat: EDateFormatType.YYYY_MM_DD_HH_MM_SS
  })
  createTime: string
}

// Use type-safe methods to get table configuration
const order = new Order()
// Get table field list
const tableFields = order.getTableFieldList()
// Type-safely get field label
const orderNoLabel = order.getTableFieldLabel('orderNo')
```

## Documentation

Please refer to the [Project Documentation](https://wucheng-cn.github.io/AnyCore/) for detailed information.

## Contributions

Pull Requests and Issues are welcome. Please follow the project's coding conventions and provide clear commit messages.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
