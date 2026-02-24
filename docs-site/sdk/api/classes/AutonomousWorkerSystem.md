[@castquest/sdk - v0.1.0](/sdk/api/index.md) / AutonomousWorkerSystem

# Class: AutonomousWorkerSystem

## Hierarchy

- `EventEmitter`

  ↳ **`AutonomousWorkerSystem`**

## Table of contents

### Constructors

- [constructor](/sdk/api/classes/AutonomousWorkerSystem.md#constructor)

### Methods

- [getStatus](/sdk/api/classes/AutonomousWorkerSystem.md#getstatus)
- [pause](/sdk/api/classes/AutonomousWorkerSystem.md#pause)
- [resume](/sdk/api/classes/AutonomousWorkerSystem.md#resume)
- [submitTask](/sdk/api/classes/AutonomousWorkerSystem.md#submittask)

## Constructors

### constructor

• **new AutonomousWorkerSystem**(`brain`, `maxParallelWorkers?`): [`AutonomousWorkerSystem`](/sdk/api/classes/AutonomousWorkerSystem.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `brain` | [`SmartBrainEngine`](/sdk/api/classes/SmartBrainEngine.md) | `undefined` |
| `maxParallelWorkers` | `number` | `5` |

#### Returns

[`AutonomousWorkerSystem`](/sdk/api/classes/AutonomousWorkerSystem.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[workers/AutonomousWorkerSystem.ts:41](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/workers/AutonomousWorkerSystem.ts#L41)

## Methods

### getStatus

▸ **getStatus**(): `Object`

Get system status

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `activeTasks` | [`WorkerTask`](/sdk/api/interfaces/WorkerTask.md)[] |
| `queueLength` | `number` |
| `totalCompleted` | `number` |
| `totalFailed` | `number` |
| `workers` | [`Worker`](/sdk/api/interfaces/Worker.md)[] |

#### Defined in

[workers/AutonomousWorkerSystem.ts:293](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/workers/AutonomousWorkerSystem.ts#L293)

___

### pause

▸ **pause**(): `void`

Pause scheduling

#### Returns

`void`

#### Defined in

[workers/AutonomousWorkerSystem.ts:312](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/workers/AutonomousWorkerSystem.ts#L312)

___

### resume

▸ **resume**(): `void`

Resume scheduling

#### Returns

`void`

#### Defined in

[workers/AutonomousWorkerSystem.ts:320](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/workers/AutonomousWorkerSystem.ts#L320)

___

### submitTask

▸ **submitTask**(`type`, `data`, `priority?`): `Promise`\<`string`\>

Submit task to queue with Brain-powered prioritization

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `data` | `any` |
| `priority?` | `number` |

#### Returns

`Promise`\<`string`\>

#### Defined in

[workers/AutonomousWorkerSystem.ts:74](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/workers/AutonomousWorkerSystem.ts#L74)
