/**
 * CastQuest DAO Client
 * 
 * Client for interacting with the CastQuest DAO smart contracts.
 * Handles proposal creation, voting, and execution on-chain.
 */

import type { PublicClient, WalletClient } from 'viem';
import { Abi } from 'viem';

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
      // Using a generic `bytes` array for actions to avoid over-specifying the struct shape.
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

export interface DAOAction {
  target: string;
  value: bigint;
  data: string;
}

export class DAOClient {
  private contractAddress: string;
  private publicClient: PublicClient;
  private walletClient?: WalletClient;

  constructor(
    contractAddress: string,
    publicClient: PublicClient,
    walletClient?: WalletClient
  ) {
    this.contractAddress = contractAddress;
    this.publicClient = publicClient;
    this.walletClient = walletClient;
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
  ): Promise<{ proposalId: string }> {
    if (!this.walletClient) {
      throw new Error('Wallet client is required for write operations');
    }

    // Encode actions to bytes[]
    // Note: The DAO contract expects an array of encoded action bytes.
    // Each action should be ABI-encoded with target, value, and data.
    // For now, we pass the action.data directly as it should already be encoded calldata.
    // TODO: In production, this should encode the full action struct including target and value.
    // The smart contract should decode: (address target, uint256 value, bytes data) from each bytes element.
    const encodedActions = actions.map((action) => {
      // If a complete encoding is needed, it should be done before calling this method
      // and passed in action.data. Otherwise, we use the data field directly.
      return action.data || '0x';
    });

    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress as `0x${string}`,
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
    if (!this.walletClient) {
      throw new Error('Wallet client is required for write operations');
    }

    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress as `0x${string}`,
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
    if (!this.walletClient) {
      throw new Error('Wallet client is required for write operations');
    }

    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress as `0x${string}`,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'execute',
      args: [BigInt(proposalId)],
    });

    return txHash;
  }
}
