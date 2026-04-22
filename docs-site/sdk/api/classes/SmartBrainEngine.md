[@castquest/sdk - v0.1.0](/sdk/api/index.md) / SmartBrainEngine

# Class: SmartBrainEngine

## Hierarchy

- `EventEmitter`

  ↳ **`SmartBrainEngine`**

## Table of contents

### Constructors

- [constructor](/sdk/api/classes/SmartBrainEngine.md#constructor)

### Methods

- [deepThink](/sdk/api/classes/SmartBrainEngine.md#deepthink)
- [getDecisions](/sdk/api/classes/SmartBrainEngine.md#getdecisions)
- [getMetrics](/sdk/api/classes/SmartBrainEngine.md#getmetrics)
- [getPatterns](/sdk/api/classes/SmartBrainEngine.md#getpatterns)
- [getThoughts](/sdk/api/classes/SmartBrainEngine.md#getthoughts)
- [learn](/sdk/api/classes/SmartBrainEngine.md#learn)
- [makeDecision](/sdk/api/classes/SmartBrainEngine.md#makedecision)

## Constructors

### constructor

• **new SmartBrainEngine**(`oracleDB`, `parallelWorkers?`): [`SmartBrainEngine`](/sdk/api/classes/SmartBrainEngine.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `oracleDB` | [`OracleDBService`](/sdk/api/classes/OracleDBService.md) | `undefined` |
| `parallelWorkers` | `number` | `4` |

#### Returns

[`SmartBrainEngine`](/sdk/api/classes/SmartBrainEngine.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[brain/SmartBrainEngine.ts:62](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L62)

## Methods

### deepThink

▸ **deepThink**(`context`, `data`): `Promise`\<[`ThoughtProcess`](/sdk/api/interfaces/ThoughtProcess.md)\>

Deep think analysis with parallel processing

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<[`ThoughtProcess`](/sdk/api/interfaces/ThoughtProcess.md)\>

#### Defined in

[brain/SmartBrainEngine.ts:83](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L83)

___

### getDecisions

▸ **getDecisions**(): [`Decision`](/sdk/api/interfaces/Decision.md)[]

Get all decisions

#### Returns

[`Decision`](/sdk/api/interfaces/Decision.md)[]

#### Defined in

[brain/SmartBrainEngine.ts:415](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L415)

___

### getMetrics

▸ **getMetrics**(): [`BrainMetrics`](/sdk/api/interfaces/BrainMetrics.md)

Get brain metrics

#### Returns

[`BrainMetrics`](/sdk/api/interfaces/BrainMetrics.md)

#### Defined in

[brain/SmartBrainEngine.ts:401](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L401)

___

### getPatterns

▸ **getPatterns**(): [`Pattern`](/sdk/api/interfaces/Pattern.md)[]

Get all patterns

#### Returns

[`Pattern`](/sdk/api/interfaces/Pattern.md)[]

#### Defined in

[brain/SmartBrainEngine.ts:408](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L408)

___

### getThoughts

▸ **getThoughts**(`limit?`): [`ThoughtProcess`](/sdk/api/interfaces/ThoughtProcess.md)[]

Get thought history

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `limit` | `number` | `100` |

#### Returns

[`ThoughtProcess`](/sdk/api/interfaces/ThoughtProcess.md)[]

#### Defined in

[brain/SmartBrainEngine.ts:422](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L422)

___

### learn

▸ **learn**(`feedback`): `Promise`\<`void`\>

Learn from feedback

#### Parameters

| Name | Type |
| :------ | :------ |
| `feedback` | `Object` |
| `feedback.accurate` | `boolean` |
| `feedback.corrections?` | `any` |
| `feedback.thoughtId` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[brain/SmartBrainEngine.ts:429](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L429)

___

### makeDecision

▸ **makeDecision**(`context`, `options`): `Promise`\<[`Decision`](/sdk/api/interfaces/Decision.md)\>

Make autonomous decision

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `string` |
| `options` | `any`[] |

#### Returns

`Promise`\<[`Decision`](/sdk/api/interfaces/Decision.md)\>

#### Defined in

[brain/SmartBrainEngine.ts:291](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/brain/SmartBrainEngine.ts#L291)
