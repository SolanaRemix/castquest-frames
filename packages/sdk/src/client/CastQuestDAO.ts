/**
 * CastQuest DAO Integration
 * 
 * Blockchain interaction layer for DAO governance operations.
 * Supports proposal creation, voting, and execution.
 */

import type { Abi, Address, WalletClient as ViemWalletClient } from 'viem';

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

export type WalletClient = ViemWalletClient;

export interface ProposalAction {
  target?: string;
  value?: string;
  data?: string;
  // If data is already encoded as hex string, use it directly
  // Otherwise, it should be encoded before being passed to this method
  encoded?: string;
}

export interface CreateProposalResult {
  proposalId: string;
}

/**
 * CastQuest DAO client for on-chain governance
 */
export class CastQuestDAO {
  private contractAddress: Address;
  private provider: WalletClient;

  constructor(contractAddress: Address, provider: WalletClient) {
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
    actions: ProposalAction[]
  ): Promise<CreateProposalResult> {
    if (!this.provider || typeof this.provider.writeContract !== 'function') {
      throw new Error('Provider does not support writeContract; expected a viem wallet client.');
    }

    // Normalize actions to bytes[]; if already encoded, use it.
    // Otherwise, throw an error as proper encoding should be done before calling this method.
    const encodedActions = actions.map((action) => {
      // If action is already a hex string, use it directly
      if (typeof action === 'string') {
        return action;
      }
      // If action has pre-encoded data, use it
      if (action.encoded) {
        return action.encoded;
      }
      // For actions without encoded data, this is an error - encoding should happen externally
      throw new Error(
        'Proposal action must be pre-encoded. Use viem\'s encodeFunctionData to encode actions before passing them to createProposal.'
      );
    });

    const txHash = await this.provider.writeContract({
      address: this.contractAddress,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'createProposal',
      args: [title, description, encodedActions],
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
      address: this.contractAddress,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'castVote',
      args: [BigInt(proposalId), support],
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
      address: this.contractAddress,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'execute',
      args: [BigInt(proposalId)],
    });

    return txHash;
  }
}
