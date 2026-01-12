/**
 * CastQuest API Client
 * 
 * Main SDK client for interacting with CastQuest API endpoints.
 * Handles proposals, frames, and quests.
 */

export interface CastQuestClientConfig {
  apiUrl: string;
  contractAddress?: string;
  daoAddress?: string;
}

export interface ProposalResult {
  success: boolean;
  proposalId: string;
}

export interface FrameResult {
  success: boolean;
  frameId: string;
}

export interface QuestResult {
  success: boolean;
  questId: string;
}

export interface FrameConfig {
  name: string;
  description?: string;
  category: string;
  thumbnailUrl?: string;
  price?: string;
  templateData: any;
  version?: string;
  tenantId?: string;
}

export interface QuestData {
  title: string;
  description?: string;
  steps?: any[];
  rewards?: any[];
  difficulty?: string;
}

/**
 * Main CastQuest SDK client for API interactions
 */
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
   * Create a new DAO proposal
   */
  async createProposal(title: string, description: string): Promise<ProposalResult> {
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

    return response.json();
  }

  /**
   * Create a new frame template
   */
  async createFrame(config: FrameConfig): Promise<FrameResult> {
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
  async createQuest(questData: QuestData): Promise<QuestResult> {
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
