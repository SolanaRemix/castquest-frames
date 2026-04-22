[@castquest/sdk - v0.1.0](/sdk/api/index.md) / Action

# Interface: Action

## Table of contents

### Properties

- [effects](/sdk/api/interfaces/Action.md#effects)
- [guards](/sdk/api/interfaces/Action.md#guards)
- [id](/sdk/api/interfaces/Action.md#id)
- [kind](/sdk/api/interfaces/Action.md#kind)
- [label](/sdk/api/interfaces/Action.md#label)
- [params](/sdk/api/interfaces/Action.md#params)
- [requiresSignature](/sdk/api/interfaces/Action.md#requiressignature)
- [target](/sdk/api/interfaces/Action.md#target)

## Properties

### effects

• **effects**: [`Effect`](/sdk/api/interfaces/Effect.md)[]

#### Defined in

[types/frames.ts:45](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L45)

___

### guards

• **guards**: [`Guard`](/sdk/api/interfaces/Guard.md)[]

#### Defined in

[types/frames.ts:44](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L44)

___

### id

• **id**: `string`

#### Defined in

[types/frames.ts:38](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L38)

___

### kind

• **kind**: ``"transaction"`` \| ``"mutation"`` \| ``"navigation"`` \| ``"webhook"``

#### Defined in

[types/frames.ts:40](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L40)

___

### label

• **label**: `string`

#### Defined in

[types/frames.ts:39](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L39)

___

### params

• **params**: `any`

#### Defined in

[types/frames.ts:42](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L42)

___

### requiresSignature

• **requiresSignature**: `boolean`

#### Defined in

[types/frames.ts:43](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L43)

___

### target

• **target**: [`ActionTarget`](/sdk/api/interfaces/ActionTarget.md)

#### Defined in

[types/frames.ts:41](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L41)
