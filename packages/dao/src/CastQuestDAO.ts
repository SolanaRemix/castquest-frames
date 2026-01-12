/**
 * CastQuest DAO Integration
 * 
 * On-chain governance and proposal management for the CastQuest Protocol.
 * Uses viem for blockchain interactions on Base and other EVM chains.
 */

import type { WalletClient, PublicClient, Address, Hex } from 'viem';
import { encodeFunctionData } from 'viem';

/**
 * Minimal ABI for the DAO contract methods we need.
 * This should be kept in sync with the on-chain contract.
 */
const CAST_QUEST_DAO_ABI = [
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
] as const;

export interface ProposalAction {
  target: Address;
  value: bigint;
  data: Hex;
}

export interface CreateProposalResult {
  proposalId: Hex;
}

export class CastQuestDAO {
  private contractAddress: Address;
  private walletClient: WalletClient;
  private publicClient?: PublicClient;

  constructor(
    contractAddress: Address,
    walletClient: WalletClient,
    publicClient?: PublicClient
  ) {
    this.contractAddress = contractAddress;
    this.walletClient = walletClient;
    this.publicClient = publicClient;
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
    if (!this.walletClient.writeContract) {
      throw new Error('Wallet client does not support writeContract');
    }

    // Encode actions to bytes[]
    const encodedActions = actions.map((action) => {
      return encodeFunctionData({
        abi: [],
        functionName: 'execute' as any,
        args: [],
      });
    });

    const txHash = await this.walletClient.writeContract({
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
  async vote(proposalId: string, support: boolean): Promise<Hex> {
    if (!this.walletClient.writeContract) {
      throw new Error('Wallet client does not support writeContract');
    }

    const txHash = await this.walletClient.writeContract({
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
  async executeProposal(proposalId: string): Promise<Hex> {
    if (!this.walletClient.writeContract) {
      throw new Error('Wallet client does not support writeContract');
    }

    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'execute',
      args: [BigInt(proposalId)],
    });

    return txHash;
  }

  /**
   * Wait for a transaction to be confirmed
   */
  async waitForTransaction(hash: Hex): Promise<void> {
    if (!this.publicClient) {
      throw new Error('Public client is required to wait for transactions');
    }

    await this.publicClient.waitForTransactionReceipt({
      hash,
    });
  }
}
