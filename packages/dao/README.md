# @castquest/dao

On-chain governance and proposal management for the CastQuest Protocol.

## Overview

This package provides the `CastQuestDAO` class for interacting with CastQuest DAO smart contracts on Base and other EVM chains. It uses [viem](https://viem.sh) for blockchain interactions.

## Installation

```bash
pnpm add @castquest/dao
```

## Usage

```typescript
import { CastQuestDAO } from '@castquest/dao';
import { createWalletClient, createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

// Create clients
const walletClient = createWalletClient({
  chain: base,
  transport: http(),
});

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

// Initialize DAO
const dao = new CastQuestDAO(
  '0x...', // DAO contract address
  walletClient,
  publicClient
);

// Create a proposal
const { proposalId } = await dao.createProposal(
  'Upgrade Protocol',
  'Proposal to upgrade the protocol to v2',
  [
    {
      target: '0x...',
      value: 0n,
      data: '0x...',
    },
  ]
);

// Vote on a proposal
await dao.vote(proposalId, true);

// Execute a proposal
await dao.executeProposal(proposalId);
```

## Features

- ✅ Create on-chain proposals with multiple actions
- ✅ Cast votes on proposals
- ✅ Execute passed proposals
- ✅ Full TypeScript support with viem types
- ✅ Support for Base and all EVM chains

## API

### `new CastQuestDAO(contractAddress, walletClient, publicClient?)`

Creates a new DAO instance.

- `contractAddress`: The address of the DAO contract
- `walletClient`: A viem WalletClient for signing transactions
- `publicClient`: (Optional) A viem PublicClient for reading from the chain

### `createProposal(title, description, actions)`

Creates a new proposal on-chain.

Returns: `Promise<{ proposalId: Hex }>`

### `vote(proposalId, support)`

Casts a vote on a proposal.

Returns: `Promise<Hex>` (transaction hash)

### `executeProposal(proposalId)`

Executes a passed proposal.

Returns: `Promise<Hex>` (transaction hash)

### `waitForTransaction(hash)`

Waits for a transaction to be confirmed.

Returns: `Promise<void>`

## Types

```typescript
interface ProposalAction {
  target: Address;
  value: bigint;
  data: Hex;
}

interface CreateProposalResult {
  proposalId: Hex;
}
```

## License

MIT
