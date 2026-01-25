import fetch from "cross-fetch";
import { AiJob, FrameTemplate, Project, User, Tenant } from "./generated/types";

export interface ClientOptions {
  baseUrl?: string;
  apiKey?: string; // optional: API key or use bearer token on request
  fetchImpl?: typeof fetch;
}

export class CastQuestClient {
  baseUrl: string;
  apiKey?: string;
  fetchImpl: typeof fetch;

  constructor(options?: ClientOptions) {
    this.baseUrl = options?.baseUrl ?? "http://localhost:8080";
    this.apiKey = options?.apiKey;
    this.fetchImpl = options?.fetchImpl ?? fetch;
  }

  private headers(extra?: HeadersInit, auth?: string) {
    const h: HeadersInit = {
      "Content-Type": "application/json",
      ...extra,
    };
    if (this.apiKey) (h as any)["X-API-Key"] = this.apiKey;
    if (auth) (h as any)["Authorization"] = `Bearer ${auth}`;
    return h;
  }

  // Auth convenience: set bearer token for subsequent calls
  public withAuth(token: string) {
    return new AuthenticatedClient(this, token);
  }

  // Projects
  async listProjects(limit = 20, offset = 0): Promise<{ items: Project[]; total: number }> {
    const res = await this.fetchImpl(`${this.baseUrl}/projects?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`listProjects failed: ${res.statusText}`);
    return res.json();
  }

  async createProject(body: { name: string; description?: string; visibility?: string }): Promise<Project> {
    const res = await this.fetchImpl(`${this.baseUrl}/projects`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`createProject failed: ${res.statusText}`);
    return res.json();
  }

  // Frames
  async listFrameTemplates(projectId?: string) {
    const url = new URL(`${this.baseUrl}/frames/templates`);
    if (projectId) url.searchParams.set("projectId", projectId);
    const res = await this.fetchImpl(url.toString(), {
      method: "GET",
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`listFrameTemplates failed: ${res.statusText}`);
    return res.json();
  }

  async createFrameTemplate(body: { projectId: string; name: string; description?: string; initialSchema: any }): Promise<FrameTemplate> {
    const res = await this.fetchImpl(`${this.baseUrl}/frames/templates`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`createFrameTemplate failed: ${res.statusText}`);
    return res.json();
  }

  // AI jobs (create and get)
  async createAiJob(body: { jobType: string; projectId?: string; entityType?: string; entityId?: string; input: any; modelId?: string; promptVersion?: string }): Promise<AiJob> {
    const res = await this.fetchImpl(`${this.baseUrl}/ai/jobs`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`createAiJob failed: ${res.statusText}`);
    return res.json();
  }

  async getAiJob(jobId: string): Promise<AiJob> {
    const res = await this.fetchImpl(`${this.baseUrl}/ai/jobs/${jobId}`, {
      method: "GET",
      headers: this.headers(),
    });
    if (!res.ok) throw new Error(`getAiJob failed: ${res.statusText}`);
    return res.json();
  }
}

class AuthenticatedClient {
  client: CastQuestClient;
  token: string;
  constructor(client: CastQuestClient, token: string) {
    this.client = client;
    this.token = token;
  }

  private headers(extra?: HeadersInit) {
    return this.client["headers"](extra, this.token);
  }

  // Example: wrap createFrameTemplate with auth
  async createFrameTemplate(body: { projectId: string; name: string; description?: string; initialSchema: any }) {
    const res = await this.client.fetchImpl(`${this.client.baseUrl}/frames/templates`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`createFrameTemplate failed: ${res.statusText}`);
    return res.json();
  }

  async createAiJob(body: { jobType: string; projectId?: string; entityType?: string; entityId?: string; input: any; modelId?: string; promptVersion?: string }) {
    return this.client.createAiJob(body); // uses base headers via client; no duplicate code for simple calls
  }

  async getAiJob(jobId: string) {
    return this.client.getAiJob(jobId);
  }
}

