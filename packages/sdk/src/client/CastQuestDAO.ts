/**
 * CastQuest DAO Integration
 * Provides methods for interacting with the DAO smart contract
 */

import type { WalletClient } from 'viem';
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

export interface DAOAction {
  target?: string;
  value?: bigint;
  data?: string;
}

export class CastQuestDAO {
  private contractAddress: string;
  private provider: WalletClient;

  constructor(contractAddress: string, provider: WalletClient) {
    this.contractAddress = contractAddress;
    this.provider = provider;
  }

  /**
   * Create a new proposal on-chain.
   *
   * Returns the transaction hash as proposalId for tracking purposes.
   * The actual on-chain proposalId can be derived from events or a follow-up read call.
   */
  async createProposal(
    title: string,
    description: string,
    actions: DAOAction[]
  ): Promise<CreateProposalResult> {
    if (!this.provider || typeof this.provider.writeContract !== 'function') {
      throw new Error('Provider does not support writeContract; expected a viem wallet client.');
    }

    // Normalize actions to bytes[]; if already encoded, pass through.
    const encodedActions = actions.map((action) => {
      if (typeof action === 'string') {
        return action as `0x${string}`;
      }
      // For now, return empty bytes for non-string actions
      // In a real implementation, this would encode the action properly
      return '0x' as `0x${string}`;
    });

    const txHash = await this.provider.writeContract({
      address: this.contractAddress as `0x${string}`,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'createProposal',
      args: [title, description, encodedActions],
      account: null,
      chain: null,
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
      account: null,
      chain: null,
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
      account: null,
      chain: null,
    });

    return txHash;
  }
}
