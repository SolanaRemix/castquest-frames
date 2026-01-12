/**
 * CastQuest SDK - Main Client
 * Provides methods for interacting with the CastQuest API
 */

export interface CastQuestSDKConfig {
  apiUrl: string;
  contractAddress?: string;
  daoAddress?: string;
}

export interface CreateProposalResponse {
  success: boolean;
  proposalId: string;
}

export interface CreateFrameResponse {
  success: boolean;
  frameId: string;
}

export interface CreateQuestResponse {
  success: boolean;
  questId: string;
}

export interface FrameConfig {
  name: string;
  description?: string;
  category: string;
  thumbnailUrl?: string;
  price?: string;
  templateData: Record<string, unknown>;
  version?: string;
}

export interface QuestRewards {
  tokens?: number;
  badges?: string[];
  experience?: number;
  [key: string]: unknown;
}

export interface QuestRequirements {
  level?: number;
  completedQuests?: string[];
  [key: string]: unknown;
}

export interface QuestData {
  title: string;
  description: string;
  type: string;
  rewards?: QuestRewards;
  requirements?: QuestRequirements;
}

export class CastQuestSDK {
  private apiUrl: string;
  private contractAddress?: string;
  private daoAddress?: string;

  constructor(config: CastQuestSDKConfig) {
    this.apiUrl = config.apiUrl;
    this.contractAddress = config.contractAddress;
    this.daoAddress = config.daoAddress;
  }

  async createProposal(title: string, description: string): Promise<CreateProposalResponse> {
    const response = await fetch(`${this.apiUrl}/proposals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
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

    return response.json() as Promise<CreateProposalResponse>;
  }

  async createFrame(config: FrameConfig): Promise<CreateFrameResponse> {
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

    return response.json() as Promise<CreateFrameResponse>;
  }

  async createQuest(questData: QuestData): Promise<CreateQuestResponse> {
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

    return response.json() as Promise<CreateQuestResponse>;
  }
}
