[@castquest/sdk - v0.1.0](/sdk/api/index.md) / OracleDBService

# Class: OracleDBService

## Hierarchy

- `EventEmitter`

  ↳ **`OracleDBService`**

## Table of contents

### Constructors

- [constructor](/sdk/api/classes/OracleDBService.md#constructor)

### Methods

- [executeQuery](/sdk/api/classes/OracleDBService.md#executequery)
- [getRealTimeStats](/sdk/api/classes/OracleDBService.md#getrealtimestats)
- [getSyncStatus](/sdk/api/classes/OracleDBService.md#getsyncstatus)
- [initialize](/sdk/api/classes/OracleDBService.md#initialize)
- [shutdown](/sdk/api/classes/OracleDBService.md#shutdown)

## Constructors

### constructor

• **new OracleDBService**(`config`, `brainIntegration`): [`OracleDBService`](/sdk/api/classes/OracleDBService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`OracleConfig`](/sdk/api/interfaces/OracleConfig.md) |
| `brainIntegration` | [`BrainIntegration`](/sdk/api/interfaces/BrainIntegration.md) |

#### Returns

[`OracleDBService`](/sdk/api/classes/OracleDBService.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[oracle/OracleDBService.ts:46](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L46)

## Methods

### executeQuery

▸ **executeQuery**(`query`, `params?`): `Promise`\<`any`\>

Execute custom oracle query with Smart Brain optimization

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `params?` | `any`[] |

#### Returns

`Promise`\<`any`\>

#### Defined in

[oracle/OracleDBService.ts:375](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L375)

___

### getRealTimeStats

▸ **getRealTimeStats**(): `Promise`\<\{ `brain`: \{ `events`: `number` ; `patterns`: `number` ; `suggestions`: `number`  } ; `frames`: \{ `active`: `number` ; `total`: `number`  } ; `mints`: \{ `completed`: `number` ; `pending`: `number` ; `total`: `number`  } ; `quests`: \{ `active`: `number` ; `pending`: `number` ; `total`: `number`  } ; `workers`: \{ `active`: `number` ; `idle`: `number` ; `total`: `number`  }  }\>

Get real-time stats from oracle

#### Returns

`Promise`\<\{ `brain`: \{ `events`: `number` ; `patterns`: `number` ; `suggestions`: `number`  } ; `frames`: \{ `active`: `number` ; `total`: `number`  } ; `mints`: \{ `completed`: `number` ; `pending`: `number` ; `total`: `number`  } ; `quests`: \{ `active`: `number` ; `pending`: `number` ; `total`: `number`  } ; `workers`: \{ `active`: `number` ; `idle`: `number` ; `total`: `number`  }  }\>

#### Defined in

[oracle/OracleDBService.ts:295](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L295)

___

### getSyncStatus

▸ **getSyncStatus**(): `Map`\<`string`, [`SyncStatus`](/sdk/api/interfaces/SyncStatus.md)\>

Get sync status for all tables

#### Returns

`Map`\<`string`, [`SyncStatus`](/sdk/api/interfaces/SyncStatus.md)\>

#### Defined in

[oracle/OracleDBService.ts:288](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L288)

___

### initialize

▸ **initialize**(): `Promise`\<`void`\>

Initialize database connection pool

#### Returns

`Promise`\<`void`\>

#### Defined in

[oracle/OracleDBService.ts:56](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L56)

___

### shutdown

▸ **shutdown**(): `Promise`\<`void`\>

Shutdown database service

#### Returns

`Promise`\<`void`\>

#### Defined in

[oracle/OracleDBService.ts:410](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L410)
