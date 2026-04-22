[@castquest/sdk - v0.1.0](/sdk/api/index.md) / PermissionsService

# Class: PermissionsService

## Table of contents

### Constructors

- [constructor](/sdk/api/classes/PermissionsService.md#constructor)

### Methods

- [addPermissionToUser](/sdk/api/classes/PermissionsService.md#addpermissiontouser)
- [addRoleToUser](/sdk/api/classes/PermissionsService.md#addroletouser)
- [createRole](/sdk/api/classes/PermissionsService.md#createrole)
- [createUser](/sdk/api/classes/PermissionsService.md#createuser)
- [deleteRole](/sdk/api/classes/PermissionsService.md#deleterole)
- [getRole](/sdk/api/classes/PermissionsService.md#getrole)
- [getRoles](/sdk/api/classes/PermissionsService.md#getroles)
- [getUser](/sdk/api/classes/PermissionsService.md#getuser)
- [getUserPermissions](/sdk/api/classes/PermissionsService.md#getuserpermissions)
- [getUsers](/sdk/api/classes/PermissionsService.md#getusers)
- [hasAllPermissions](/sdk/api/classes/PermissionsService.md#hasallpermissions)
- [hasAnyPermission](/sdk/api/classes/PermissionsService.md#hasanypermission)
- [hasPermission](/sdk/api/classes/PermissionsService.md#haspermission)
- [removePermissionFromUser](/sdk/api/classes/PermissionsService.md#removepermissionfromuser)
- [removeRoleFromUser](/sdk/api/classes/PermissionsService.md#removerolefromuser)
- [updateRole](/sdk/api/classes/PermissionsService.md#updaterole)

## Constructors

### constructor

• **new PermissionsService**(): [`PermissionsService`](/sdk/api/classes/PermissionsService.md)

#### Returns

[`PermissionsService`](/sdk/api/classes/PermissionsService.md)

#### Defined in

[permissions/PermissionsService.ts:123](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L123)

## Methods

### addPermissionToUser

▸ **addPermissionToUser**(`userId`, `permission`): `void`

Add custom permission to user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `permission` | [`Permission`](/sdk/api/index.md#permission) |

#### Returns

`void`

#### Defined in

[permissions/PermissionsService.ts:210](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L210)

___

### addRoleToUser

▸ **addRoleToUser**(`userId`, `roleId`): `void`

Add role to user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `roleId` | `string` |

#### Returns

`void`

#### Defined in

[permissions/PermissionsService.ts:190](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L190)

___

### createRole

▸ **createRole**(`roleData`): [`Role`](/sdk/api/interfaces/Role.md)

Create custom role

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleData` | `Omit`\<[`Role`](/sdk/api/interfaces/Role.md), ``"id"`` \| ``"createdAt"`` \| ``"updatedAt"``\> |

#### Returns

[`Role`](/sdk/api/interfaces/Role.md)

#### Defined in

[permissions/PermissionsService.ts:260](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L260)

___

### createUser

▸ **createUser**(`userData`): [`User`](/sdk/api/interfaces/User.md)

Create new user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userData` | `Omit`\<[`User`](/sdk/api/interfaces/User.md), ``"id"`` \| ``"createdAt"``\> |

#### Returns

[`User`](/sdk/api/interfaces/User.md)

#### Defined in

[permissions/PermissionsService.ts:232](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L232)

___

### deleteRole

▸ **deleteRole**(`roleId`): `boolean`

Delete role

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |

#### Returns

`boolean`

#### Defined in

[permissions/PermissionsService.ts:304](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L304)

___

### getRole

▸ **getRole**(`roleId`): `undefined` \| [`Role`](/sdk/api/interfaces/Role.md)

Get role by ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |

#### Returns

`undefined` \| [`Role`](/sdk/api/interfaces/Role.md)

#### Defined in

[permissions/PermissionsService.ts:282](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L282)

___

### getRoles

▸ **getRoles**(): [`Role`](/sdk/api/interfaces/Role.md)[]

Get all roles

#### Returns

[`Role`](/sdk/api/interfaces/Role.md)[]

#### Defined in

[permissions/PermissionsService.ts:275](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L275)

___

### getUser

▸ **getUser**(`userId`): `undefined` \| [`User`](/sdk/api/interfaces/User.md)

Get user by ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`undefined` \| [`User`](/sdk/api/interfaces/User.md)

#### Defined in

[permissions/PermissionsService.ts:253](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L253)

___

### getUserPermissions

▸ **getUserPermissions**(`userId`): [`Permission`](/sdk/api/index.md#permission)[]

Get user permissions

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

[`Permission`](/sdk/api/index.md#permission)[]

#### Defined in

[permissions/PermissionsService.ts:171](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L171)

___

### getUsers

▸ **getUsers**(): [`User`](/sdk/api/interfaces/User.md)[]

Get all users

#### Returns

[`User`](/sdk/api/interfaces/User.md)[]

#### Defined in

[permissions/PermissionsService.ts:246](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L246)

___

### hasAllPermissions

▸ **hasAllPermissions**(`userId`, `permissions`): `boolean`

Check if user has all permissions

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `permissions` | [`Permission`](/sdk/api/index.md#permission)[] |

#### Returns

`boolean`

#### Defined in

[permissions/PermissionsService.ts:164](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L164)

___

### hasAnyPermission

▸ **hasAnyPermission**(`userId`, `permissions`): `boolean`

Check if user has any of the permissions

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `permissions` | [`Permission`](/sdk/api/index.md#permission)[] |

#### Returns

`boolean`

#### Defined in

[permissions/PermissionsService.ts:157](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L157)

___

### hasPermission

▸ **hasPermission**(`userId`, `permission`): `boolean`

Check if user has permission

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `permission` | [`Permission`](/sdk/api/index.md#permission) |

#### Returns

`boolean`

#### Defined in

[permissions/PermissionsService.ts:136](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L136)

___

### removePermissionFromUser

▸ **removePermissionFromUser**(`userId`, `permission`): `void`

Remove custom permission from user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `permission` | [`Permission`](/sdk/api/index.md#permission) |

#### Returns

`void`

#### Defined in

[permissions/PermissionsService.ts:220](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L220)

___

### removeRoleFromUser

▸ **removeRoleFromUser**(`userId`, `roleId`): `void`

Remove role from user

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |
| `roleId` | `string` |

#### Returns

`void`

#### Defined in

[permissions/PermissionsService.ts:200](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L200)

___

### updateRole

▸ **updateRole**(`roleId`, `updates`): `undefined` \| [`Role`](/sdk/api/interfaces/Role.md)

Update role

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleId` | `string` |
| `updates` | `Partial`\<`Omit`\<[`Role`](/sdk/api/interfaces/Role.md), ``"id"`` \| ``"createdAt"``\>\> |

#### Returns

`undefined` \| [`Role`](/sdk/api/interfaces/Role.md)

#### Defined in

[permissions/PermissionsService.ts:289](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L289)
