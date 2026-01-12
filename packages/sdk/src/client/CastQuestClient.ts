/**
 * CastQuest API Client
 * 
 * Main client for interacting with the CastQuest API.
 * Provides methods for proposals, frames, and quests.
 */

export interface CastQuestClientConfig {
  apiUrl: string;
  contractAddress?: string;
  daoAddress?: string;
}

export interface ProposalData {
  title: string;
  description: string;
}

export interface FrameConfig {
  name: string;
  description?: string;
  category: string;
  thumbnailUrl?: string;
  price?: number;
  templateData: any;
  version?: string;
}

export interface QuestData {
  title: string;
  description: string;
  rewardAmount?: number;
  criteria?: any;
}

export class CastQuestClient {
  private apiUrl: string;
  private contractAddress?: string;
  private daoAddress?: string;

  constructor(config: CastQuestClientConfig) {
    this.apiUrl = config.apiUrl;
    this.contractAddress = config.contractAddress;
    this.daoAddress = config.daoAddress;
  }

  /**
   * Create a new proposal
   */
  async createProposal(data: ProposalData) {
    const response = await fetch(`${this.apiUrl}/proposals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        contractAddress: this.contractAddress,
        daoAddress: this.daoAddress,
      }),
    });

    if (!response.ok) {
      let errorBody: string | undefined;
      try {
        errorBody = await response.text();
      } catch {
        // ignore parsing errors for error body
      }
      throw new Error(
        `Failed to create proposal (${response.status} ${response.statusText})` +
          (errorBody ? `: ${errorBody}` : '')
      );
    }

    return response.json();
  }

  /**
   * Create a new frame template
   */
  async createFrame(config: FrameConfig) {
    const response = await fetch(`${this.apiUrl}/frames`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...config,
        contractAddress: this.contractAddress,
        daoAddress: this.daoAddress,
      }),
    });

    if (!response.ok) {
      let errorBody: string | undefined;
      try {
        errorBody = await response.text();
      } catch {
        // ignore parsing errors for error body
      }
      throw new Error(
        `Failed to create frame (${response.status} ${response.statusText})` +
          (errorBody ? `: ${errorBody}` : '')
      );
    }

    return response.json();
  }

  /**
   * Create a new quest
   */
  async createQuest(questData: QuestData) {
    const response = await fetch(`${this.apiUrl}/quests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...questData,
        contractAddress: this.contractAddress,
        daoAddress: this.daoAddress,
      }),
    });

    if (!response.ok) {
      let errorBody: string | undefined;
      try {
        errorBody = await response.text();
      } catch {
        // ignore parsing errors for error body
      }
      throw new Error(
        `Failed to create quest (${response.status} ${response.statusText})` +
          (errorBody ? `: ${errorBody}` : '')
      );
    }

    return response.json();
  }
}
