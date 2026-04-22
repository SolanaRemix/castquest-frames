@castquest/sdk

# @castquest/sdk - v0.1.0

CastQuest SDK

Official TypeScript SDK for interacting with the CastQuest Protocol.

## Installation

```bash
pnpm add @castquest/sdk
```

## Quick Start

```typescript
import { FramesClient } from '@castquest/sdk';

const client = new FramesClient({
  chainId: 8453 // BASE
});

// Validate a frame
const isValid = client.validateFrame(myFrame);
```

## Table of contents

### Schema Classes

- [FrameValidator](/sdk/api/classes/FrameValidator.md)

### Other Classes

- [AutonomousWorkerSystem](/sdk/api/classes/AutonomousWorkerSystem.md)
- [FramesClient](/sdk/api/classes/FramesClient.md)
- [OracleDBService](/sdk/api/classes/OracleDBService.md)
- [PermissionsService](/sdk/api/classes/PermissionsService.md)
- [SmartBrainEngine](/sdk/api/classes/SmartBrainEngine.md)

### Interfaces

- [Action](/sdk/api/interfaces/Action.md)
- [ActionTarget](/sdk/api/interfaces/ActionTarget.md)
- [BrainIntegration](/sdk/api/interfaces/BrainIntegration.md)
- [BrainMetrics](/sdk/api/interfaces/BrainMetrics.md)
- [Decision](/sdk/api/interfaces/Decision.md)
- [Effect](/sdk/api/interfaces/Effect.md)
- [Frame](/sdk/api/interfaces/Frame.md)
- [FrameAuthor](/sdk/api/interfaces/FrameAuthor.md)
- [FramePermissions](/sdk/api/interfaces/FramePermissions.md)
- [FrameUI](/sdk/api/interfaces/FrameUI.md)
- [Guard](/sdk/api/interfaces/Guard.md)
- [OracleConfig](/sdk/api/interfaces/OracleConfig.md)
- [Pattern](/sdk/api/interfaces/Pattern.md)
- [Role](/sdk/api/interfaces/Role.md)
- [SyncStatus](/sdk/api/interfaces/SyncStatus.md)
- [ThoughtProcess](/sdk/api/interfaces/ThoughtProcess.md)
- [User](/sdk/api/interfaces/User.md)
- [Worker](/sdk/api/interfaces/Worker.md)
- [WorkerTask](/sdk/api/interfaces/WorkerTask.md)

### Type Aliases

- [FrameType](/sdk/api/index.md#frametype)
- [Permission](/sdk/api/index.md#permission)

### Variables

- [ROLES](/sdk/api/index.md#roles)
- [defaultBrainIntegration](/sdk/api/index.md#defaultbrainintegration)
- [defaultOracleConfig](/sdk/api/index.md#defaultoracleconfig)
- [permissionsService](/sdk/api/index.md#permissionsservice)

## Type Aliases

### FrameType

Ƭ **FrameType**: ``"mint"`` \| ``"collect"`` \| ``"game"`` \| ``"tool"`` \| ``"custom"``

#### Defined in

[types/frames.ts:1](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/types/frames.ts#L1)

___

### Permission

Ƭ **Permission**: ``"frames.read"`` \| ``"frames.write"`` \| ``"frames.delete"`` \| ``"quests.read"`` \| ``"quests.write"`` \| ``"quests.delete"`` \| ``"mints.read"`` \| ``"mints.write"`` \| ``"mints.delete"`` \| ``"workers.read"`` \| ``"workers.control"`` \| ``"brain.read"`` \| ``"brain.control"`` \| ``"dashboard.read"`` \| ``"dashboard.admin"`` \| ``"users.read"`` \| ``"users.write"`` \| ``"permissions.manage"`` \| ``"system.admin"``

Permissions Management System
Admin panel for managing user roles, access control, and permissions
Integrated with Oracle DB and Smart Brain

#### Defined in

[permissions/PermissionsService.ts:8](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L8)

## Variables

### ROLES

• `Const` **ROLES**: `Record`\<`string`, [`Role`](/sdk/api/interfaces/Role.md)\>

#### Defined in

[permissions/PermissionsService.ts:52](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L52)

___

### defaultBrainIntegration

• `Const` **defaultBrainIntegration**: [`BrainIntegration`](/sdk/api/interfaces/BrainIntegration.md)

#### Defined in

[oracle/OracleDBService.ts:432](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L432)

___

### defaultOracleConfig

• `Const` **defaultOracleConfig**: [`OracleConfig`](/sdk/api/interfaces/OracleConfig.md)

#### Defined in

[oracle/OracleDBService.ts:420](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/oracle/OracleDBService.ts#L420)

___

### permissionsService

• `Const` **permissionsService**: [`PermissionsService`](/sdk/api/classes/PermissionsService.md)

#### Defined in

[permissions/PermissionsService.ts:315](https://github.com/SolanaRemix/castquest-frames/blob/main/packages/sdk/src/permissions/PermissionsService.ts#L315)
