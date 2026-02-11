[@castquest/sdk - v0.1.0](/sdk/api/index.md) / FrameValidator

# Class: FrameValidator

Schema validator for CastQuest frames and actions.

## Table of contents

### Constructors

- [constructor](/sdk/api/classes/FrameValidator.md#constructor)

### Methods

- [validateAction](/sdk/api/classes/FrameValidator.md#validateaction)
- [validateFrame](/sdk/api/classes/FrameValidator.md#validateframe)

## Constructors

### constructor

• **new FrameValidator**(): [`FrameValidator`](/sdk/api/classes/FrameValidator.md)

#### Returns

[`FrameValidator`](/sdk/api/classes/FrameValidator.md)

## Methods

### validateAction

▸ **validateAction**(`action`): `boolean`

Validates an action schema.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`Action`](/sdk/api/interfaces/Action.md) | The action to validate |

#### Returns

`boolean`

True if valid, throws error otherwise

**`Throws`**

If action is invalid

#### Defined in

[schema/validator.ts:49](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/schema/validator.ts#L49)

___

### validateFrame

▸ **validateFrame**(`frame`): `boolean`

Validates a frame schema against CastQuest specifications.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frame` | [`Frame`](/sdk/api/interfaces/Frame.md) | The frame to validate |

#### Returns

`boolean`

True if valid, throws error otherwise

**`Throws`**

If frame is invalid

**`Example`**

```typescript
const validator = new FrameValidator();
const isValid = validator.validateFrame(myFrame);
```

#### Defined in

[schema/validator.ts:22](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/schema/validator.ts#L22)
