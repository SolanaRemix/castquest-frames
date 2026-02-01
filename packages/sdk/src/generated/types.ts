/* Minimal type subset generated from OpenAPI components for starter SDK.
   Extend when regenerating from the full OpenAPI file.
*/
export type UUID = string;

export interface User {
  id: UUID;
  tenant_id: UUID;
  email?: string;
  username?: string;
  display_name?: string;
  role?: string;
  created_at?: string;
}

export interface Tenant {
  id: UUID;
  slug?: string;
  name?: string;
  plan?: string;
  created_at?: string;
}

export interface AiJob {
  id: UUID;
  tenant_id?: UUID;
  project_id?: UUID;
  entity_type?: string;
  entity_id?: UUID;
  job_type?: string;
  status?: string;
  input?: any;
  output?: any;
  created_at?: string;
  updated_at?: string;
}

export interface FrameTemplate {
  id: UUID;
  project_id?: UUID;
  tenant_id?: UUID;
  name?: string;
  description?: string;
  current_version_id?: UUID;
  created_by?: UUID;
  created_at?: string;
}

export interface Project {
  id: UUID;
  tenant_id?: UUID;
  owner_id?: UUID;
  name?: string;
  slug?: string;
  description?: string;
  visibility?: string;
  created_at?: string;
  updated_at?: string;
}
