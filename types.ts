type Payload<T = string, O = object, K = T> = {
  user: User;
  event_type: T;
  object_kind: K;
  labels: Label[];
  changes: Changes;
  project: Project;
  object_attributes: O;
  assignees: Assignee[];
  reviewers: Reviewer[];
  repository: Repository;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar_url: string;
};

export type Assignee = Omit<User, "email">;
export type Reviewer = Omit<User, "email">;
export type Author = Pick<User, "name" | "email">;

export type Project = {
  id: number;
  url: string;
  name: string;
  web_url: string;
  ssh_url: string;
  http_url: string;
  homepage: string;
  namespace: string;
  avatar_url: string;
  git_ssh_url: string;
  description: string;
  git_http_url: string;
  default_branch: string;
  ci_config_path: string;
  visibility_level: number;
  path_with_namespace: string;
};

export type Repository = {
  url: string;
  name: string;
  homepage: string;
  description: string;
};

export type LastCommit = {
  id: string;
  url: string;
  title: string;
  author: Author;
  message: string;
  timestamp: string;
};

export type Label = {
  id: number;
  type: string;
  title: string;
  color: string;
  group_id: number;
  template: boolean;
  project_id: number;
  created_at: string;
  updated_at: string;
  description: string;
};

export type Changes = {
  draft: DraftState;
  labels: LabelCollection;
  updated_at: UpdatedState;
  last_edited_at: UpdatedState;
  updated_by_id: UpdatedIdState;
  last_edited_by_id: UpdatedIdState;
};

export type DraftState = {
  previous: boolean;
  current: boolean;
};

export type UpdatedState = {
  previous: string | null;
  current: string;
};

export type LabelCollection = {
  previous: Label[];
  current: Label[];
};

export type UpdatedIdState = {
  previous: number | null;
  current: number;
};

export type MRObjectAttributes = {
  id: number;
  iid: number;
  url: string;
  state: string;
  title: string;
  draft: boolean;
  labels: Label[];
  source: Project;
  target: Project;
  state_id: number;
  author_id: number;
  action: MRActions;
  created_at: string;
  updated_at: string;
  description: string;
  assignee_id: number;
  time_change: number;
  merge_status: string;
  target_branch: string;
  source_branch: string;
  reviewer_ids: number[];
  assignee_ids: number[];
  last_edited_at: string;
  last_commit: LastCommit;
  total_time_spent: number;
  human_time_change: string;
  target_project_id: number;
  source_project_id: number;
  last_edited_by_id: number;
  work_in_progress: boolean;
  human_time_estimate: string;
  milestone_id: number | null;
  first_contribution: boolean;
  detailed_merge_status: string;
  human_total_time_spent: string;
  blocking_discussions_resolved: boolean;
};

export type MRActions =
  | "open"
  | "close"
  | "reopen"
  | "update"
  | "approved"
  | "unapproved"
  | "approval"
  | "unapproval"
  | "merge";

export type MergeRequestPayload = Payload<"merge_request", MRObjectAttributes>;
