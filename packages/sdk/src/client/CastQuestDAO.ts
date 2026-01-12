/**
 * CastQuest DAO Client
 * 
 * Client for interacting with CastQuest DAO smart contracts for on-chain governance.
 */

import type { PublicClient, WalletClient, Abi } from 'viem';
import { encodeFunctionData } from 'viem';

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

// ABI for encoding individual proposal actions
const ACTION_EXECUTE_ABI: Abi = [
  {
    type: 'function',
    name: 'execute',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'target', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
    outputs: [],
  },
];

export interface ProposalAction {
  target: string;
  value: bigint;
  data: string;
}

export class CastQuestDAO {
  private contractAddress: `0x${string}`;
  private publicClient: PublicClient;
  private walletClient?: WalletClient;

  constructor(
    contractAddress: `0x${string}`,
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
   * Returns the transaction hash for tracking purposes.
   * The actual on-chain proposalId can be derived from transaction events.
   */
  async createProposal(
    title: string,
    description: string,
    actions: ProposalAction[]
  ) {
    if (!this.walletClient) {
      throw new Error('WalletClient is required for write operations');
    }

    if (!this.walletClient.account) {
      throw new Error('WalletClient must have an account');
    }

    // Encode actions to bytes[]
    const encodedActions = actions.map((action) => {
      return encodeFunctionData({
        abi: ACTION_EXECUTE_ABI,
        functionName: 'execute',
        args: [action.target, action.value, action.data],
      });
    });

    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'createProposal',
      args: [title, description, encodedActions],
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    return { transactionHash: txHash };
  }

  /**
   * Cast a vote on a given proposal.
   * 
   * Returns the transaction hash for tracking.
   */
  async vote(proposalId: string, support: boolean) {
    if (!this.walletClient) {
      throw new Error('WalletClient is required for write operations');
    }

    if (!this.walletClient.account) {
      throw new Error('WalletClient must have an account');
    }

    // Validate and convert proposalId to BigInt
    let proposalIdBigInt: bigint;
    try {
      proposalIdBigInt = BigInt(proposalId);
    } catch (error) {
      throw new Error(`Invalid proposal ID: ${proposalId}. Must be a valid number.`);
    }

    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'castVote',
      args: [proposalIdBigInt, support],
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    return txHash;
  }

  /**
   * Execute an already-passed proposal on-chain.
   * 
   * Returns the transaction hash for tracking.
   */
  async executeProposal(proposalId: string) {
    if (!this.walletClient) {
      throw new Error('WalletClient is required for write operations');
    }

    if (!this.walletClient.account) {
      throw new Error('WalletClient must have an account');
    }

    // Validate and convert proposalId to BigInt
    let proposalIdBigInt: bigint;
    try {
      proposalIdBigInt = BigInt(proposalId);
    } catch (error) {
      throw new Error(`Invalid proposal ID: ${proposalId}. Must be a valid number.`);
    }

    const txHash = await this.walletClient.writeContract({
      address: this.contractAddress,
      abi: CAST_QUEST_DAO_ABI,
      functionName: 'execute',
      args: [proposalIdBigInt],
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    return txHash;
  }
}
