/**
 * CastQuest API Client
 * 
 * Main client for interacting with the CastQuest API endpoints.
 * Provides methods for creating proposals, frames, and quests.
 */

// Type for fetch that works in both Node.js and browser environments
type FetchFunction = typeof globalThis.fetch;

export interface FrameConfig {
  name: string;
  description?: string;
  category: string;
  thumbnailUrl?: string;
  price?: number;
  templateData: any;
  version?: string;
  tenantId?: string;
}

export interface QuestData {
  title: string;
  description: string;
  category?: string;
  difficulty?: string;
  rewards?: any;
  steps?: any[];
  metadata?: any;
}

export interface CastQuestClientConfig {
  apiUrl: string;
  contractAddress?: string;
  daoAddress?: string;
  apiKey?: string;
  fetch?: FetchFunction;
}

export interface ProposalResponse {
  success: boolean;
  proposalId?: string;
  error?: string;
}

export interface FrameResponse {
  success: boolean;
  frameId?: string;
  data?: any;
  error?: string;
}

export interface QuestResponse {
  success: boolean;
  questId?: string;
  data?: any;
  error?: string;
}

export class CastQuestClient {
  private apiUrl: string;
  private contractAddress?: string;
  private daoAddress?: string;
  private apiKey?: string;
  private fetchFn: FetchFunction;

  constructor(config: CastQuestClientConfig) {
    this.apiUrl = config.apiUrl;
    this.contractAddress = config.contractAddress;
    this.daoAddress = config.daoAddress;
    this.apiKey = config.apiKey;
    // Use provided fetch or global fetch
    this.fetchFn = config.fetch || (globalThis as any).fetch;
  }

  /**
   * Create a new DAO proposal
   */
  async createProposal(title: string, description: string): Promise<ProposalResponse> {
    const response = await this.fetchFn(`${this.apiUrl}/proposals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
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
   * Create a new frame
   */
  async createFrame(config: FrameConfig): Promise<FrameResponse> {
    const response = await this.fetchFn(`${this.apiUrl}/frames`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
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
  async createQuest(questData: QuestData): Promise<QuestResponse> {
    const response = await this.fetchFn(`${this.apiUrl}/quests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
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

  /**
   * Get a frame by ID
   */
  async getFrame(frameId: string): Promise<FrameResponse> {
    const response = await this.fetchFn(`${this.apiUrl}/frames/${frameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: 'Frame not found',
        };
      }
      throw new Error(`Failed to get frame (${response.status} ${response.statusText})`);
    }

    return response.json();
  }

  /**
   * Get a quest by ID
   */
  async getQuest(questId: string): Promise<QuestResponse> {
    const response = await this.fetchFn(`${this.apiUrl}/quests/${questId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: 'Quest not found',
        };
      }
      throw new Error(`Failed to get quest (${response.status} ${response.statusText})`);
    }

    return response.json();
  }
}
