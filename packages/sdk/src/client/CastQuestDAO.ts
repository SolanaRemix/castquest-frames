/**
 * CastQuest DAO Integration
 * Provides methods for interacting with the DAO smart contract
 */

import type { WalletClient, Chain, Account } from 'viem';
import type { Abi } from 'viem';

// Minimal ABI for the DAO contract methods we need.
// This should be kept in sync with the on-chain contract.
const CAST_QUEST_DAO_ABI: Abi = [
  {
    type: 'function',
    name: 'createProposal',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'actions', type: 'bytes[]' },
    ],
    outputs: [
      { name: 'proposalId', type: 'uint256' },
    ],
  },
  {
    type: 'function',
    name: 'castVote',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support', type: 'bool' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'execute',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'proposalId', type: 'uint256' },
    ],
    outputs: [],
  },
];

export interface CreateProposalResult {
  proposalId: string;
}

/**
 * DAO action that will be encoded and included in a proposal.
 * Can be either a pre-encoded hex string or an action object.
 */
export type DAOAction = `0x${string}` | {
  target: string;
  value?: bigint;
  data?: string;
};

export class CastQuestDAO {
  private contractAddress: string;
  private provider: WalletClient;
  private account?: Account;
  private chain?: Chain;

  constructor(
    contractAddress: string,
    provider: WalletClient,
    options?: {
      account?: Account;
      chain?: Chain;
    }
  ) {
    this.contractAddress = contractAddress;
    this.provider = provider;
    this.account = options?.account;
    this.chain = options?.chain;
  }

  /**
   * Create a new proposal on-chain.
   *
   * Returns the transaction hash as proposalId for tracking purposes.
   * The actual on-chain proposalId can be derived from events or a follow-up read call.
   *
   * @param title - The proposal title
   * @param description - The proposal description
   * @param actions - Array of encoded action bytes (as hex strings) or action objects
   */
  async createProposal(
    title: string,
    description: string,
    actions: DAOAction[]
  ): Promise<CreateProposalResult> {
    if (!this.provider || typeof this.provider.writeContract !== 'function') {
      throw new Error('Provider does not support writeContract; expected a viem wallet client.');
    }

    // Normalize actions to bytes[]. Actions can be pre-encoded hex strings or will be
    // encoded as empty bytes for placeholder. In production, action objects should be
    // properly ABI-encoded according to the target contract's interface.
    const encodedActions = actions.map((action): `0x${string}` => {
      if (typeof action === 'string') {
        return action;
      }
      // For action objects, a proper implementation would ABI-encode the target,
      // value, and data into a bytes array. For now, return empty bytes as placeholder.
      // TODO: Implement proper action encoding based on DAO contract specification
      return '0x';
    });

    const txHash = await this.provider.writeContract({
      address: this.contractAddress as `0x${string}`,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'createProposal',
      args: [title, description, encodedActions],
      account: this.account ?? null,
      chain: this.chain ?? null,
    });

    return { proposalId: txHash };
  }

  /**
   * Cast a vote on a given proposal.
   *
   * Returns the transaction hash for tracking.
   */
  async vote(proposalId: string, support: boolean): Promise<string> {
    if (!this.provider || typeof this.provider.writeContract !== 'function') {
      throw new Error('Provider does not support writeContract; expected a viem wallet client.');
    }

    const txHash = await this.provider.writeContract({
      address: this.contractAddress as `0x${string}`,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'castVote',
      args: [BigInt(proposalId), support],
      account: this.account ?? null,
      chain: this.chain ?? null,
    });

    return txHash;
  }

  /**
   * Execute an already-passed proposal on-chain.
   *
   * Returns the transaction hash for tracking.
   */
  async executeProposal(proposalId: string): Promise<string> {
    if (!this.provider || typeof this.provider.writeContract !== 'function') {
      throw new Error('Provider does not support writeContract; expected a viem wallet client.');
    }

    const txHash = await this.provider.writeContract({
      address: this.contractAddress as `0x${string}`,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'execute',
      args: [BigInt(proposalId)],
      account: this.account ?? null,
      chain: this.chain ?? null,
    });

    return txHash;
  }
}
