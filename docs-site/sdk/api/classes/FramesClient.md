[@castquest/sdk - v0.1.0](/sdk/api/index.md) / FramesClient

# Class: FramesClient

## Table of contents

### Constructors

- [constructor](/sdk/api/classes/FramesClient.md#constructor)

### Methods

- [buildTransactionRequest](/sdk/api/classes/FramesClient.md#buildtransactionrequest)
- [encodeCall](/sdk/api/classes/FramesClient.md#encodecall)
- [simulateAction](/sdk/api/classes/FramesClient.md#simulateaction)
- [validateAction](/sdk/api/classes/FramesClient.md#validateaction)
- [validateFrame](/sdk/api/classes/FramesClient.md#validateframe)

## Constructors

### constructor

• **new FramesClient**(`opts`): [`FramesClient`](/sdk/api/classes/FramesClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.chainId` | `number` |

#### Returns

[`FramesClient`](/sdk/api/classes/FramesClient.md)

#### Defined in

[client/FramesClient.ts:4](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/client/FramesClient.ts#L4)

## Methods

### buildTransactionRequest

▸ **buildTransactionRequest**(`action`, `params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](/sdk/api/interfaces/Action.md) |
| `params` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `data` | `string` |
| `to` | `undefined` \| `string` |

#### Defined in

[client/FramesClient.ts:24](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/client/FramesClient.ts#L24)

___

### encodeCall

▸ **encodeCall**(`selector`, `params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | `string` |
| `params` | `any` |

#### Returns

`string`

#### Defined in

[client/FramesClient.ts:33](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/client/FramesClient.ts#L33)

___

### simulateAction

▸ **simulateAction**(`frame`, `action`, `params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | [`Frame`](/sdk/api/interfaces/Frame.md) |
| `action` | [`Action`](/sdk/api/interfaces/Action.md) |
| `params` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `actionId` | `string` |
| `frameId` | `string` |
| `params` | `any` |
| `simulated` | `boolean` |

#### Defined in

[client/FramesClient.ts:18](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/client/FramesClient.ts#L18)

___

### validateAction

▸ **validateAction**(`action`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](/sdk/api/interfaces/Action.md) |

#### Returns

`boolean`

#### Defined in

[client/FramesClient.ts:12](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/client/FramesClient.ts#L12)

___

### validateFrame

▸ **validateFrame**(`frame`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | [`Frame`](/sdk/api/interfaces/Frame.md) |

#### Returns

`boolean`

#### Defined in

[client/FramesClient.ts:6](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/client/FramesClient.ts#L6)
